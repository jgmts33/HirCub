using System;

namespace CareHub.API.Models
{
    public class EventPostModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime StartTime{ get; set; }
        public DateTime EndDate { get; set; }
        public DateTime EndTime { get; set; }
        public bool FullDay { get; set; }
    }
}