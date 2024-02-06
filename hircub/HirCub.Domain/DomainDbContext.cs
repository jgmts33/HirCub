using CareHub.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CareHub.Domain
{
    public class DomainDbContext : IdentityDbContext<ApplicationUser>
    {
        public DomainDbContext(DbContextOptions<DomainDbContext> options)
            : base(options) { }

        public DbSet<Concern> Concerns { get; set; }
        public DbSet<ConcernValue> ConcernValues { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<IntakeManagerForm> IntakeManagerForms { get; set; }
        public DbSet<NotificationsSchedule> NotificationsSchedules { get; set; }
        public DbSet<PainProblem> PainProblems { get; set; }
        public DbSet<Problem> Problems { get; set; }
        public DbSet<ProblemType> ProblemTypes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Suggestion> Suggestions { get; set; }
        public DbSet<TrackedConcern> TrackedConcerns { get; set; }
        public DbSet<TrackedHealthState> TrackedHealthStates { get; set; }
        public DbSet<UsersSuggestion> UsersSuggestions { get; set; }
        public DbSet<JournalEntry> JournalEntries { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<MedicationEntity> Medications { get; set; }
        public DbSet<FinanceRecord> FinanceRecords { get; set; }
        public DbSet<FinanceCategory> FinanceCategories { get; set; }
        public DbSet<ImpersonationRecord> ImpersonationRecords { get; set; }
        public DbSet<ProfileQuestionsPatient> ProfileQuestionsPatient { get; set; }
        public DbSet<ProfileQuestionsCaregiver> ProfileQuestionsCaregiver { get; set; }
        public DbSet<ProfileQuestionsCommon> ProfileQuestionsCommon { get; set; }
        public DbSet<ProfileImage> ProfileImages { get; set; }
        public DbSet<ReminderReference> ReminderReferences { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<CareNeeds> CareNeeds { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<JournalEntry>()
                .HasMany(e => e.Tags)
                .WithMany(t => t.JournalEntries)
                .UsingEntity(j => j.ToTable("JournalEntryTags"));

            modelBuilder
                .Entity<FinanceRecord>()
                .HasMany(e => e.Categories)
                .WithMany(c => c.FinanceRecords)
                .UsingEntity(j => j.ToTable("FinanceRecordCategories"));

            modelBuilder
                .Entity<Concern>()
                .HasMany(c => c.ConcernValues)
                .WithOne(v => v.Concern);

            modelBuilder
                .Entity<ApplicationUser>()
                .Property(u => u.FirstLogin)
                .HasDefaultValue(true);

            #region Profile
            modelBuilder
                .Entity<ProfileQuestionsPatient>()
                .HasIndex(q => q.UserId)
                .IsUnique();
            modelBuilder
                .Entity<ProfileQuestionsCaregiver>()
                .HasIndex(q => q.UserId)
                .IsUnique();
            modelBuilder
                .Entity<ProfileQuestionsCommon>()
                .HasIndex(q => q.UserId)
                .IsUnique();
            modelBuilder
                .Entity<ProfileImage>()
                .HasIndex(q => q.UserId)
                .IsUnique();

            modelBuilder
                .Entity<ProfileQuestionsPatient>()
                .Property(q => q.UserId)
                .IsRequired();
            modelBuilder
                .Entity<ProfileQuestionsCaregiver>()
                .Property(q => q.UserId)
                .IsRequired();
            modelBuilder
                .Entity<ProfileQuestionsCommon>()
                .Property(q => q.UserId)
                .IsRequired();
            modelBuilder
                .Entity<ProfileImage>()
                .Property(img => img.UserId)
                .IsRequired();
            #endregion

            #region Reminders
            modelBuilder
                .Entity<ReminderReference>()
                .HasData(
                    new ReminderReference { Id = 1, Name = "Calendar" },
                    new ReminderReference { Id = 2, Name = "Health Tracker" },
                    new ReminderReference { Id = 3, Name = "Expense Tracker" },
                    new ReminderReference { Id = 4, Name = "Medication Tracker" },
                    new ReminderReference { Id = 5, Name = "Mobility Tracker" },
                    new ReminderReference { Id = 6, Name = "Caregiving Needs Questionnaire" },
                    new ReminderReference { Id = 7, Name = "Profile Update" },
                    new ReminderReference { Id = 8, Name = "Library" }
                );

            modelBuilder
                .Entity<Reminder>()
                .Property(r => r.UserId)
                .IsRequired();
            modelBuilder
                .Entity<Reminder>()
                .HasIndex(r => new { r.UserId, r.ReminderReferenceId })
                .IsUnique();
            #endregion

            #region Welcome Questions Answers
            modelBuilder
                .Entity<Answer>()
                .Property(a => a.UserId)
                .IsRequired();
            modelBuilder
                .Entity<Answer>()
                .Property(a => a.QuestionId)
                .IsRequired();
            modelBuilder
                .Entity<Answer>()
                .Property(a => a.AnswerId)
                .IsRequired();

            modelBuilder
                .Entity<Answer>()
                .HasIndex(a => new { a.UserId, a.DateTime });
            #endregion

            #region CareNeeds Tool Questions
            modelBuilder
                .Entity<CareNeeds>()
                .Property(c => c.UserId)
                .IsRequired();
            modelBuilder
                .Entity<CareNeeds>()
                .Property(c => c.Name)
                .IsRequired();
            modelBuilder
                .Entity<CareNeeds>()
                .Property(c => c.Value)
                .IsRequired();

            modelBuilder
                .Entity<CareNeeds>()
                .HasIndex(c => new { c.UserId, c.DateTime });
            #endregion

            base.OnModelCreating(modelBuilder);
        }
    }
}
