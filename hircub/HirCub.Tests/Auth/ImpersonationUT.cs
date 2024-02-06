using CareHub.API.Auth;
using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

namespace CareHub.Tests.Auth
{
    public class ImpersonationUT
    {
        [Fact]
        public async void ReturnImpersonationVariants()
        {
            // Arrange
            var empoweredUserId = "0eb9afcb-0d70-4656-9821-d663d9d21dcb";
            var trustedRoles = new string[] { "Role 1", "Role 2" };
            var trustedPersonEmails = new List<ImpersonationPerson> { new ImpersonationPerson("", "email1@test.ru", "", "", trustedRoles), 
                new ImpersonationPerson("", "some_other@human.org", "", "", trustedRoles) };
            var otherRoles = new string[] { "Other role" };
            var impersonatedUsers = new Dictionary<string, List<ImpersonationPerson>>()
            {
                [empoweredUserId] = trustedPersonEmails,
                ["fcfa547c-3539-4666-8d3b-8469c72b69ca"] = new List<ImpersonationPerson>
                {
                    new ImpersonationPerson("", "other1@t.com", "", "", otherRoles), 
                    new ImpersonationPerson("", "what@is.this", "", "", otherRoles)
                }
            };

            var impersonationProviderMock = new Mock<IImpersonationProvider>();
            impersonationProviderMock
                .Setup<Task<List<ImpersonationPerson>>>(prov => prov.GetUsersToImpersonate(It.IsAny<string>()))
                .Returns((string userId) => Task.FromResult(impersonatedUsers[userId]));

            // Act
            var usersThatCanBeImpersonated = await impersonationProviderMock.Object.GetUsersToImpersonate(empoweredUserId).ConfigureAwait(false);

            // Assert
            Assert.Collection(usersThatCanBeImpersonated,
                person =>
                {
                    Assert.Equal(trustedPersonEmails[0].Email, person.Email);
                    Assert.Collection(person.Roles,
                        item => Assert.Equal(trustedRoles[0], item),
                        item => Assert.Equal(trustedRoles[1], item)
                    );
                },
                person =>
                {
                    Assert.Equal(trustedPersonEmails[1].Email, person.Email);
                    Assert.Collection(person.Roles,
                        item => Assert.Equal(trustedRoles[0], item),
                        item => Assert.Equal(trustedRoles[1], item)
                    );
                }
            );
        }

