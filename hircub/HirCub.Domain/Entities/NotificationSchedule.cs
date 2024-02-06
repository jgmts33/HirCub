using System;
using CareHub.Domain.Enums;

namespace CareHub.Domain.Entities
{
    public class NotificationsSchedule
    {
        public int Id { get; set; }
        public Period Period { get; set; }
        public DateTime StartDate { get; set; }
    }
}
