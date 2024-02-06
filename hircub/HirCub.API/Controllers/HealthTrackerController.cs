using CareHub.API.Auth;
using CareHub.API.Models;
using CareHub.Domain.Dtos;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthTrackerController : ControllerBase
    {
        private readonly IHealthTrackerProvider _healthTrackerProvider;
        public HealthTrackerController(IHealthTrackerProvider healthTrackerProvider)
        {
            _healthTrackerProvider = healthTrackerProvider;
        }

        [HttpPost("ScheduleNotifications")]
        [Roles(CustomRoles.Administrator, CustomRoles.HealthTrackerWrite)]
        public BaseJsonResponse ScheduleNotifications([FromBody] NotificationsSchedulePostModel notificationsSchedulePostModel)
        {
            return new BaseJsonResponse();
        } 
        
        [HttpGet]
        [Roles(CustomRoles.Administrator, CustomRoles.HealthTrackerRead, CustomRoles.HealthTrackerWrite)]
        public BaseJsonResponse Get()
        {
            return new BaseJsonResponse();
        }
        
        [HttpPost("concerns")]
        [Roles(CustomRoles.Administrator, CustomRoles.HealthTrackerWrite)]
        public BaseJsonResponse PostForm1Concerns([FromBody] HealthStatePostModel concernsPostModel)
        {
            if (!(concernsPostModel.Concerns?.Any() ?? false))
            {
                return new BaseJsonResponse(false, "No concerns provided.");
            }

            var userId = User.GetId();
            var healthStateTransport = AutoMapperHelper.Mapper.Map<HealthStateTransport>(concernsPostModel);
            _healthTrackerProvider.SubmitConcerns(userId, healthStateTransport);
            return new BaseJsonResponse();
        }

        [HttpPost("questions")]
        [Roles(CustomRoles.Administrator, CustomRoles.HealthTrackerWrite)]
        public BaseJsonResponse PostForm2Questions([FromBody] HealthStatePostModel questionsPostModel)
        {
            if (!questionsPostModel.Happiness.HasValue && !questionsPostModel.Content.HasValue)
            {
                return new BaseJsonResponse(false, "Neither happiness nor content value was provided.");
            }

            var userId = User.GetId();
            var healthStateTransport = AutoMapperHelper.Mapper.Map<HealthStateTransport>(questionsPostModel);
            _healthTrackerProvider.SubmitQuestions(userId, healthStateTransport);
            return new BaseJsonResponse();
        }

        [HttpPost("health")]
        [Roles(CustomRoles.Administrator, CustomRoles.HealthTrackerWrite)]
        public BaseJsonResponse PostForm3Health([FromBody] HealthStatePostModel healthStatePostModel)
        {
            if (!(healthStatePostModel.Problems?.Any() ?? false) && healthStatePostModel.PainProblem == null)
            {
                return new BaseJsonResponse(false, "Neither pain nor other health values were provided.");
            }

            var userId = User.GetId();
            var healthStateTransport = AutoMapperHelper.Mapper.Map<HealthStateTransport>(healthStatePostModel);
            _healthTrackerProvider.SubmitHealth(userId, healthStateTransport);
            return new BaseJsonResponse();
        }
    }
}
