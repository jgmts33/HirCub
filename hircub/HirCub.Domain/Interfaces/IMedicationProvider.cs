using System.Collections.Generic;
using System.Threading.Tasks;
using CareHub.Domain.Dtos;

namespace CareHub.Domain.Interfaces
{
    public interface IMedicationProvider
    {
        Task<MedicationDto> CreateAsync(MedicationDto newEntry);
        Task<MedicationDto> GetAsync(string userId, long id);
        Task<List<MedicationDto>> GetAllAsync(string userId);
        Task<MedicationDto> UpdateAsync(string userId,long id,MedicationDto updatedEntry);
        Task<bool> DeleteAsync(string userId, long id);
    }
}