using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CareHub.API.Auth;
using CareHub.API.Infrastructure;
using CareHub.API.Models;
using CareHub.API.Utils;
using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Enums;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        const int maxFileSizeKB = 500;
        const int maxFileSize = maxFileSizeKB * 1024;

        #region Internals
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserProvider _userProvider;
        private readonly IIntakeManagerProvider _intakeManagerProvider;
        private readonly ILogger<AccountController> _logger;
        private readonly IImpersonationProvider _impersonationProvider;
        private readonly IEmailService _emailService;
        private readonly IRemindersProvider _remindersProvider;

        [NonAction]
        public async Task<string> CreateToken(ApplicationUser user, IEnumerable<string> roles, string impersonateUserId = null)
        {
            var claims = new List<Claim>();

            if (impersonateUserId != null)
            {
                // If it is an impersonated user, add CanDeimpersonate role and save "original_user_id"
                claims.Add(new Claim(ClaimTypes.Role, CustomRoles.CanDeimpersonate));
                claims.Add(new Claim("original_user_id", user.Id));

                // and then we DISCARD original user ID - everything else we do in the context of impersonated user Id
                user = await _userManager.FindByIdAsync(impersonateUserId);
            }

            claims.AddRange(new []
            {
                new Claim("user_id", user.Id),
                new Claim("user_name", String.IsNullOrEmpty(user.NickName) ? user.UserName : user.NickName),
                new Claim("account_type", ((int) user.AccountType).ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("postal_code", user.PostalCode ?? ""),
                new Claim("background_id", user.BackgroundImageCode.ToString()),
                new Claim("profile_color", user.ProfileColor ?? "FFFFFF"),
            });

            // Add preselected roles
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:ExpireDays"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: expires,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        async Task<BaseJsonResponse<LoginResultModel>> LoginInternal(string email, string password, ApplicationUser existingUser)
        {
            ApplicationUser user;
            if (existingUser == null)
            {
                user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return new BaseJsonResponse<LoginResultModel>(false, $"User with email {email} was not found.");
                }

                var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, password);
                if (!isPasswordCorrect)
                {
                    return new BaseJsonResponse<LoginResultModel>(false, "User with this combination email/password was not found.");
                }
            }
            else
            {
                user = existingUser;
            }

            var roles = await _userManager.GetRolesAsync(user);

            var jwtToken = await CreateToken(user, roles);

            var basicInfo = _intakeManagerProvider.GetBasicInfo(user.Id);

            var loginResultModel = new LoginResultModel
            {
                BasicInfo = basicInfo,
                AccountType = user.AccountType,
                AuthToken = jwtToken,
                FirstLogin = user.FirstLogin
            };

            if (user.FirstLogin)
                await _userProvider.ClearFirstLoginAsync(user.Id);

            return new BaseJsonResponse<LoginResultModel>(loginResultModel);
        }
        #endregion

        public AccountController(
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            IUserProvider userProvider,
            IIntakeManagerProvider intakeManagerProvider,
            ILogger<AccountController> logger,
            IImpersonationProvider impersonationProvider,
            IEmailService emailService,
            IRemindersProvider remindersProvider
        )
        {
            _configuration = configuration;
            _userManager = userManager;
            _userProvider = userProvider;
            _intakeManagerProvider = intakeManagerProvider;
            _logger = logger;
            _impersonationProvider = impersonationProvider;
            _emailService = emailService;
            _remindersProvider = remindersProvider;
        }

        [HttpGet("Ping")]
        [AllowAnonymous]
        public string Ping()
        {
            return "ping";
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<BaseJsonResponse<string>> Register([FromBody] RegisterPostModel registerPostModel)
        {
            #region Validation
            if (!ModelState.IsValid)
                return new BaseJsonResponse<string>(false, ModelState.Errors());

            if (string.IsNullOrWhiteSpace(registerPostModel.Password))
                return new BaseJsonResponse<string>(false, "Password is required.");

            var isInvited = await _impersonationProvider.IsInvitedAsync(registerPostModel.Email);
            if (isInvited && registerPostModel.AccountType == AccountType.Patient)
                return new BaseJsonResponse<string>(false, "You have been invited to be a Caregiver, so please select a \"Caregiver\" option.");
            #endregion

            var user = new ApplicationUser
            {
                NickName = registerPostModel.DisplayName,
                PostalCode = registerPostModel.PostalCode,
                UserName = registerPostModel.Email,
                Email = registerPostModel.Email,
                AccountType = registerPostModel.AccountType
            };
            var createResult = await _userManager.CreateAsync(user, registerPostModel.Password);
            if (!createResult.Succeeded)
            {
                return new BaseJsonResponse<string>(false, createResult.Errors.Select(e => e.Description).ToList());
            }

            var setupRoles = CustomRoles.RegisterRoles.ToList();
            if (registerPostModel.AccountType == AccountType.CareGiver)
                setupRoles.Add(CustomRoles.Caregiver);
            foreach (var role in setupRoles)
            {
                await _userManager.AddToRoleAsync(user, role);
            }

            await _remindersProvider.SetupRemindersForNewUserAsync(user.Id);
            await _userProvider.ClearFirstLoginAsync(user.Id); // Because after this Signup, user will be logged

            var jwtToken = await CreateToken(user, setupRoles);
            return new BaseJsonResponse<string>(jwtToken);
        }

        [HttpPost("createPatient")]
        [Roles(CustomRoles.Administrator, CustomRoles.Caregiver, CustomRoles.CanImpersonate)]
        public async Task<BaseJsonResponse<LoginResultModel>> CreatePatientAsync([FromBody] RegisterPostModel registerPostModel)
        {
            var caregiverUserId = User.GetId();
            var caregiver = await _userManager.FindByIdAsync(caregiverUserId);

            var hasEmail = !(registerPostModel.NoEmailAddress ?? false);

            #region Validation
            if (hasEmail)
            {
                if (string.Compare(caregiver.Email, registerPostModel.Email, true) == 0)
                    return new BaseJsonResponse<LoginResultModel>(false, "You cannot create a Patient using your own email. If this Patient has no email, please check the appropriate checkbox.");
                if (await _impersonationProvider.IsInvitedAsync(registerPostModel.Email))
                    return new BaseJsonResponse<LoginResultModel>(false, "Unable to create a Patient with provided email - she/he is already invited to be a Caregiver for another Patient.");
            }
            #endregion

            #region Create user
            var email = hasEmail ? registerPostModel.Email : $"{Guid.NewGuid()}.no-email@carehub.ca";

            var newUser = new ApplicationUser
            {
                NickName = registerPostModel.DisplayName,
                PostalCode = registerPostModel.PostalCode,
                UserName = email,
                Email = email,
                AccountType = AccountType.Patient
            };
            var createResult = await _userManager.CreateAsync(newUser, hasEmail ? registerPostModel.Password : $"{Guid.NewGuid()}!Az2");
            if (!createResult.Succeeded)
            {
                return new BaseJsonResponse<LoginResultModel>(false, createResult.Errors.Select(e => e.Description).ToList());
            }

            var setupRoles = CustomRoles.RegisterRoles.ToList();
            foreach (var role in setupRoles)
            {
                await _userManager.AddToRoleAsync(newUser, role);
            }
            #endregion

            #region Grant ourselves full Shared Access
            var rolesToShare = CustomRoles.AllOrdinary.ToList();
            await _impersonationProvider.Invite(email, caregiver.Email, rolesToShare, registerPostModel.DisplayName);
            #endregion

            // Impersonate the newly created Patient
            return await Impersonate(email);
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<BaseJsonResponse<LoginResultModel>> Login([FromBody] LoginPostModel loginPostModel) => await LoginInternal(loginPostModel.Email, loginPostModel.Password, null);

        [HttpGet("impersonate")]
        [Roles(CustomRoles.CanImpersonate)]
        public async Task<BaseJsonResponse<List<ImpersonationPerson>>> GetImpersonationVariants()
        {
            var user = await _userManager.GetUserAsync(User);
            var impersonationPersons = await _impersonationProvider.GetUsersToImpersonate(user.Email);
            return new BaseJsonResponse<List<ImpersonationPerson>>(impersonationPersons);
        }

        [HttpPost("impersonation-name")]
        [Roles(CustomRoles.CanImpersonate)]
        public async Task<BaseJsonResponse> SetImpersonationName([FromBody] ImpersonationNamePostModel model)
        {
            if (!ModelState.IsValid)
                return new BaseJsonResponse<string>(false, ModelState.Errors());

            var user = await _userManager.GetUserAsync(User);

            #region Validate Email
            var impersonationPersons = await _impersonationProvider.GetUsersToImpersonate(user.Email);
            if (!impersonationPersons.Any(pers => string.Compare(pers.Email, model.Email, true) == 0))
                return new BaseJsonResponse(false, "Truster with provided email does not exist.");
            #endregion

            await _impersonationProvider.SetImpersonationName(user.Email, model.Email, model.Name);
            return new BaseJsonResponse(true);
        }

        [HttpPost("impersonate/{email}")]
        [Roles(CustomRoles.CanImpersonate)]
        public async Task<BaseJsonResponse<LoginResultModel>> Impersonate(string email)
        {
            var truster = await _userManager.FindByEmailAsync(email);
            if (truster == null)
                return new BaseJsonResponse<LoginResultModel>(false, $"There is no user with email {email}.") { StatusCode = StatusCodes.Status406NotAcceptable };

            var currentUser = await _userManager.GetUserAsync(User);

            if (string.Compare(truster.Email, currentUser.Email, true) == 0)
                return new BaseJsonResponse<LoginResultModel>(false, "Unable to impersonate yourself.");

            var (trusterName, trusterEmail, guestEmail, roles) = await _impersonationProvider.GetImpersonationDetails(currentUser.Email, email);
            if (!roles.Any())
                return new BaseJsonResponse<LoginResultModel>(false, "User did not allow to impersonate her/him.") { StatusCode = StatusCodes.Status406NotAcceptable };

            var realTrusterRoles = await _userManager.GetRolesAsync(truster);

            // Strip off excess roles in case the Truster will allow more than it is allowed him/herself.
            var rolesToUse = roles
                .Where(role => realTrusterRoles.Any(realRole => realRole == role))
                .ToList();

            var impersonatedToken = await CreateToken(currentUser, rolesToUse, truster.Id);

            var basicInfo = _intakeManagerProvider.GetBasicInfo(currentUser.Id);

            var loginResultModel = new LoginResultModel
            {
                BasicInfo = basicInfo,
                AuthToken = impersonatedToken,
                AccountType = truster.AccountType,
                FirstLogin = truster.FirstLogin,
                //OnBehalfOf = new ImpersonationPerson(email, rolesToUse, trusterName)
            };

            if (truster.FirstLogin)
                await _userProvider.ClearFirstLoginAsync(truster.Id);

            return new BaseJsonResponse<LoginResultModel>(loginResultModel);
        }

        [HttpPost("deimpersonate")]
        [Roles(CustomRoles.CanDeimpersonate)]
        public async Task<BaseJsonResponse<LoginResultModel>> Deimpersonate()
        {
            var user = await _userManager.FindByIdAsync(User.GetOriginalId());
            return await LoginInternal(null, null, user);
        }

        [HttpGet("welcome/{id}")]
        [AllowAnonymous]
        public async Task<BaseJsonResponse<WelcomeResultViewModel>> Welcome(Guid id)
        {
            var (_, trusterEmail, guestEmail, roles) = await _impersonationProvider.GetImpersonationDetails(id);

            if (!roles.Any())
            {
                return new BaseJsonResponse<WelcomeResultViewModel>(false, $"You have no invitations.");
            }

            var user = await _userManager.FindByEmailAsync(guestEmail);
            if (user != null)
            {
                var err = user.Id == User.GetOriginalId() ? "Please impersonate" : "Please log in";
                return new BaseJsonResponse<WelcomeResultViewModel>(false, err);
            }

            var trusterUser = await _userManager.FindByEmailAsync(trusterEmail);
            if (trusterUser == null)
            {
                return new BaseJsonResponse<WelcomeResultViewModel>(false, $"The database is probably corrupt. User with email {trusterEmail} is not registered.");
            }

            return new BaseJsonResponse<WelcomeResultViewModel>(new WelcomeResultViewModel
            {
                Truster = trusterEmail,
                TrusterName = trusterUser.NickName ?? trusterUser.UserName,
                Email = guestEmail,
                Roles = new List<string>(roles)
            });
        }

        [HttpPost("invite")]
        [Roles(CustomRoles.CanImpersonate)]
        public async Task<BaseJsonResponse> Invite([FromBody] ImpersonationInvitationPostModel model)
        {
            if (!ModelState.IsValid)
                return new BaseJsonResponse(false, ModelState.Errors());

            #region Validation
            var user = await _userManager.GetUserAsync(User);
            if (string.Compare(model.Email, user.Email, true) == 0)
                return new BaseJsonResponse(false, "Unable to invite yourself.");

            var guest = await _userManager.FindByEmailAsync(model.Email);
            if ((guest?.AccountType ?? AccountType.CareGiver) != AccountType.CareGiver)
                return new BaseJsonResponse(false, "Unable to invite Patient. The invited user should be Caregiver.");
            #endregion

            var guestGuid = await _impersonationProvider.Invite(user.Email, model.Email, model.Roles);

            try
            {
                await _emailService.SendInvitationToImpersonate(guestGuid, user.Email, model.Email, model.Roles);
            }
            catch (Exception ex)
            {
                return new BaseJsonResponse(false, ex.Message);
            }

            return new BaseJsonResponse();
        }

        [HttpGet("Profile")]
        [Roles(CustomRoles.Administrator, CustomRoles.ProfileRead, CustomRoles.ProfileWrite)]
        public async Task<BaseJsonResponse<AccountViewModel>> Profile()
        {
            var userId = User.GetId();

            var profile = await _userProvider.GetProfileAsync(userId);
            var postalCode = profile.Profile.PostalCode;
            string location = null;
            if (string.IsNullOrEmpty(postalCode))
            {
                var intakeForm = _intakeManagerProvider.GetLatest(userId);
                if (intakeForm != null)
                    postalCode = intakeForm.PostalCode;
            }
            if (!string.IsNullOrEmpty(postalCode))
            {
                using var client = new HttpClient();
                using var response = await client.GetAsync($"https://geocoder.ca/{postalCode}?json=1");
                if (response.IsSuccessStatusCode)
                {
                    var res = await response.Content.ReadAsStringAsync();
                    var jsonObj = Newtonsoft.Json.Linq.JObject.Parse(res);
                    if (jsonObj["error"] == null)
                    {
                        var city = jsonObj["standard"]["city"];
                        var province = jsonObj["standard"]["prov"];
                        location = $"{city}, {province.ToString().ToUpper()}";
                    }
                }
            }

            var result = new AccountViewModel
            {
                Profile = new ProfileViewModel
                {
                    AccountType = profile.Profile.AccountType,
                    BackgroundImageCode = profile.Profile.BackgroundImageCode,
                    Email = profile.Profile.Email,
                    Id = userId,
                    Location = location,
                    PostalCode = postalCode,
                    ProfileColor = profile.Profile.ProfileColor,
                    ScreenName = !string.IsNullOrEmpty(profile.Profile.NickName) ? profile.Profile.NickName : _userManager.Users.Single(u => u.Id == userId).UserName
                },
                CommonQuestions = profile.CommonQuestions == null ? null : AutoMapperHelper.Mapper.Map<CommonQuestionsViewModel>(profile.CommonQuestions)
            };

            if (profile.Profile.AccountType == AccountType.CareGiver)
                result.CaregiverQuestions = AutoMapperHelper.Mapper.Map<CaregiverQuestionsViewModel>((CaregiverQuestionsDto)profile.Questions);
            else
                result.PatientQuestions = AutoMapperHelper.Mapper.Map<PatientQuestionsViewModel>((PatientQuestionsDto)profile.Questions);

            return new BaseJsonResponse<AccountViewModel>(result);
        }

        [HttpPost("profile")]
        [Roles(CustomRoles.Administrator, CustomRoles.ProfileWrite)]
        public async Task<BaseJsonResponse> UpdateProfile([FromBody] AccountViewModel profilePostModel)
        {
            if (!ModelState.IsValid)
                return new BaseJsonResponse(false, ModelState.Errors());

            var userId = User.GetId();
            var passwordError = false;

            AccountDto accountDto = new AccountDto();

            if (profilePostModel.Profile != null)
            {
                if (!string.IsNullOrWhiteSpace(profilePostModel.Profile.NewPassword))
                {
                    var user = await _userManager.FindByIdAsync(userId);
                    try
                    {
                        await _userManager.ChangePasswordAsync(user, profilePostModel.Profile.CurrentPassword, profilePostModel.Profile.NewPassword);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"User {userId} tryed to change password.");
                        passwordError = true;
                    }
                }

                if (passwordError)
                    return new BaseJsonResponse(false, "Unable to change password. Please check that the old password is correct and that the new password has enough strength.");

                var profile = await _userProvider.GetProfileAsync(userId);

                accountDto.Profile = new ProfileDto
                {
                    AccountType = profile.Profile.AccountType,
                    Email = profile.Profile.Email,
                    NickName = profilePostModel.Profile.ScreenName,
                    UserId = userId,
                    PostalCode = profilePostModel.Profile.PostalCode,
                    BackgroundImageCode = profilePostModel.Profile.BackgroundImageCode,
                    ProfileColor = profilePostModel.Profile.ProfileColor
                };
            }

            if (profilePostModel.CaregiverQuestions != null)
                accountDto.Questions = AutoMapperHelper.Mapper.Map<CaregiverQuestionsDto>(profilePostModel.CaregiverQuestions);
            
            if (profilePostModel.PatientQuestions != null)
                accountDto.Questions = AutoMapperHelper.Mapper.Map<PatientQuestionsDto>(profilePostModel.PatientQuestions);

            if (profilePostModel.CommonQuestions != null)
                accountDto.CommonQuestions = AutoMapperHelper.Mapper.Map<CommonQuestionsDto>(profilePostModel.CommonQuestions);

            await _userProvider.UpdateProfileAsync(userId, accountDto);

            return new BaseJsonResponse();
        }

        [HttpGet("image")]
        [AllowAnonymous]
        [ResponseCache(Duration = 30)]
        public async Task<IActionResult> GetProfileImage([FromQuery] string userId)
        {
            if (string.IsNullOrWhiteSpace(userId)) return BadRequest("userId is a required URL parameter.");

            (byte[] file, string contentType) = await _userProvider.GetProfileImageAsync(userId);

            if (file != null)
            {
                return File(file, contentType, "profile_image");
            }
            else
            {
                var contentRoot = _configuration.GetValue<string>(WebHostDefaults.ContentRootKey);
                var profileSvg = Path.Combine(contentRoot, "Resources", "profile.svg");
                try
                {
                    var stream = System.IO.File.OpenRead(profileSvg);
                    return File(stream, "image/svg+xml");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, ex.Message);
                    return new BaseJsonResponse(false, "Unable to read the default Resources/profile.svg file. Please check out the deployment, or create this folder/file manually.");
                }
            }
        }

        [HttpPost("image")]
        [Roles(CustomRoles.Administrator, CustomRoles.ProfileWrite)]
        public async Task<BaseJsonResponse> PostProfileImage([FromForm] FilePostModel filePostModel)
        {
            var userId = User.GetId();
            if (userId == null)
                return new BaseJsonResponse(false, "User not found.");

            if (!ModelState.IsValid)
                return new BaseJsonResponse(false, ModelState.Errors());
            if (filePostModel == null || filePostModel.File == null)
                return new BaseJsonResponse(false, "File not set.");
            if (filePostModel.File.Length > maxFileSize)
                return new BaseJsonResponse(false, $"File size should be no more than {maxFileSizeKB} KB.");

            using var memStream = new MemoryStream();
            await filePostModel
                .File
                .OpenReadStream()
                .CopyToAsync(memStream);
            var bytes = memStream.ToArray();

            await _userProvider.UploadProfileImageAsync(userId, bytes, filePostModel.File.ContentType);

            return new BaseJsonResponse();
        }

        [HttpGet("BasicInfo")]
        [Roles(CustomRoles.Administrator, CustomRoles.ProfileRead, CustomRoles.ProfileWrite)]
        public BaseJsonResponse<BasicInfoDto> BasicInfo()
        {
            var userId = User.GetId();
            if (String.IsNullOrEmpty(userId))
            {
                return new BaseJsonResponse<BasicInfoDto>(new BasicInfoDto());
            }
            var basicInfo = _intakeManagerProvider.GetBasicInfo(userId);
            return new BaseJsonResponse<BasicInfoDto>(basicInfo);
        }
    }
}
