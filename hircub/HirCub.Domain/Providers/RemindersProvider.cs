using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Enums;
using CareHub.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Providers
{
    public class RemindersProvider : IRemindersProvider
    {
        #region Internals
        const string excludeEmails = ".no-email@carehub.ca";

        readonly DomainDbContext context;
        #endregion

        public RemindersProvider(DomainDbContext context) => this.context = context;

        public async Task SetupRemindersForNewUserAsync(string userId, CancellationToken cancellationToken = default)
        {
            var reference = await context
                .ReminderReferences
                .ToListAsync(cancellationToken);

            var reminders = reference
                .Select(r => new Reminder
                {
                    ReminderReferenceId = r.Id,
                    UserId = userId,
                    State = ReminderState.Monthly,
                    Hours = 0,
                    Minutes = 0
                });

            context.AddRange(reminders);
            await context.SaveChangesAsync(cancellationToken);
        }

        public async Task<IEnumerable<ReminderDto>> GetRemindersAsync(string userId, CancellationToken cancellationToken = default)
        {
            var reference = await context
                .ReminderReferences
                .ToListAsync(cancellationToken);

            var reminders = await context
                .Reminders
                .Where(reminder => reminder.UserId == userId)
                .ToListAsync(cancellationToken);

            var lackedReminderRefs = reference
                .Where(r => !reminders.Any(reminder => reminder.ReminderReferenceId == r.Id));
            var lackedReminders = lackedReminderRefs
                .Select(r => new Reminder
                {
                    ReminderReferenceId = r.Id,
                    UserId = userId,
                    State = ReminderState.Monthly,
                    Hours = 0,
                    Minutes = 0
                });
            reminders.AddRange(lackedReminders);
            reminders = reminders
                .OrderBy(reminder => reminder.ReminderReferenceId)
                .ToList();

            return AutoMapperHelper.Mapper.Map<List<ReminderDto>>(reminders);
        }

        public async Task UpdateReminders(string userId, IEnumerable<ReminderDto> reminders, CancellationToken cancellationToken = default)
        {
            var remindersInDb = await context
                .Reminders
                .Where(reminder => reminder.UserId == userId)
                .ToListAsync(cancellationToken);

            // Update existing reminders
            foreach (var rdb in remindersInDb)
            {
                var rdto = reminders.FirstOrDefault(r => r.ReminderReferenceId == rdb.ReminderReferenceId);
                if (rdto != null)
                {
                    rdb.Hours = rdto.Hours;
                    rdb.Minutes = rdto.Minutes;
                    rdb.State = rdto.State;
                }
            }

            // Detect newly added reminders
            var newDtos = reminders
                .Where(rdto => !remindersInDb.Any(rdb => rdb.ReminderReferenceId == rdto.ReminderReferenceId));

            // Create new reminders and add them to the DB context
            context.Reminders.AddRange(newDtos
                .Select(dto => new Reminder
                {
                    ReminderReferenceId = dto.ReminderReferenceId,
                    UserId = userId,
                    State = dto.State,
                    Hours = dto.Hours,
                    Minutes = dto.Minutes
                })
            );

            await context.SaveChangesAsync(cancellationToken);
        }
        
        public async Task<List<(string Email, int ReminderReferenceId)>> GetRemindersForSendingAsync(DateTime fromExclusive, DateTime toInclusive, ReminderState state, CancellationToken cancellationToken = default)
        {
            var minutesFrom = fromExclusive.Hour * 60 + fromExclusive.Minute;
            var minutesTo = toInclusive.Hour * 60 + toInclusive.Minute;

            var reminders = await context
                .Reminders
                .Include(reminder => reminder.User)
                .Where(reminder => reminder.State == state)
                .Where(reminder => !reminder.User.Email.EndsWith(excludeEmails))
                .Where(reminder => reminder.Hours * 60 + reminder.Minutes > minutesFrom)
                .Where(reminder => reminder.Hours * 60 + reminder.Minutes <= minutesTo)
                .Select(reminder => new { reminder.User.Email, reminder.ReminderReferenceId })
                .ToListAsync(cancellationToken);

            return reminders
                .OrderBy(reminder => reminder.Email)
                .Select(reminder => (reminder.Email, reminder.ReminderReferenceId))
                .ToList();
        }

        public async Task<Dictionary<int, string>> GetReferenceAsync(CancellationToken cancellationToken = default)
        {
            return await context
                .ReminderReferences
                .OrderBy(rref => rref.Id)
                .ToDictionaryAsync(rref => rref.Id, rref => rref.Name, cancellationToken);
        }
    }
}
