using System.Collections.Generic;
using System.Linq;

namespace CareHub.API.Auth
{
    public static class CustomRoles
    {
        public const string Administrator = nameof(Administrator);
        public const string Caregiver = nameof(Caregiver);

        public const string CanImpersonate = nameof(CanImpersonate);
        public const string CanDeimpersonate = nameof(CanDeimpersonate);

        public const string HealthTrackerRead = nameof(HealthTrackerRead);
        public const string HealthTrackerWrite = nameof(HealthTrackerWrite);
        public const string FinanceTrackerRead = nameof(FinanceTrackerRead);
        public const string FinanceTrackerWrite = nameof(FinanceTrackerWrite);
        public const string MedicationTrackerRead = nameof(MedicationTrackerRead);
        public const string MedicationTrackerWrite = nameof(MedicationTrackerWrite);
        public const string CalendarRead = nameof(CalendarRead);
        public const string CalendarWrite = nameof(CalendarWrite);
        public const string LibraryRead = nameof(LibraryRead);
        public const string LibraryWrite = nameof(LibraryWrite);
        public const string HealthReportsRead = nameof(HealthReportsRead);
        public const string HealthReportsWrite = nameof(HealthReportsWrite);
        public const string ProfileRead = nameof(ProfileRead);
        public const string ProfileWrite = nameof(ProfileWrite);
        public const string JournalEntryRead = nameof(JournalEntryRead);
        public const string JournalEntryWrite = nameof(JournalEntryWrite);

        public static IEnumerable<string> AllRolesForSeed => AllOrdinary.Union(RegisterRoles).Union(new string[] { Administrator, CanDeimpersonate, Caregiver });

        public static IEnumerable<string> AllOrdinary { get; } = new string[]
        {
            HealthTrackerRead,
            HealthTrackerWrite,
            FinanceTrackerRead,
            FinanceTrackerWrite,
            MedicationTrackerRead,
            MedicationTrackerWrite,
            CalendarRead,
            CalendarWrite,
            LibraryRead,
            LibraryWrite,
            HealthReportsRead,
            HealthReportsWrite,
            ProfileRead,
            ProfileWrite,
            JournalEntryRead,
            JournalEntryWrite
        };

        public static IEnumerable<string> RegisterRoles => AllOrdinary.Union(new string[] { CanImpersonate });
    }
}
