using System;
using System.Linq;
using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;

namespace CareHub.Domain.Providers
{
    public class HealthTrackerProvider : IHealthTrackerProvider
    {
        #region Internals
        readonly DomainDbContext _context;
        #endregion

        public HealthTrackerProvider(DomainDbContext context)
        {
            _context = context;
        }

        public void SubmitConcerns(string userId, HealthStateTransport healthStateTransport, DateTime? date = null)
        {
            var concernsDict = _context
                .Concerns
                .ToDictionary(c => c.InternalName, c => c.Id);
            var trackedHealthState = AutoMapperHelper.Mapper.Map<TrackedHealthState>(healthStateTransport);
            var utcNow = date;
            trackedHealthState.DateCreated = date ?? DateTime.UtcNow;
            var trackedConcerns = healthStateTransport.TrackedConcerns.SelectMany(tc => tc.Value.Select(v =>
                new TrackedConcern
                {
                    ConcernId = concernsDict[tc.Key],
                    ConcernValue = v
                })).ToList();
            trackedHealthState.TrackedConcerns = trackedConcerns;
            trackedHealthState.UserId = userId;
            _context.TrackedHealthStates.Add(trackedHealthState);
            _context.SaveChanges();
        }

        public void SubmitQuestions(string userId, HealthStateTransport healthStateTransport, DateTime? date = null)
        {
            var trackedHealthState = AutoMapperHelper.Mapper.Map<TrackedHealthState>(healthStateTransport);
            var utcNow = date ?? DateTime.UtcNow;
            trackedHealthState.DateCreated = utcNow;
            trackedHealthState.UserId = userId;
            _context.TrackedHealthStates.Add(trackedHealthState);
            _context.SaveChanges();
        }

        public void SubmitHealth(string userId, HealthStateTransport healthStateTransport, DateTime? date = null)
        {
            var trackedHealthState = AutoMapperHelper.Mapper.Map<TrackedHealthState>(healthStateTransport);
            var utcNow = date ?? DateTime.UtcNow;
            trackedHealthState.DateCreated = utcNow;
            trackedHealthState.UserId = userId;
            _context.TrackedHealthStates.Add(trackedHealthState);
            _context.SaveChanges();
        }
    }
}
