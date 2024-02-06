using System;
using CareHub.Domain.Enums;

namespace CareHub.API.Models
{
    public class NotificationsSchedulePostModel
    {
        public Period Period { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime StartTime { get; set; }
    }
}