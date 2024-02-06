using CareHub.API.Auth;
using CareHub.API.Controllers;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CareHub.Domain.Enums;
using Xunit;

namespace CareHub.Tests.Auth
{
    public class TokenUT
    {
        [Fact]
        public async Task CreateTokenForDirectUser()
        {
            // Arrange
            var accountController = AccountControllerExt.SetupAccountController();

            var userId = "b57e0ed0-577d-46bd-967e-9e31f29be0c2";
            var user = new ApplicationUser { Id = userId, UserName = "Test User", PostalCode = "N2M 3s1 ", BackgroundImageCode = 12, ProfileColor = "#ffffff"};

            var roles = Enumerable
                .Range(0, 10)
                .Select(i => $"Role {i}");

            var tokenHandler = new JwtSecurityTokenHandler();

            // Act
            var token = await accountController.CreateToken(user, roles);

            // Assert
            var tokenContent = tokenHandler.ReadJwtToken(token);
            var claims = tokenContent
                .Claims
                .Where(claim => !claim.Special());

            Assert.Collection(claims,
                claim =>
                {
                    Assert.Equal("user_id", claim.Type);
                    Assert.Equal(userId, claim.Value);
                },
                claim => Assert.Equal("user_name", claim.Type),
                claim => Assert.Equal("account_type", claim.Type),
                claim =>
                {
                    Assert.Equal(ClaimTypes.NameIdentifier, claim.Type);
                    Assert.Equal(userId, claim.Value);
                },
                claim =>
                {
                    Assert.Equal("postal_code", claim.Type);
                    Assert.Equal("N2M 3s1 ", claim.Value);
                },
                claim =>
                {
                    Assert.Equal("background_id", claim.Type);
                    Assert.Equal("12", claim.Value);
                },
                claim =>
                {
                    Assert.Equal("profile_color", claim.Type);
                    Assert.Equal("#ffffff", claim.Value);
                },
                claim =>
                {
                    Assert.Equal(ClaimTypes.Role, claim.Type);
                    Assert.Equal($"Role 0", claim.Value);
                },
                claim => Assert.Equal($"Role 1", claim.Value),
                claim => Assert.Equal($"Role 2", claim.Value),
                claim => Assert.Equal($"Role 3", claim.Value),
                claim => Assert.Equal($"Role 4", claim.Value),
                claim => Assert.Equal($"Role 5", claim.Value),
                claim => Assert.Equal($"Role 6", claim.Value),
                claim => Assert.Equal($"Role 7", claim.Value),
                claim => Assert.Equal($"Role 8", claim.Value),
                claim => Assert.Equal($"Role 9", claim.Value)
            );
        }

        [Fact]
        public async Task CreateTokenForImpersonatedUser()
        {
            // Arrange
            var userId = "b57e0ed0-577d-46bd-967e-9e31f29be0c2";
            var user = new ApplicationUser { Id = userId, UserName = "Test User", AccountType = AccountType.CareGiver, PostalCode = "a1B 2a1", BackgroundImageCode = 1, ProfileColor = "N/A"};

            var impersonatedRoles = Enumerable
                .Range(0, 3)
                .Select(i => $"Role {i}");

            var impersonateUserId = "9521349f-7eb1-48a3-8546-e14b6294dac7";
            var impersonateUser = new ApplicationUser { Id = impersonateUserId, UserName = "Test Patient", AccountType = AccountType.Patient, PostalCode = "x1x 2x1", BackgroundImageCode = 12, ProfileColor = "#ffffff"};


            var userManagerMock = new Mock<UserManagerForTests>();
            userManagerMock
                .Setup(userManager => userManager.FindByIdAsync(It.IsAny<string>()))
                .ReturnsAsync((string id) => id == impersonateUserId ?
                    impersonateUser :
                    throw new ArgumentException($"Invalid user id: {impersonateUserId}.")
                );

            var accountController = AccountControllerExt.SetupAccountController(userManager: userManagerMock.Object);

            var tokenHandler = new JwtSecurityTokenHandler();

            // Act
            var token = await accountController.CreateToken(user, impersonatedRoles, impersonateUserId);

            // Assert
            var tokenContent = tokenHandler.ReadJwtToken(token);
            var claims = tokenContent
                .Claims
                .Where(claim => !(new string[] { "exp", "iss", "aud" }).Any(ignore => ignore == claim.Type));

            Assert.Collection(claims,
                claim =>
                {
                    Assert.Equal(ClaimTypes.Role, claim.Type);
                    Assert.Equal(CustomRoles.CanDeimpersonate, claim.Value);
                },
                claim =>
                {
                    Assert.Equal(ClaimTypes.Role, claim.Type);
                    Assert.Equal($"Role 0", claim.Value);
                },
                claim => Assert.Equal($"Role 1", claim.Value),
                claim => Assert.Equal($"Role 2", claim.Value),
                claim =>
                {
                    Assert.Equal("original_user_id", claim.Type);
                    Assert.Equal(userId, claim.Value);
                },
                claim =>
                {
                    Assert.Equal("user_id", claim.Type);
                    Assert.Equal(impersonateUserId, claim.Value);
                },
                claim =>
                {
                    Assert.Equal("user_name", claim.Type);
                    Assert.Equal("Test Patient", claim.Value);
                },
                claim =>
                {
                    Assert.Equal("account_type", claim.Type);
                    Assert.Equal(((int)AccountType.Patient).ToString(), claim.Value);
                    
                },
                claim =>
                {
                    Assert.Equal(ClaimTypes.NameIdentifier, claim.Type);
                    Assert.Equal(impersonateUserId, claim.Value);
                },
                claim =>
                {
                    Assert.Equal("postal_code", claim.Type);
                    Assert.Equal("x1x 2x1", claim.Value);
                },
                claim =>
                {
                    Assert.Equal("background_id", claim.Type);
                    Assert.Equal("12", claim.Value);
                },
                claim =>
                {
                    Assert.Equal("profile_color", claim.Type);
                    Assert.Equal("#ffffff", claim.Value);
                }
            );
        }
    }
}
