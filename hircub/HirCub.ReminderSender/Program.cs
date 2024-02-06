using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace CareHub.ReminderSender
{
    internal class Program
    {
        // https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient
        static readonly HttpClient client = new HttpClient();

        static async Task Main(string[] args)
        {
            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                var api = args[0];
                var key = args[1];

                using var response = await client.PostAsync($"{api}/reminders/send/{key}", null);
                response.EnsureSuccessStatusCode();
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", ex.Message);
            }
        }
    }
}
