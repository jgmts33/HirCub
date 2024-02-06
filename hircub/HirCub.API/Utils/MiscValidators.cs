namespace CareHub.API.Utils
{
    public static class MiscValidators
    {
        // https://stackoverflow.com/a/1374644/8750550
        public static bool IsValidEmail(this string email)
        {
            if (string.IsNullOrWhiteSpace(email) || email.Trim().EndsWith("."))
            {
                return false; // suggested by @TK-421
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
