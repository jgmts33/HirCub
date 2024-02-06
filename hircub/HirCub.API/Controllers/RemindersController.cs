using CareHub.API.Auth;
using CareHub.API.Infrastructure;
using CareHub.API.Models;
using CareHub.Domain.Dtos;
using CareHub.Domain.Enums;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RemindersController : ControllerBase
    {
        #region Internals
        readonly IRemindersProvider remindersProvider;
        readonly IEmailService emailService;
        readonly ILogger<RemindersController> logger;
        readonly string apiKey;
        #endregion

        public RemindersController(
            IRemindersProvider remindersProvider,
            IEmailService emailService,
            ILogger<RemindersController> logger,
            RemindersSettings remindersSettings
        )
        {
            this.remindersProvider = remindersProvider;
            this.emailService = emailService;
            this.logger = logger;
            apiKey = remindersSettings.Key;
        }

        [HttpGet]
        public async Task<BaseJsonResponse<List<ReminderViewModel>>> Get()
        {
            string userId = User.GetId();

            var reminders = (await remindersProvider.GetRemindersAsync(userId)).ToList();

            return new BaseJsonResponse<List<ReminderViewModel>>(AutoMapperHelper.Mapper.Map<List<ReminderViewModel>>(reminders));
        }

        [HttpPost]
        public async Task<BaseJsonResponse> Update([FromBody] List<ReminderViewModel> reminders)
        {
            string userId = User.GetId();

            if (reminders == null || reminders.Count == 0)
                return new BaseJsonResponse(false, "No reminders provided.");

            await remindersProvider.UpdateReminders(userId, AutoMapperHelper.Mapper.Map<List<ReminderDto>>(reminders));

            return new BaseJsonResponse();
        }

        [HttpPost("{id}")]
        public async Task<BaseJsonResponse> Send(string id)
        {
            // The initial idea was to use a GUID, that is why I do case insensitive comparison here
            if (string.Compare(id, apiKey, true) != 0) throw new UnauthorizedAccessException();

            var now = DateTime.UtcNow;
            var hourAgo = now.AddHours(-1);

            var dailyReminders = await remindersProvider.GetRemindersForSendingAsync(hourAgo, now, ReminderState.Daily);
            var weeklyReminders = new List<(string Email, int ReminderReferenceId)>();
            if (now.DayOfWeek == DayOfWeek.Monday)
                weeklyReminders = await remindersProvider.GetRemindersForSendingAsync(hourAgo, now, ReminderState.Weekly);
            var monthlyReminders = new List<(string Email, int ReminderReferenceId)>();
            if (now.Month == 1)
                monthlyReminders = await remindersProvider.GetRemindersForSendingAsync(hourAgo, now, ReminderState.Monthly);

            var reference = await remindersProvider.GetReferenceAsync();

            await SendInternal(dailyReminders, "Daily");
            await SendInternal(weeklyReminders, "Weekly");
            await SendInternal(monthlyReminders, "Monthly");

            async Task SendInternal(List<(string Email, int ReminderReferenceId)> reminders, string frequency)
            {
                if (reminders.Count != 0)
                {
                    foreach (var (Email, ReminderReferenceId) in dailyReminders)
                    {
                        await emailService.SendReminder(Email, frequency, reference[ReminderReferenceId], dontThrowOnError: true);
                    }
                }
            }

            return new BaseJsonResponse();
        }
    }
}
