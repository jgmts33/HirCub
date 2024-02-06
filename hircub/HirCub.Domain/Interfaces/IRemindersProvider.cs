using CareHub.Domain.Dtos;
using CareHub.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Interfaces
{
    public interface IRemindersProvider
    {
        Task SetupRemindersForNewUserAsync(string userId, CancellationToken cancellationToken = default);

        Task<IEnumerable<ReminderDto>> GetRemindersAsync(string userId, CancellationToken cancellationToken = default);

        Task UpdateReminders(string userId, IEnumerable<ReminderDto> reminders, CancellationToken cancellationToken = default);

        Task<List<(string Email, int ReminderReferenceId)>> GetRemindersForSendingAsync(DateTime fromExclusive, DateTime toInclusive, ReminderState state, CancellationToken cancellationToken = default);

        Task<Dictionary<int, string>> GetReferenceAsync(CancellationToken cancellationToken = default);
    }
}
