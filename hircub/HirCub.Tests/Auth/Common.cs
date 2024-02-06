using CareHub.API.Controllers;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Linq;
using System.Security.Claims;

namespace CareHub.Tests.Auth
{
    public static class ClaimExt
    {
        readonly static string[] claimsTypesToSkip = new string[] { "exp", "iss", "aud" };

        public static bool Special(this Claim claim) => claimsTypesToSkip.Any(ignore => ignore == claim.Type);

        public static bool MatchUserId(this Claim claim, string userId) => claim?.Type == "user_id" && claim?.Value == userId;
    }

    public static class AccountControllerExt
    {
        public static AccountController SetupAccountController(
            UserManager<ApplicationUser>? userManager = null,
            ClaimsPrincipal? loggedInUser = null,
            IImpersonationProvider? impersonationProvider = null
        )
        {
            var configMock = new Mock<IConfiguration>();
            configMock.Setup(conf => conf[It.IsAny<string>()]).Returns<string>((key) => key switch
            {
                "Jwt:Issuer" => "Some Issuer",
                "Jwt:Key" => "123456789012345677",
                "Jwt:ExpireDays" => "30",
                _ => throw new ArgumentException($"Invalid configuration key: {key}.")
            });

            var intakeManagerProviderMock = new Mock<IIntakeManagerProvider>();
            intakeManagerProviderMock.Setup(im => im.GetBasicInfo(It.IsAny<string>())).Returns((string userId) => null!);

            var accountController = new AccountController(configMock.Object, userManager, null, intakeManagerProviderMock.Object, null, impersonationProvider, null, null);
            if (loggedInUser != null)
            {
                accountController.ControllerContext = new Microsoft.AspNetCore.Mvc.ControllerContext
                {
                    HttpContext = new DefaultHttpContext { User = loggedInUser }
                };
            }

            return accountController;
        }
    }
}
