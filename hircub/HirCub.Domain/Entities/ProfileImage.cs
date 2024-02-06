namespace CareHub.Domain.Entities
{
    public class ProfileImage
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public byte[] Image { get; set; }
        public string ContentType { get; set; }
    }
}
