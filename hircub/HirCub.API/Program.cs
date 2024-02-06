using CareHub.Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace CareHub.API
{
    public class Program
    {
        #region Internals
        static async Task SeedRoles(IServiceProvider serviceProvider, DomainDbContext dbContext)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            foreach (var role in Auth.CustomRoles.AllRolesForSeed)
            {
                if (!await roleManager.RoleExistsAsync(role))
                    await roleManager.CreateAsync(new IdentityRole(role));
            }
        }
        #endregion

        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var loggerFactory = services.GetRequiredService<ILoggerFactory>();

                // Deploy and seed DB
                using (var dbContext = services.GetRequiredService<DomainDbContext>())
                {
                    try
                    {
                        dbContext.Database.Migrate();

                        //var connection = dbContext.Database.GetDbConnection();
                        //connection.Open();
                        //using var transaction = connection.BeginTransaction();
                        //dbContext.Database.UseTransaction(transaction);

                        SeedRoles(services, dbContext).Wait();

                        dbContext.SaveChanges();
                    }
                    catch (Exception ex)
                    {
                        var logger = loggerFactory.CreateLogger<Program>();
                        logger.LogError(ex, "An error occurred seeding the DB.");
                        //throw;
                    }
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
