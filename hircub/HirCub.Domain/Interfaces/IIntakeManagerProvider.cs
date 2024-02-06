using CareHub.Domain.Dtos;

namespace CareHub.Domain.Interfaces
{
    public interface IIntakeManagerProvider
    {
        void Create(IntakeManagerFormDto intakeManagerFormDto, string userId);
        BasicInfoDto GetBasicInfo(string userId);
        IntakeManagerFormDto GetLatest(string userId);
    }
}
