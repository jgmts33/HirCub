using System;
using System.Linq;
using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;

namespace CareHub.Domain.Providers
{
    public class IntakeManagerProvider : IIntakeManagerProvider
    {
        private readonly DomainDbContext _context;

        public IntakeManagerProvider(DomainDbContext context)
        {
            _context = context;
        }

        public void Create(IntakeManagerFormDto intakeManagerFormDto, string userId)
        {
            var intakeManagerForm = AutoMapperHelper.Mapper.Map<IntakeManagerForm>(intakeManagerFormDto);
            intakeManagerForm.UserId = userId;
            _context.IntakeManagerForms.Add(intakeManagerForm);
            if (!String.IsNullOrEmpty(intakeManagerFormDto.ScreenName))
            {
                var user = _context.Users.Single(u => u.Id == userId);
                user.NickName = intakeManagerFormDto.ScreenName;
            }
            _context.SaveChanges();
        }

        public BasicInfoDto GetBasicInfo(string userId)
        {
            var latestForm = _context
                .IntakeManagerForms
                .Where(imf => imf.UserId == userId)
                .Where(imf => imf.CaredName != null)
                .OrderByDescending(imf => imf.Id)
                .FirstOrDefault();
            var basicInfo = new BasicInfoDto
            {
                CaredName = latestForm?.CaredName
            };
            return basicInfo;
        }

        public IntakeManagerFormDto GetLatest(string userId)
        {
            var intakeManagerForm = AutoMapperHelper.Mapper.Map<IntakeManagerFormDto>(_context.IntakeManagerForms
                .Where(imf => imf.UserId == userId)
                .OrderByDescending(imf => imf.Id).FirstOrDefault());
            return intakeManagerForm;
        }
    }
}
