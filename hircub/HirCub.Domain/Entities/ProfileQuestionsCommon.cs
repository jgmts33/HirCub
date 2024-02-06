namespace CareHub.Domain.Entities
{
    public class ProfileQuestionsCommon
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public bool? InterestedInInclusiveness { get; set; }
        public bool? InterestedSupporingChildren { get; set; }
        public bool? InterestedAboutIndigenousPeople { get; set; }
        public bool? InterestedAboutGrieving { get; set; }
    }
}
