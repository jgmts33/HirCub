using CareHub.API.Auth;
using CareHub.API.Models;
using CareHub.Domain.Dtos;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FinanceRecordController : Controller
    {
        #region Internals
        readonly IFinanceRecordProvider _financeRecordProvider;
        #endregion

        public FinanceRecordController(IFinanceRecordProvider financeRecordProvider)
        {
            _financeRecordProvider=financeRecordProvider;
        }

        [HttpPost()]
        [Roles(CustomRoles.Administrator, CustomRoles.FinanceTrackerWrite)]
        public async Task<BaseJsonResponse<FinanceRecordPostModel>> Create([FromBody] FinanceRecordPostModel record)
        {
            var errors = new List<string>();
            if ((record?.Categories.Count ?? 0) == 0)
                errors.Add("Categories are required");
            if (string.IsNullOrEmpty(record.Location))
                errors.Add("Location is required");
            if (!record.Amount.HasValue)
                errors.Add("Amount is required");
            if (!record.Date.HasValue)
                errors.Add("Date is required");
            if (!record.EventId.HasValue)
                errors.Add("EventId is required");
            if (errors.Count > 0)
                return new BaseJsonResponse<FinanceRecordPostModel>(false, errors) { StatusCode = StatusCodes.Status406NotAcceptable };
            record.UserId = User.GetId();

            var financeRecordDto = AutoMapperHelper.Mapper.Map<FinanceRecordDto>(record);
            financeRecordDto.UserId = User.GetId();

            var newFinanceRecord = await _financeRecordProvider.CreateAsync(financeRecordDto);
            if (newFinanceRecord == null)
            {
                return new BaseJsonResponse<FinanceRecordPostModel>(false, "Event not found") { StatusCode = StatusCodes.Status404NotFound };
            }
            return new BaseJsonResponse<FinanceRecordPostModel>(AutoMapperHelper.Mapper.Map<FinanceRecordPostModel>(newFinanceRecord)) { StatusCode = StatusCodes.Status201Created };
        }

        [HttpPut("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.FinanceTrackerWrite)]
        public async Task<BaseJsonResponse<FinanceRecordPostModel>> Update(long id, [FromBody] FinanceRecordPostModel record)
        {
            var userId = User.GetId();
            record.Id = id;
            var updatedRecord = await _financeRecordProvider.UpdateAsync(userId, AutoMapperHelper.Mapper.Map<FinanceRecordDto>(record));
            if (updatedRecord == null)
            {
                return new BaseJsonResponse<FinanceRecordPostModel>(false, "Not found") { StatusCode = StatusCodes.Status404NotFound };
            }

            return new BaseJsonResponse<FinanceRecordPostModel>(AutoMapperHelper.Mapper.Map<FinanceRecordPostModel>(updatedRecord));
        }

        [HttpDelete("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.FinanceTrackerWrite)]
        public async Task<BaseJsonResponse> Delete(long id)
        {
            var result = await _financeRecordProvider.DeleteAsync(User.GetId(), id);
            return result ? new BaseJsonResponse(true) : new BaseJsonResponse(false, "Not found") { StatusCode = StatusCodes.Status404NotFound };
        }

        [HttpGet("GetAll")]
        [Roles(CustomRoles.Administrator, CustomRoles.FinanceTrackerRead, CustomRoles.FinanceTrackerWrite)]
        public async Task<BaseJsonResponse<List<FinanceRecordPostModel>>> GetAll()
        {
            var userId = User.GetId();
            var entities = await _financeRecordProvider.GetAllAsync(userId);
            return new BaseJsonResponse<List<FinanceRecordPostModel>>(AutoMapperHelper.Mapper.Map<List<FinanceRecordPostModel>>(entities));
        }

        [HttpGet("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.FinanceTrackerRead, CustomRoles.FinanceTrackerWrite)]
        public async Task<BaseJsonResponse<FinanceRecordPostModel>> Get(long id)
        {
            var userId = User.GetId();
            var record = await _financeRecordProvider.GetAsync(userId, id);
            if (record == null)
            {
                return new BaseJsonResponse<FinanceRecordPostModel>(false, "Not found") { StatusCode = StatusCodes.Status404NotFound };
            }

            return new BaseJsonResponse<FinanceRecordPostModel>(AutoMapperHelper.Mapper.Map<FinanceRecordPostModel>(record));
        }

        #region Categories
        [HttpGet("categories")]
        [Roles(CustomRoles.Administrator, CustomRoles.FinanceTrackerRead, CustomRoles.FinanceTrackerWrite)]
        public async Task<BaseJsonResponse> GetCategories()
        {
            var result = await _financeRecordProvider.GetCategoriesForAllFinanceRecordsAsync(User.GetId());
            return new BaseJsonResponse<List<string>>(result);
        }

        [HttpGet("{id}/categories")]
        [Roles(CustomRoles.Administrator, CustomRoles.FinanceTrackerRead, CustomRoles.FinanceTrackerWrite)]
        public async Task<BaseJsonResponse<List<string>>> GetCategoriesForFinanceRecord(long id)
        {
            var userId = User.GetId();
            var categories = await _financeRecordProvider.GetCategoriesForFinanceRecordAsync(userId, id);
            if (categories == null)
            {
                return new BaseJsonResponse<List<string>>(false, "Not found") { StatusCode = StatusCodes.Status404NotFound };
            }
            return new BaseJsonResponse<List<string>>(categories);
        }

        [HttpGet("categories/{cat}")]
        [Roles(CustomRoles.Administrator, CustomRoles.FinanceTrackerRead, CustomRoles.FinanceTrackerWrite)]
        public async Task<BaseJsonResponse<List<FinanceRecordPostModel>>> GetFinanceRecordsForCategory(string cat)
        {
            var userId = User.GetId();
            var entries = await _financeRecordProvider.GetAllFinanceRecordsForCategoryAsync(userId, cat);
            return new BaseJsonResponse<List<FinanceRecordPostModel>>(AutoMapperHelper.Mapper.Map<List<FinanceRecordPostModel>>(entries));
        }
        #endregion
    }
}
