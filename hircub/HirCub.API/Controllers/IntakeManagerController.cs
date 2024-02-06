using CareHub.API.Auth;
using CareHub.Domain.Dtos;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IntakeManagerController : ControllerBase
    {
        private readonly IIntakeManagerProvider _intakeManagerProvider;

        public IntakeManagerController(IIntakeManagerProvider intakeManagerProvider)
        {
            _intakeManagerProvider = intakeManagerProvider;
        }

        [HttpPost]
        public BaseJsonResponse Submit([FromBody] IntakeManagerFormDto intakeManagerPostModel)
        {
            var userId = User.GetId();
            _intakeManagerProvider.Create(intakeManagerPostModel, userId);
            return new BaseJsonResponse();
        }
    }
}
