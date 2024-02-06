using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CareHub.API.Infrastructure
{
    public interface IEmailService
    {
        Task SendInvitationToImpersonate(Guid guestGuid, string from, string to, List<string> roles);

        Task SendReminder(string to, string frequency, string reminder, bool dontThrowOnError = false);
    }
}
