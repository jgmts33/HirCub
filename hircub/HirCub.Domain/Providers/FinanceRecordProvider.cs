using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareHub.Domain.Providers
{
    public class FinanceRecordProvider : IFinanceRecordProvider
    {
        #region Internals
        readonly DomainDbContext _context;

        void UpdateRecordCategories(FinanceRecord financeRecord, List<string> categories)
        {
            var userCategories = financeRecord.Categories == null
                ? new List<FinanceCategory>()
                : _context.FinanceCategories.Where(x => x.UserId == financeRecord.UserId).ToList()
                    .Where(x => categories.Any(t => t.Equals(x.Value, StringComparison.OrdinalIgnoreCase))).ToList();
            if (financeRecord.Categories == null)
            {
                financeRecord.Categories = new List<FinanceCategory>();
            }
            financeRecord.Categories.Clear();
            foreach (var cat in categories)
            {
                var existingCategory = userCategories.FirstOrDefault(c => cat.Equals(c.Value, StringComparison.OrdinalIgnoreCase));
                if (existingCategory == null)
                {
                    var newCat = new FinanceCategory { UserId = financeRecord.UserId, Value = cat };
                    _context.FinanceCategories.Add(newCat);
                    financeRecord.Categories.Add(newCat);
                }
                else
                {
                    financeRecord.Categories.Add(existingCategory);
                }
            }
        }
        #endregion

        public FinanceRecordProvider(DomainDbContext context)
        {
            _context = context;
        }

        public async Task<FinanceRecordDto> CreateAsync(FinanceRecordDto newRecord)
        {
            var recordEntity = AutoMapperHelper.Mapper.Map<FinanceRecord>(newRecord);

            var evt = _context.Events.FirstOrDefault(x => x.UserId == recordEntity.UserId && x.Id == recordEntity.EventId);
            if (evt == null)
            {
                return null;
            }
            if (recordEntity.Categories?.Count > 0)
            {
                UpdateRecordCategories(recordEntity, recordEntity.Categories.Select(x => x.Value).ToList());
            }

            _context.FinanceRecords.Add(recordEntity);
            await _context.SaveChangesAsync();

            return AutoMapperHelper.Mapper.Map<FinanceRecordDto>(recordEntity);
        }

        public async Task<FinanceRecordDto> UpdateAsync(string userId, FinanceRecordDto record)
        {
            var existingEntity = await _context.FinanceRecords.Where(x => x.UserId == userId && x.Id == record.Id).Include(rec => rec.Categories).FirstOrDefaultAsync();
            if (existingEntity == null)
            {
                return null;
            }

            if (record.Amount.HasValue)
                existingEntity.Amount = record.Amount.Value;
            if (!string.IsNullOrEmpty(record.Location))
                existingEntity.Location = record.Location;
            if (record.EventId.HasValue)
                existingEntity.EventId = record.EventId.Value;
            if (record.Date.HasValue)
                existingEntity.Date = record.Date.Value;
            if (record.Categories != null)
            {
                UpdateRecordCategories(existingEntity, record.Categories.Select(cat => cat.Value).ToList());
            }

            if (record.EventId != 0 && record.EventId != existingEntity.EventId)
            {
                var eventId = _context.Events.Where(x => x.Id == record.EventId && x.UserId == userId).Select(x => x.Id).FirstOrDefault();
                if (eventId == record.EventId)
                {
                    existingEntity.EventId = eventId;
                }
            }

            await _context.SaveChangesAsync();
            return AutoMapperHelper.Mapper.Map<FinanceRecordDto>(existingEntity);
        }

        // TODO: Do we need to find and delete orphaned FinanceCategories?
        public async Task<bool> DeleteAsync(string userId, long id)
        {
            var existingEntity = await _context.FinanceRecords
                .Where(x => x.UserId == userId && x.Id == id)
                .Select(x => new FinanceRecord { Id = x.Id })
                .FirstOrDefaultAsync();
            if (existingEntity == null) return false;
            _context.FinanceRecords.Remove(existingEntity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<FinanceRecordDto>> GetAllAsync(string userId)
        {
            var entities = await _context
                .FinanceRecords
                .Include(x => x.Categories)
                .Include(rec => rec.Event)
                .Where(x => x.UserId == userId)
                .Select(x => new FinanceRecord
                {
                    Id = x.Id,
                    Categories = x.Categories,
                    Location = x.Location,
                    Amount = x.Amount,
                    Date = x.Date,
                    EventId = x.EventId,
                    Event = x.Event,
                    UserId = userId
                })
                .ToListAsync();

            return AutoMapperHelper.Mapper.Map<List<FinanceRecordDto>>(entities);
        }

        public async Task<FinanceRecordDto> GetAsync(string userId, long id)
        {
            return AutoMapperHelper.Mapper.Map<FinanceRecordDto>(
                await _context
                    .FinanceRecords
                    .Include(x => x.Categories)
                    .Include(rec => rec.Event)
                    .Where(rec => rec.UserId == userId)
                    .Where(rec => rec.Id == id)
                    .FirstOrDefaultAsync()
            );
        }

        #region Categories
        public async Task<List<string>> GetCategoriesForAllFinanceRecordsAsync(string userId)
        {
            return await _context.FinanceRecords.Where(x => x.UserId == userId).SelectMany(x => x.Categories.Select(t => t.Value)).Distinct().ToListAsync();
        }

        public async Task<List<string>> GetCategoriesForFinanceRecordAsync(string userId, long financeRecordId)
        {
            var _entry = await _context.FinanceRecords
                .Where(x => x.UserId == userId && x.Id == financeRecordId)
                .Include(e => e.Categories)
                .Select(e => new FinanceRecord { Id = e.Id, Categories = e.Categories })
                .FirstOrDefaultAsync();
            return _entry?.Categories.Select(x => x.Value).ToList();
        }

        public async Task<List<FinanceRecordDto>> GetAllFinanceRecordsForCategoryAsync(string userId, string category)
        {
            return AutoMapperHelper.Mapper.Map<List<FinanceRecordDto>>(
                await _context
                    .FinanceRecords
                    .Include(rec => rec.Categories)
                    .Include(rec => rec.Event)
                    .Where(rec => rec.UserId == userId)
                    .Where(rec => rec.Categories.Any(cat => cat.UserId == userId && cat.Value == category))
                    .Select(x => new FinanceRecord
                    {
                        Id = x.Id,
                        Categories = x.Categories,
                        Location = x.Location,
                        Amount = x.Amount,
                        Date = x.Date,
                        EventId = x.EventId,
                        Event = x.Event,
                        UserId = userId
                    })
                    .ToListAsync()
            );
        }
        #endregion
    }
}
