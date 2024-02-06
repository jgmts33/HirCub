using CareHub.Domain.Dtos;
using CareHub.Domain.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CareHub.API.Models
{
    public class RegisterPostModel
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        // https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function/46761018#46761018
        [RegularExpression(@"^[abceghj-nprstvxyABCEGHJ-NPRSTVXY]\d[abceghj-nprstv-zABCEGHJ-NPRSTV-Z][ -]?\d[abceghj-nprstv-zABCEGHJ-NPRSTV-Z]\d$", ErrorMessage = "Invalid postal code")]
        public string PostalCode { get; set; }
        
        [RegularExpression("^([\\w-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([\\w-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$", ErrorMessage = "Enter a valid email address")]
        public string Email { get; set; }
        
        public string Password { get; set; }
        
        public AccountType AccountType { get; set; }
        
        public bool? NoEmailAddress { get; set; }
    }

    public class LoginPostModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ProfileViewModel
    {
        public string Id { get; set; }
        [Required]
        public string ScreenName { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        [Required]
        public string PostalCode { get; set; }
        public AccountType AccountType { get; set; }
        public string ProfileColor { get; set; }
        public int BackgroundImageCode { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class PatientQuestionsViewModel
    {
        public Age? Age { get; set; }
        public Gender? Gender { get; set; }
        public string GenderOther { get; set; }
        public string MainHealthIssue { get; set; }
        public int? LivingWithMainHealthIssue { get; set; }
        public string NotesForCaregiver { get; set; }
    }

    public class CaregiverQuestionsViewModel
    {
        public Age? Age { get; set; }
        public Gender? Gender { get; set; }
        public string GenderOther { get; set; }
        public bool? HaveExperienceProvidingCare { get; set; }
        public int? ExperienceLength { get; set; }
        public int? CaregivingFrequency { get; set; }
        public int? CaregivingAmountOfTime { get; set; }
        public bool? HaveChildrenOrOthersWhomAlsoCaring { get; set; }
        public int? Responsibilities { get; set; }
        public int? CaringFor { get; set; }
        public string NotesAboutCaregiving { get; set; }
    }

    public class CommonQuestionsViewModel
    {
        public bool? InterestedInInclusiveness { get; set; }
        public bool? InterestedSupporingChildren { get; set; }
        public bool? InterestedAboutIndigenousPeople { get; set; }
        public bool? InterestedAboutGrieving { get; set; }
    }

    public class AccountViewModel
    {
        [Required]
        public ProfileViewModel Profile { get; set; }
        public PatientQuestionsViewModel PatientQuestions { get; set; }
        public CaregiverQuestionsViewModel CaregiverQuestions { get; set; }
        public CommonQuestionsViewModel CommonQuestions { get; set; }
    }

    public class LoginResultModel
    {
        public string AuthToken { get; set; }
        public BasicInfoDto BasicInfo { get; set; }
        public AccountType AccountType { get; set; }
        public bool FirstLogin { get; set; }

        /// <summary>
        ///  If this value is not null, then it contains an email of the impersonated user
        /// </summary>
        public ImpersonationPerson OnBehalfOf { get; set; }
    }

    /// <summary>
    ///  Result of the redirect from the invitation email sent by a trustee to the third-party person
    /// </summary>
    public class WelcomeResultViewModel
    {
        /// <summary>
        ///  Truster&apos;s email
        /// </summary>
        public string Truster { get; set; }

        public string TrusterName { get; set; }

        /// <summary>
        ///  Newly registering user&apos;s email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        ///  Roles that can be impersonated on behalf of the Truster
        /// </summary>
        public List<string> Roles { get; set; }
    }
}
