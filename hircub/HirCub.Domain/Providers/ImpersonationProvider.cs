using CareHub.Domain.Dtos;
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
    public class ImpersonationProvider : IImpersonationProvider
    {
        #region Internals
        readonly DomainDbContext context;

        (string TrusterName, string TrusterEmail, string GuestEmail, List<string> Roles) GetImpersonationDetailsInternal(IEnumerable<ImpersonationRecord> records)
        {
            var anyRecord = records
                .OrderByDescending(r => r.TrusterName)
                .FirstOrDefault();

            return (
                anyRecord?.TrusterName,
                anyRecord?.TrusterEmail,
                anyRecord?.GuestEmail,
                Roles: records.Select(r => r.Role).ToList()
            );
        }
        #endregion

        public ImpersonationProvider(DomainDbContext context) => this.context = context;

        public async Task<List<ImpersonationPerson>> GetUsersToImpersonate(string email)
        {
            var records = await (
                from ir in context.ImpersonationRecords
                join user in context.Users on ir.TrusterEmail equals user.Email
                where ir.GuestEmail == email
                select new { user.Id, TrusterEmail = user.Email, TrusterName = user.UserName, user.ProfileColor, ir.Role }
                ).ToListAsync();
            
            return records
                .GroupBy(r => r.Id)
                .Select(group =>
                {
                    var user = group.First();
                    return new ImpersonationPerson(user.Id, user.TrusterEmail, user.TrusterName, user.ProfileColor, 
                        group
                            .Select(item => item.Role)
                            .OrderBy(role => role));
                })
                .ToList();
        }

        public async Task SetImpersonationName(string email, string trusterEmail, string trusterName)
        {
            var records = await context
                .ImpersonationRecords
                .Where(r => r.GuestEmail == email)
                .Where(r => r.TrusterEmail == trusterEmail)
                .ToListAsync();

            records.ForEach(r => r.TrusterName = trusterName);

            await context.SaveChangesAsync();
        }

        public async Task<(string TrusterName, string TrusterEmail, string GuestEmail, List<string> Roles)> GetImpersonationDetails(string email, string trusterEmail)
        {
            var records = await context
                .ImpersonationRecords
                .Where(r => r.GuestEmail == email)
                .Where(r => r.TrusterEmail == trusterEmail)
                .OrderBy(r => r.Role)
                .ToListAsync();

            return GetImpersonationDetailsInternal(records);
        }

        public async Task<(string TrusterName, string TrusterEmail, string GuestEmail, List<string> Roles)> GetImpersonationDetails(Guid guestGuid)
        {
            var records = await context
                .ImpersonationRecords
                .Where(r => r.GuestGuid == guestGuid)
                .OrderBy(r => r.Role)
                .ToListAsync();

            return GetImpersonationDetailsInternal(records);
        }

        public async Task<Guid> Invite(string email, string guestEmail, IEnumerable<string> roles, string trusterName = null)
        {
            var existingRecords = await context
                .ImpersonationRecords
                .Where(r => r.TrusterEmail == email)
                .Where(r => r.GuestEmail == guestEmail)
                .ToListAsync();

            var useTrusterName = !string.IsNullOrEmpty(trusterName) ?
                trusterName :
                existingRecords
                    .FirstOrDefault(r => r.TrusterName != null)?
                    .TrusterName;

            context.RemoveRange(existingRecords);

            var guestGuid = Guid.NewGuid();
            var newRecords = roles
                .Select(role => new ImpersonationRecord
                {
                    TrusterEmail = email,
                    TrusterName = useTrusterName,
                    GuestEmail = guestEmail,
                    Role = role,
                    GuestGuid = guestGuid
                });

            await context.AddRangeAsync(newRecords);
            await context.SaveChangesAsync();

            return guestGuid;
        }

        public async Task<bool> IsInvitedAsync(string email, CancellationToken cancellationToken = default)
        {
            return await context
                .ImpersonationRecords
                .AnyAsync(rec => rec.GuestEmail == email)
                .ConfigureAwait(false);
        }
    }
}
