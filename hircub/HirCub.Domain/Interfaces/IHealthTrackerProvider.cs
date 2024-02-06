using CareHub.Domain.Dtos;
using System;

namespace CareHub.Domain.Interfaces
{
    public interface IHealthTrackerProvider
    {
        void SubmitConcerns(string userId, HealthStateTransport healthStateTransport, DateTime? date = null);

        void SubmitQuestions(string userId, HealthStateTransport healthStateTransport, DateTime? date = null);

        void SubmitHealth(string userId, HealthStateTransport healthStateTransport, DateTime? date = null);
    }
}
