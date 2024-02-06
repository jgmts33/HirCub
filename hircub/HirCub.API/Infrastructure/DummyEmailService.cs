using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CareHub.API.Infrastructure
{
    public class DummyEmailService : IEmailService
    {
        public Task SendInvitationToImpersonate(Guid guestGuid, string from, string to, List<string> roles) => Task.CompletedTask;

        public Task SendReminder(string to, string frequency, string reminder, bool dontThrowOnError = false) => Task.CompletedTask;
    }
}
