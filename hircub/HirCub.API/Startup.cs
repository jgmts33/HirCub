using System;
using System.Collections.Generic;
using System.Text;
using CareHub.API.Infrastructure;
using CareHub.Domain;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using CareHub.Domain.Providers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;


namespace CareHub.API
{
    public class Startup
    {
        readonly bool suppressGlobalExceptionHandler;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json", true);
            Configuration = builder.Build();
            suppressGlobalExceptionHandler = Configuration.GetValue<bool>("SuppressGlobalExceptionHandler");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000",
                            "https://carehub1.venuiti.com")
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
            });
            
            services.AddControllers();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddAuthorization(o =>
            {
                // we require authorization for all calls
                o.AddPolicy("apipolicy", b =>
                {
                    b.RequireAuthenticatedUser();
                    b.AuthenticationSchemes = new List<string> { JwtBearerDefaults.AuthenticationScheme };
                });
            });

            services.AddEntityFrameworkSqlServer().AddDbContext<DomainDbContext>((serviceProvider, options) =>
                options.UseSqlServer(Configuration["ConnectionString"])
                    .UseInternalServiceProvider(serviceProvider));
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<DomainDbContext>()
                .AddDefaultTokenProviders();
            services.AddDbContext<DomainDbContext>(x => x.UseSqlServer(
                Configuration["ConnectionString"])
            );

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 7;
                options.Password.RequiredUniqueChars = 1;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                // https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity-configuration?view=aspnetcore-6.0#user
                // this is a default value anyway:
                //options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true;
            });
            services.AddTransient<UserManager<ApplicationUser>>();
            services.AddMvc()
                //.SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            services.AddTransient<IHealthTrackerProvider, HealthTrackerProvider>();
            services.AddTransient<IQuestionProvider, QuestionProvider>();
            services.AddTransient<ISuggestionProvider, SuggestionProvider>();
            services.AddTransient<IReportProvider, ReportProvider>();
            services.AddTransient<ICalendarProvider, CalendarProvider>();
            services.AddTransient<IIntakeManagerProvider, IntakeManagerProvider>();
            services.AddTransient<IJournalEntryProvider, JournalEntryProvider>();
            services.AddTransient<IMedicationProvider, MedicationProvider>();
            services.AddTransient<IFinanceRecordProvider, FinanceRecordProvider>();
            services.AddScoped<IUserProvider, UserProvider>();
            services.AddScoped<IImpersonationProvider, ImpersonationProvider>();
            services.AddScoped<IRemindersProvider, RemindersProvider>();

            if (!suppressGlobalExceptionHandler)
            {
                services.AddLogging(logBuilder => logBuilder.AddFile(Configuration.GetSection("Logging")));
            }

            #region IEmailService
            var emailEnabled = Configuration.GetValue<bool?>("emailEnabled") ?? false;
            if (!emailEnabled)
            {
                services.AddSingleton<IEmailService, DummyEmailService>();
            }
            else
            {
                var emailSmtpServer = Configuration.GetValue<string>("emailSmtpServer");
                var emailSmtpPort = Configuration.GetValue<int?>("emailSmtpPort") ?? 25;
                var emailFrom = Configuration.GetValue<string>("emailFrom");
                var emailPassword = Configuration.GetValue<string>("emailPassword");
                var appUrl = Configuration.GetValue<string>("appUrl");
                var emailEnableSsl = Configuration.GetValue<bool?>("emailEnableSsl") ?? false;

                var emailSettings = new EmailSettings
                {
                    AppUrl = appUrl,
                    Server = emailSmtpServer,
                    Port = emailSmtpPort,
                    From = emailFrom,
                    Password = emailPassword,
                    EnableSsl = emailEnableSsl
                };
                services.AddSingleton(emailSettings);
                services.AddSingleton<IEmailService, EmailService>();
            }
            #endregion

            #region Reminders
            var remindersEnabled = Configuration.GetValue<bool?>("remindersEmailsEnabled") ?? false;
            if (remindersEnabled && !emailEnabled)
                throw new Exception("Invalid configuration: remindersEmailsEnabled=true, but emailEnabled=false. Emails are required to be used by reminders service.");
            var remindersSettings = new RemindersSettings();
            if (remindersEnabled)
                remindersSettings.Key = Configuration.GetValue<string>("remindersApiKey");
            services.AddSingleton(remindersSettings);
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            if (!suppressGlobalExceptionHandler)
            {
                app.UseGlobalErrorHandler();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers()
                         // we require authorization for all calls
                         .RequireAuthorization("apipolicy");
            });
        }
    }
}
