using System;

namespace CareHub.Domain.Dtos
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool FullDay { get; set; }
        public string UserId { get; set; }
    }
}