        [Fact]
        public async void CanImpersonate()
        {
            // Arrange
            var emailOnBehalfOf = "on_behalf_of_this_patient@test.com";
            var trustedUserId = "64b18181-11da-4421-9a60-51575193a71d";
            var guestEmail = "guest@guest.com";

            var impersonationMatrix = new ImpersonationRecord[]
            {
                new ImpersonationRecord { TrusterEmail = emailOnBehalfOf, GuestEmail = guestEmail, Role = CustomRoles.CalendarRead },
                new ImpersonationRecord { TrusterEmail = emailOnBehalfOf, GuestEmail = guestEmail, Role = CustomRoles.CalendarWrite },
                new ImpersonationRecord { TrusterEmail = emailOnBehalfOf, GuestEmail = guestEmail, Role = CustomRoles.HealthReportsRead },
                new ImpersonationRecord { TrusterEmail = emailOnBehalfOf, GuestEmail = guestEmail, Role = CustomRoles.HealthTrackerWrite },
                new ImpersonationRecord { TrusterEmail = "other_impersonator@test.com", GuestEmail = guestEmail, Role = CustomRoles.HealthTrackerWrite },
                new ImpersonationRecord { TrusterEmail = emailOnBehalfOf, GuestEmail = "some_other_guest@mail.com", Role = CustomRoles.ProfileRead }
            };

            var idOnBehalfOf = "7c4859e7-2a45-4a6d-9ffe-abb74514a4c0";
            var nameOnBehalfOf = "Impersonated User";
            var userOnBehalfOf = new ApplicationUser { Email = emailOnBehalfOf, Id = idOnBehalfOf, UserName = nameOnBehalfOf, PostalCode = "x1x 2x1", BackgroundImageCode = 12, ProfileColor = "#ffffff" };

            var impersonationProviderMock = new Mock<IImpersonationProvider>();
            impersonationProviderMock
                .Setup(prov => prov.GetImpersonationDetails(It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync((string email, string trusterEmail) => (
                    TrusterName: null,
                    TrusterEmail: null,
                    GuestEmail: null,
                    Roles: impersonationMatrix
                        .Where(im => im.TrusterEmail == trusterEmail)
                        .Where(im => im.GuestEmail == email)
                        .Select(im => im.Role)
                        .Distinct()
                        .ToList()
                ));

            var currentUser = new ApplicationUser { Email = guestEmail, Id = trustedUserId, UserName = "Current User", PostalCode = "a1b 2c1", BackgroundImageCode = 3};

            var userManagerMock = new Mock<UserManagerForTests>();
            userManagerMock
                .Setup(userManager => userManager.FindByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync((string email) => impersonationMatrix.Any(im => im.TrusterEmail == email) ? userOnBehalfOf : throw new ArgumentException($"Invalid truster email: {email}."));
            userManagerMock
                .Setup(userManager => userManager.GetRolesAsync(It.IsAny<ApplicationUser>()))
                .ReturnsAsync((ApplicationUser truster) => impersonationMatrix
                    .Where(im => im.TrusterEmail == truster.Email)
                    .Where(im => im.Role != CustomRoles.CalendarWrite) // Let's pretend he/she cannot write to the Calendar actually
                    .Select(im => im.Role)
                    .Distinct()
                    .ToList());

            userManagerMock
                .Setup(userManager => userManager.FindByIdAsync(It.IsAny<string>()))
                .ReturnsAsync((string id) => id == idOnBehalfOf ?
                    userOnBehalfOf :
                    throw new ArgumentException($"Invalid user id: {idOnBehalfOf}.")
                );

            var userClaims = new List<Claim> { new Claim("user_id", currentUser.Id) };
            var userPrincipal = new ClaimsPrincipal(new ClaimsIdentity(userClaims, "TestAuthType"));

            var accountController = AccountControllerExt.SetupAccountController(
                userManager: userManagerMock.Object,
                loggedInUser: userPrincipal,
                impersonationProvider: impersonationProviderMock.Object
            );

            userManagerMock
                .Setup(userManager => userManager.GetUserAsync(It.IsAny<ClaimsPrincipal>()))
                .ReturnsAsync((ClaimsPrincipal principal) => ((ClaimsIdentity)principal.Identity).Claims.Any(claim => claim.MatchUserId(currentUser.Id)) ? currentUser : null!);

            // Act
            var impersonationResult = await accountController.Impersonate(emailOnBehalfOf).ConfigureAwait(false);

            // Assert
            Assert.True(impersonationResult.Success);
            Assert.Equal(emailOnBehalfOf, impersonationResult.Returned.OnBehalfOf.Email);

            // Decrypt and check out the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenContent = tokenHandler.ReadJwtToken(impersonationResult.Returned.AuthToken);
            var claims = tokenContent
                .Claims
                .Where(claim => !claim.Special());
            Assert.Collection(claims,
                
                claim => Assert.Equal(CustomRoles.CanDeimpersonate, claim.Value),
                claim => Assert.Equal(CustomRoles.CalendarRead, claim.Value),
                claim => Assert.Equal(CustomRoles.HealthReportsRead, claim.Value),
                claim => Assert.Equal(CustomRoles.HealthTrackerWrite, claim.Value),
                claim =>
                {
                    Assert.Equal("original_user_id", claim.Type);
                    Assert.Equal(currentUser.Id, claim.Value);
                },
                claim =>
                {
                    Assert.Equal("user_id", claim.Type);
                    Assert.Equal(userOnBehalfOf.Id, claim.Value);
                },
                claim =>
                {
                    Assert.Equal("user_name", claim.Type);
                    Assert.Equal(userOnBehalfOf.UserName, claim.Value);
                },
                claim => Assert.Equal("account_type", claim.Type),
                claim =>
                {
                    Assert.Equal(ClaimTypes.NameIdentifier, claim.Type);
                    Assert.Equal(idOnBehalfOf, claim.Value);
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

        // Let's assume this test wouldn't be needed
        //[Fact]
        //public void CanDeimpersonate()
        //{

        //}
    }
}
