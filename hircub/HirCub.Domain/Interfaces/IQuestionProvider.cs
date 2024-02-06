using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Interfaces
{
    public interface IQuestionProvider
    {
        List<QuestionDto> Get(string userId);
        long Create(QuestionDto questionDto, string userId);

        Task SubmitAnswersAsync(string userId, List<AnswerDto> answers, DateTime? dateTime = null, CancellationToken cancellationToken = default);

        Task DeleteAllWelcomeQuestionsAsync(string userId, CancellationToken cancellationToken = default);

        Task SubmitCareNeedsAnswersAsync(string userId, List<CareNeedsDto> answers, DateTime? dateTime = null, CancellationToken cancellationToken = default);

        Task DeleteAllCareNeedsAnswersAsync(string userId, CancellationToken cancellationToken = default);
    }
}
