using CareHub.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Interfaces
{
    public interface IImpersonationProvider
    {
        Task<List<ImpersonationPerson>> GetUsersToImpersonate(string email);

        Task SetImpersonationName(string email, string trusterEmail, string trusterName);

        Task<(string TrusterName, string TrusterEmail, string GuestEmail, List<string> Roles)> GetImpersonationDetails(string email, string trusterEmail);

        Task<(string TrusterName, string TrusterEmail, string GuestEmail, List<string> Roles)> GetImpersonationDetails(Guid guestGuid);

        Task<Guid> Invite(string email, string guestEmail, IEnumerable<string> roles, string trusterName = null);

        Task<bool> IsInvitedAsync(string email, CancellationToken cancellationToken = default);
    }
}
