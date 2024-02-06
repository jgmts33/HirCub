using CareHub.API.Utils;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CareHub.API.Infrastructure
{
    public class EmailService : IEmailService
    {
        #region Internals
        readonly ILogger<IEmailService> logger;
        readonly string appUrl;
        readonly string server;
        readonly int port;
        readonly string from;
        readonly string password;
        readonly bool enableSsl;

        async Task SendEmail(string to, string subject, string message, string logErrorMessage, string overrideFrom = null, bool dontThrowOnError = false)
        {
            var addrFrom = new MailAddress(from, overrideFrom != null ? overrideFrom : from);
            var addrTo = new MailAddress(to);
            var msg = new MailMessage(addrFrom, addrTo)
            {
                Subject = subject,
                Body = message,
                IsBodyHtml = true
            };
            var smtp = new SmtpClient(server, port) { EnableSsl = enableSsl };
            if (password != null)
                smtp.Credentials = new NetworkCredential(from, password);

            try
            {
                await smtp.SendMailAsync(msg);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, logErrorMessage);
                if (!dontThrowOnError)
                    throw;
            }
        }
        #endregion

        public EmailService(ILogger<IEmailService> logger, EmailSettings settings)
        {
            this.logger = logger;

            if (settings == null)
                throw new ArgumentNullException(nameof(settings));
            if (string.IsNullOrWhiteSpace(settings.AppUrl))
                throw new ArgumentException("App URL not set.", nameof(settings));
            if (!settings.From.IsValidEmail())
                throw new ArgumentException("From value is invalid or not set.", nameof(settings));
            if (string.IsNullOrEmpty(settings.Server))
                throw new ArgumentException("SMTP Server not set.", nameof(settings));

            appUrl = settings.AppUrl;
            server = settings.Server;
            port = settings.Port;
            from = settings.From;
            password = settings.Password;
            enableSsl = settings.EnableSsl;

            if (!appUrl.EndsWith("/"))
                appUrl += "/";
        }

        public async Task SendInvitationToImpersonate(Guid guestGuid, string from, string to, List<string> roles)
        {
            if (!from.IsValidEmail())
                throw new ArgumentException($"Invalid {nameof(from)} email: {from}", nameof(from));
            if (!to.IsValidEmail())
                throw new ArgumentException($"Invalid {nameof(to)} email: {to}", nameof(to));

            if (!(roles?.Any() ?? false))
                return;

            var invitationUrl = $"{appUrl}login";

            var message = $"<h1>Dear {to}!</h1>" + Environment.NewLine +
                          $"<p>{from} invites you to help them with the use of the CareHub website.</p>" + Environment.NewLine +
                          $"<p>To accept the invitation, please follow the link below:</p>" + Environment.NewLine +
                          $"<a href=\"{invitationUrl}\">{invitationUrl}</a>";

            await SendEmail(
                to: to,
                subject: "CareHub Invitation",
                message: message,
                logErrorMessage: $"The following invitation id was not sent: {guestGuid}",
                overrideFrom: from
            );
        }

        public async Task SendReminder(string to, string frequency, string reminder, bool dontThrowOnError = false)
        {
            if (!to.IsValidEmail()) throw new ArgumentException($"Invalid {nameof(to)} email: {to}", nameof(to));
            if (string.IsNullOrWhiteSpace(frequency)) throw new ArgumentException(nameof(frequency));
            if (string.IsNullOrWhiteSpace(reminder)) throw new ArgumentException(nameof(reminder));

            var remindersUrl = $"{appUrl}profile/reminders";

            var message = $"<h1>Dear CareHub User!</h1>" + Environment.NewLine +
                          $"<p>We remind you about {reminder}</p>" + Environment.NewLine +
                          $"<p>You can change your reminders following this link: <a href=\"{remindersUrl}\">{remindersUrl}</a></p>";

            await SendEmail(
                to: to,
                subject: $"CareHub {frequency} Reminder",
                message: message,
                logErrorMessage: $"The reminder was not sent. To: {to}, Frequency: {frequency}, Reminder: {reminder}",
                dontThrowOnError: dontThrowOnError
            );
        }
    }
}
