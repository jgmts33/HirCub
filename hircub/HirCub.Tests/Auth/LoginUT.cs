using CareHub.API.Models;
using CareHub.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

namespace CareHub.Tests.Auth
{
    public class LoginUT
    {
        [Fact]
        public async Task NormalLogin()
        {
            // Arrange
            var userId = "9d42edc2-4cc6-4cdd-a3e8-51670123a8e6";

            var postModel = new LoginPostModel
            {
                Email = "test@test.com",
                Password = "test_password"
            };

            var user = new ApplicationUser
            {
                Email = postModel.Email,
                UserName = "Test User"
            };
            var roles = new Dictionary<string, IEnumerable<string>>
            {
                [user.Email] = new string[]
                {
                    "TestRole1",
                    "TestRole2",
                    "CanImpersonate"
                }
            };

            var userManagerMock = new Mock<UserManagerForTests>();
            userManagerMock
                .Setup(userManager => userManager.FindByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync((string email) => email == postModel.Email ?
                    user :
                    throw new ArgumentException($"Invalid user email: {email}.")
                );
            var passwordChecked = false;
            userManagerMock
                .Setup(userManager => userManager.CheckPasswordAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(true)
                .Callback(() => passwordChecked = true);
            userManagerMock
                .Setup(userManager => userManager.GetRolesAsync(It.IsAny<ApplicationUser>()))
                .ReturnsAsync((ApplicationUser user) => roles[user.Email].ToList());

            var userClaims = new List<Claim>
            {
                new Claim("user_id", userId)
            };

            var accountController = AccountControllerExt.SetupAccountController(
                userManager: userManagerMock.Object,
                loggedInUser: new ClaimsPrincipal(new ClaimsIdentity(userClaims, "TestAuthType"))
            );

            // Act
            var loginResult = await accountController.Login(postModel).ConfigureAwait(false);

            // Assert
            Assert.True(loginResult.Success);
            Assert.True(passwordChecked);
        }
    }

    /// <summary>
    ///  We need a parameterless constructor here
    /// </summary>
    public class UserManagerForTests : UserManager<ApplicationUser>
    {
        public UserManagerForTests() : base(
            new Mock<IUserStore<ApplicationUser>>().Object,
            default, default, default, default, default, default, default, default) { }
    }
}
