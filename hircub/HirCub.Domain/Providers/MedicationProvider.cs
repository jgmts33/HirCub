using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CareHub.Domain.Providers
{
    public class MedicationProvider : IMedicationProvider
    {
        private readonly DomainDbContext _context;

        public MedicationProvider(DomainDbContext context)
        {
            _context = context;
        }
        
        public async Task<MedicationDto> CreateAsync(MedicationDto newEntry)
        {
            var newEntity = AutoMapperHelper.Mapper.Map<MedicationEntity>(newEntry);
            _context.Medications.Add(newEntity);
            await _context.SaveChangesAsync();

            return AutoMapperHelper.Mapper.Map<MedicationDto>(newEntity);
        }

        public async Task<MedicationDto> GetAsync(string userId, long id)
        {
            return AutoMapperHelper.Mapper.Map<MedicationDto>(await _context.Medications.FirstOrDefaultAsync(x => x.UserId == userId && x.Id == id));
        }

        public async Task<List<MedicationDto>> GetAllAsync(string userId)
        {
            return AutoMapperHelper.Mapper.Map<List<MedicationDto>>(await _context.Medications.Where(x => x.UserId == userId).ToListAsync());
        }

        public async Task<MedicationDto> UpdateAsync(string userId, long id, MedicationDto updatedEntry)
        {
            var medicationEntity = await _context.Medications.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if (medicationEntity == null) return null;
            if (updatedEntry.Dose != null) medicationEntity.Dose = updatedEntry.Dose;
            if (updatedEntry.Medication != null) medicationEntity.Medication = updatedEntry.Medication;
            if (updatedEntry.Schedule != null) medicationEntity.Schedule = updatedEntry.Schedule;
            if (updatedEntry.Time != null) medicationEntity.Time = updatedEntry.Time;
            if (updatedEntry.Active.HasValue) medicationEntity.Active = updatedEntry.Active.Value;
            medicationEntity.Date = updatedEntry.Date;
            if (updatedEntry.Purpose != null) medicationEntity.Purpose = updatedEntry.Purpose;
            if (updatedEntry.Notes != null) medicationEntity.Notes = updatedEntry.Notes;
            await _context.SaveChangesAsync();
            return AutoMapperHelper.Mapper.Map<MedicationDto>(medicationEntity);
        }

        public async Task<bool> DeleteAsync(string userId, long id)
        {
            var entry = await _context.Medications.Where(x => x.Id == id && x.UserId == userId).Select(x => new MedicationEntity { Id = x.Id }).FirstOrDefaultAsync();
            if (entry == null) return false;
            _context.Remove(entry);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}