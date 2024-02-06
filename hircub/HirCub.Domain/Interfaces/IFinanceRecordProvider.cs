using CareHub.Domain.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CareHub.Domain.Interfaces
{
    public interface IFinanceRecordProvider
    {
        Task<List<FinanceRecordDto>> GetAllAsync(string userId);
        Task<FinanceRecordDto> GetAsync(string userId, long id);
        Task<FinanceRecordDto> UpdateAsync(string userId, FinanceRecordDto record);
        Task<FinanceRecordDto> CreateAsync(FinanceRecordDto newRecord);
        Task<bool> DeleteAsync(string userId, long id);

        #region Categories
        Task<List<string>> GetCategoriesForAllFinanceRecordsAsync(string userId);

        Task<List<string>> GetCategoriesForFinanceRecordAsync(string userId, long financeRecordId);

        Task<List<FinanceRecordDto>> GetAllFinanceRecordsForCategoryAsync(string userId, string category);
        #endregion
    }
}
