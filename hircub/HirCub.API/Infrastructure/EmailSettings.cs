namespace CareHub.API.Infrastructure
{
    public class EmailSettings
    {
        public string AppUrl { get; set; }

        public string Server { get; set; }

        public int Port { get; set; }

        public string From { get; set; }

        public string Password { get; set; }

        public bool EnableSsl { get; set; }
    }
}
