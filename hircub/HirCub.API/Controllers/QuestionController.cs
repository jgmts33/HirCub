using CareHub.API.Auth;
using CareHub.API.Models;
using CareHub.API.Utils;
using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : ControllerBase
    {
        #region Internals
        readonly IQuestionProvider questionProvider;
        #endregion

        public QuestionController(IQuestionProvider questionProvider) => this.questionProvider = questionProvider;

        [HttpGet]
        public BaseJsonResponse<List<QuestionViewModel>> Get()
        {
            var userId = User.GetId();
            var questions = questionProvider.Get(userId);
            var questionViewModels = AutoMapperHelper.Mapper.Map<List<QuestionViewModel>>(questions);
            return new BaseJsonResponse<List<QuestionViewModel>>(questionViewModels);
        }

        [HttpPost]
        public BaseJsonResponse<long> Post([FromBody] QuestionPostModel questionPostModel)
        {
            var userId = User.GetId();
            var questionDto = AutoMapperHelper.Mapper.Map<QuestionDto>(questionPostModel);
            var questionId = questionProvider.Create(questionDto, userId);
            return new BaseJsonResponse<long>(questionId);
        }

        [HttpPost("welcome")]
        [Roles(CustomRoles.Administrator, CustomRoles.Caregiver)]
        public async Task<BaseJsonResponse> PostWelcomeQuestions([FromBody] List<AnswerViewModel> model)
        {
            if (!ModelState.IsValid)
                return new BaseJsonResponse(false, ModelState.Errors());

            if ((model?.Count ?? 0) < 1)
                return new BaseJsonResponse(false, "No answers provided.");

            var userId = User.GetId();

            await questionProvider.SubmitAnswersAsync(userId, AutoMapperHelper.Mapper.Map<List<AnswerDto>>(model));

            return new BaseJsonResponse();
        }
    }
}
