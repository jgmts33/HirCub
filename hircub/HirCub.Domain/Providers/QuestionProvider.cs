using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Providers
{
    public class QuestionProvider : IQuestionProvider
    {
        private readonly DomainDbContext _context;

        public QuestionProvider(DomainDbContext context)
        {
            _context = context;
        }

        public List<QuestionDto> Get(string userId)
        {
            return AutoMapperHelper.Mapper.Map<List<QuestionDto>>(_context.Questions.Where(q => q.UserId == userId)
                .OrderByDescending(q => q.DateCreated));
        }

        public long Create(QuestionDto questionDto, string userId)
        {
            var question = AutoMapperHelper.Mapper.Map<Question>(questionDto);
            question.UserId = userId;
            question.DateCreated = DateTime.UtcNow;
            _context.Questions.Add(question);
            _context.SaveChanges();
            return question.Id;
        }

        public async Task SubmitAnswersAsync(string userId, List<AnswerDto> answers, DateTime? dateTime = null, CancellationToken cancellationToken = default)
        {
            var now = dateTime ?? DateTime.UtcNow;

            await _context.Answers.AddRangeAsync(answers
                .Select(a => new Answer
                {
                    UserId = userId,
                    DateTime = now,
                    QuestionId = a.QuestionId,
                    AnswerId = a.AnswerId
                }
            ), cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteAllWelcomeQuestionsAsync(string userId, CancellationToken cancellationToken = default)
        {
            var answersToDelete = await _context
                .Answers
                .Where(a => a.UserId == userId)
                .ToListAsync(cancellationToken);

            _context.RemoveRange(answersToDelete);

            await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        }

        public async Task SubmitCareNeedsAnswersAsync(string userId, List<CareNeedsDto> answers, DateTime? dateTime = null, CancellationToken cancellationToken = default)
        {
            var now = dateTime ?? DateTime.UtcNow;
            var today = now.Date;

            // Remove old rows for the same date, if any
            var rowsToDelete = await _context
                .CareNeeds
                .Where(cn => cn.UserId == userId)
                .Where(cn => cn.DateTime >= today)
                .Where(cn => cn.DateTime < today.AddDays(1))
                .ToListAsync();
            if (rowsToDelete.Count != 0)
            {
                _context.RemoveRange(rowsToDelete);
                await _context.SaveChangesAsync();
            }

            await _context.CareNeeds.AddRangeAsync(answers
                .Select(a => new CareNeeds
                {
                    UserId = userId,
                    DateTime = now,
                    Name = a.Name,
                    Value = a.Value
                }
            ), cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteAllCareNeedsAnswersAsync(string userId, CancellationToken cancellationToken = default)
        {
            var answersToDelete = await _context
                .CareNeeds
                .Where(a => a.UserId == userId)
                .ToListAsync(cancellationToken);

            _context.RemoveRange(answersToDelete);

            await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
        }
    }
}
