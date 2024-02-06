namespace CareHub.Domain.Entities
{
    public class ConcernValue
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public string Name { get; set; }
        public int ConcernId { get; set; }

        public Concern Concern { get; set; }
    }
}
