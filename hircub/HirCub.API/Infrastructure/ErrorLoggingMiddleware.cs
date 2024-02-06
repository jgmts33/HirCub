using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace CareHub.API.Infrastructure
{
    // https://blog.elmah.io/error-logging-middleware-in-aspnetcore/
    public class ErrorLoggingMiddleware
    {
        readonly RequestDelegate next;

        public ErrorLoggingMiddleware(RequestDelegate next) => this.next = next;

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }
    }

    public static class ErrorLoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseGlobalErrorHandler(this IApplicationBuilder builder) => builder.UseMiddleware<ErrorLoggingMiddleware>();
    }
}
