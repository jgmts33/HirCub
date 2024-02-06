using CareHub.Domain.Dtos;
using CareHub.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Interfaces
{
    public interface IUserProvider
    {
        Task<ApplicationUser> GetUserAsync(string userId, CancellationToken cancellationToken = default);

        Task<AccountDto> GetProfileAsync(string userId, CancellationToken cancellationToken = default);

        Task UpdateProfileAsync(string userId, AccountDto profile, CancellationToken cancellationToken = default);

        Task<(byte[] File, string ContentType)> GetProfileImageAsync(string userId, CancellationToken cancellationToken = default);

        Task UploadProfileImageAsync(string userId, byte[] file, string contentType, CancellationToken cancellationToken = default);

        Task ClearFirstLoginAsync(string userId, CancellationToken cancellationToken = default);
    }
}
