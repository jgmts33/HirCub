namespace CareHub.Domain.Entities
{
    public class TrackedConcern
    {
        public long Id { get; set; }
        public long TrackedHealthStateId { get; set; }
        public int ConcernId { get; set; }
        public int ConcernValue { get; set; }

        public TrackedHealthState TrackedHealthState { get; set; }
        public Concern Concern { get; set; }
    }
}
