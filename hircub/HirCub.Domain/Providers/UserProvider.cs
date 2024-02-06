using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Enums;
using CareHub.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Providers
{
    public class UserProvider : IUserProvider
    {
        readonly DomainDbContext context;

        public UserProvider(DomainDbContext context) => this.context = context;

        public async Task<ApplicationUser> GetUserAsync(string userId, CancellationToken cancellationToken = default) =>
            await context.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        public async Task<AccountDto> GetProfileAsync(string userId, CancellationToken cancellationToken = default)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
            if (user == null) throw new System.Exception("User not found.");

            var profileDto = new ProfileDto
            {
                UserId = user.Id,
                AccountType = user.AccountType,
                BackgroundImageCode = user.BackgroundImageCode,
                Email = user.Email,
                NickName = user.NickName,
                PostalCode = user.PostalCode,
                ProfileColor = user.ProfileColor
            };

            QuestionsDto questionsDto = null;
            if (profileDto.AccountType == AccountType.CareGiver)
            {
                var caregiverQuestions = await context.ProfileQuestionsCaregiver.FirstOrDefaultAsync(q => q.UserId == userId, cancellationToken);
                if (caregiverQuestions != null)
                    questionsDto = AutoMapperHelper.Mapper.Map<CaregiverQuestionsDto>(caregiverQuestions);
            }
            else if (profileDto.AccountType == AccountType.Patient)
            {
                var patientQuestions = await context.ProfileQuestionsPatient.FirstOrDefaultAsync(q => q.UserId == userId, cancellationToken);
                if (patientQuestions != null)
                    questionsDto = AutoMapperHelper.Mapper.Map<PatientQuestionsDto>(patientQuestions);
            }
            else
            {
                throw new InvalidOperationException($"Unsupported {nameof(AccountType)}: {user.AccountType}");
            }

            var commonQuestions = await context.ProfileQuestionsCommon.FirstOrDefaultAsync(q => q.UserId == userId, cancellationToken);
            CommonQuestionsDto commonQuestionsDto = null;
            if (commonQuestions != null)
                commonQuestionsDto = AutoMapperHelper.Mapper.Map<CommonQuestionsDto>(commonQuestions);

            return new AccountDto
            {
                Profile = profileDto,
                Questions = questionsDto,
                CommonQuestions = commonQuestionsDto
            };
        }

        public async Task UpdateProfileAsync(string userId, AccountDto profile, CancellationToken cancellationToken = default)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
            if (user == null) throw new Exception("User not found.");

            if (profile.Profile != null)
            {
                if (profile.Profile.PostalCode != user.PostalCode ||
                    profile.Profile.BackgroundImageCode != user.BackgroundImageCode ||
                    profile.Profile.NickName != user.NickName ||
                    profile.Profile.ProfileColor != user.ProfileColor)
                {
                    user.PostalCode = profile.Profile.PostalCode;
                    user.BackgroundImageCode = profile.Profile.BackgroundImageCode;
                    user.NickName = profile.Profile.NickName;
                    user.ProfileColor = profile.Profile.ProfileColor;
                }
            }

            if (profile.Questions != null)
            {
                if (user.AccountType == AccountType.CareGiver)
                {
                    var questionsDto = (CaregiverQuestionsDto)profile.Questions;
                    var questionsCaregiver = await context.ProfileQuestionsCaregiver.FirstOrDefaultAsync(q => q.UserId == userId);
                    if (questionsCaregiver != null)
                    {
                        questionsCaregiver.Age = questionsDto.Age;
                        questionsCaregiver.CaregivingAmountOfTime = questionsDto.CaregivingAmountOfTime;
                        questionsCaregiver.CaregivingFrequency = questionsDto.CaregivingFrequency;
                        questionsCaregiver.CaringFor = questionsDto.CaringFor;
                        questionsCaregiver.ExperienceLength = questionsDto.ExperienceLength;
                        questionsCaregiver.Gender = questionsDto.Gender;
                        questionsCaregiver.GenderOther = questionsDto.GenderOther;
                        questionsCaregiver.HaveChildrenOrOthersWhomAlsoCaring = questionsDto.HaveChildrenOrOthersWhomAlsoCaring;
                        questionsCaregiver.HaveExperienceProvidingCare = questionsDto.HaveExperienceProvidingCare;
                        questionsCaregiver.NotesAboutCaregiving = questionsDto.NotesAboutCaregiving;
                        questionsCaregiver.Responsibilities = questionsDto.Responsibilities;
                        questionsCaregiver.UserId = userId;
                    }
                    else
                    {
                        questionsCaregiver = AutoMapperHelper.Mapper.Map<ProfileQuestionsCaregiver>((CaregiverQuestionsDto)profile.Questions);
                        questionsCaregiver.UserId = userId;
                        context.Add(questionsCaregiver);
                    }
                }
                else if (user.AccountType == AccountType.Patient)
                {
                    var questionsDto = (PatientQuestionsDto)profile.Questions;
                    var questionsPatient = await context.ProfileQuestionsPatient.FirstOrDefaultAsync(q => q.UserId == userId);
                    if (questionsPatient != null)
                    {
                        questionsPatient.Age = questionsDto.Age;
                        questionsPatient.Gender = questionsDto.Gender;
                        questionsPatient.GenderOther = questionsDto.GenderOther;
                        questionsPatient.LivingWithMainHealthIssue = questionsDto.LivingWithMainHealthIssue;
                        questionsPatient.MainHealthIssue = questionsDto.MainHealthIssue;
                        questionsPatient.NotesForCaregiver = questionsDto.NotesForCaregiver;
                        questionsPatient.UserId = userId;
                    }
                    else
                    {
                        questionsPatient = AutoMapperHelper.Mapper.Map<ProfileQuestionsPatient>((PatientQuestionsDto)profile.Questions);
                        questionsPatient.UserId = userId;
                        context.Add(questionsPatient);
                    }
                }
                else
                {
                    throw new Exception($"Unsupported {nameof(AccountType)}: {(int)user.AccountType}");
                }
            }

            if (profile.CommonQuestions != null)
            {
                var commonQuestions = await context.ProfileQuestionsCommon.FirstOrDefaultAsync(q => q.UserId == userId);
                if (commonQuestions != null)
                {
                    commonQuestions.InterestedSupporingChildren = profile.CommonQuestions.InterestedSupporingChildren;
                    commonQuestions.InterestedAboutGrieving = profile.CommonQuestions.InterestedAboutGrieving;
                    commonQuestions.InterestedAboutIndigenousPeople = profile.CommonQuestions.InterestedAboutIndigenousPeople;
                    commonQuestions.InterestedInInclusiveness = profile.CommonQuestions.InterestedInInclusiveness;
                    commonQuestions.UserId = userId;
                }
                else
                {
                    commonQuestions = AutoMapperHelper.Mapper.Map<ProfileQuestionsCommon>(profile.CommonQuestions);
                    commonQuestions.UserId = userId;
                    context.Add(commonQuestions);
                }
            }

            await context.SaveChangesAsync(cancellationToken);
        }

        public async Task<(byte[] File, string ContentType)> GetProfileImageAsync(string userId, CancellationToken cancellationToken = default)
        {
            var image = await context.ProfileImages.FirstOrDefaultAsync(img => img.UserId == userId, cancellationToken);

            return image != null ? (image.Image, image.ContentType) : (null, null);
        }

        public async Task UploadProfileImageAsync(string userId, byte[] file, string contentType, CancellationToken cancellationToken = default)
        {
            var image = await context.ProfileImages.FirstOrDefaultAsync(img => img.UserId == userId, cancellationToken);
            if (image != null)
            {
                image.Image = file;
                image.ContentType = contentType;
            }
            else
            {
                image = new ProfileImage { Image = file, ContentType = contentType, UserId = userId };
                context.Add(image);
            }
            await context.SaveChangesAsync(cancellationToken);
        }

        public async Task ClearFirstLoginAsync(string userId, CancellationToken cancellationToken = default)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);
            if (user != null)
            {
                user.FirstLogin = false;
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
