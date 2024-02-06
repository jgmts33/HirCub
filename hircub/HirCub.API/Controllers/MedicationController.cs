using CareHub.API.Auth;
using CareHub.API.Models;
using CareHub.Domain.Dtos;
using CareHub.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Threading.Tasks;

namespace CareHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MedicationController:Controller
    {
        private readonly IMedicationProvider _medicationProvider;
        public MedicationController(IMedicationProvider medicationProvider)
        {
            _medicationProvider = medicationProvider;
        }

        [HttpPost]
        [Roles(CustomRoles.Administrator, CustomRoles.MedicationTrackerWrite)]
        public async Task<BaseJsonResponse<MedicationPostModel>> Create([FromBody] MedicationPostModel newMedication)
        {
            var userId = User.GetId();
            newMedication.UserId = userId;
            var errors = new List<string>();
            if (string.IsNullOrWhiteSpace(newMedication.Medication))
                errors.Add("medication is required");
            if ((newMedication.Date ?? SqlDateTime.MinValue) < SqlDateTime.MinValue)
                errors.Add("date value is invalid");
            if (errors.Count > 0)
            {
                return new BaseJsonResponse<MedicationPostModel>(false, errors){StatusCode = StatusCodes.Status406NotAcceptable};
            }
            
            var savedMedication = await _medicationProvider.CreateAsync(AutoMapperHelper.Mapper.Map<MedicationDto>(newMedication));
            return new BaseJsonResponse<MedicationPostModel>(AutoMapperHelper.Mapper.Map<MedicationPostModel>(savedMedication)) { StatusCode = StatusCodes.Status201Created };
        }

        [HttpGet("GetAll")]
        [Roles(CustomRoles.Administrator, CustomRoles.MedicationTrackerRead, CustomRoles.MedicationTrackerWrite)]
        public async Task<BaseJsonResponse<List<MedicationPostModel>>> GetAll()
        {
            var userId = User.GetId();
            var medications= await _medicationProvider.GetAllAsync(userId);
            if (medications == null) return new BaseJsonResponse<List<MedicationPostModel>>(false, "Not found") { StatusCode = StatusCodes.Status404NotFound };

            return new BaseJsonResponse<List<MedicationPostModel>>(AutoMapperHelper.Mapper.Map<List<MedicationPostModel>>(medications));
        }

        [HttpGet("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.MedicationTrackerRead, CustomRoles.MedicationTrackerWrite)]
        public async Task<BaseJsonResponse> Get(long id)
        {
            var userId = User.GetId();
            var medication = await _medicationProvider.GetAsync(userId, id);
            if (medication == null) return new BaseJsonResponse(false, "not found") { StatusCode = StatusCodes.Status404NotFound };
            return new BaseJsonResponse<MedicationPostModel>(AutoMapperHelper.Mapper.Map<MedicationPostModel>(medication));
        }

        [HttpPut("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.MedicationTrackerWrite)]
        public async Task<BaseJsonResponse> Update(long id, [FromBody] MedicationPostModel updatedMedication)
        {
            var userId = User.GetId();
            var medication = await _medicationProvider.UpdateAsync(userId, id, AutoMapperHelper.Mapper.Map<MedicationDto>(updatedMedication));
            if (medication == null) return new BaseJsonResponse(false, "not found"){StatusCode = StatusCodes.Status404NotFound};
            return new BaseJsonResponse<MedicationPostModel>(AutoMapperHelper.Mapper.Map<MedicationPostModel>(medication));
        }

        [HttpDelete("{id}")]
        [Roles(CustomRoles.Administrator, CustomRoles.MedicationTrackerWrite)]
        public async Task<BaseJsonResponse> Delete(long id)
        {
            var userId = User.GetId();
            var result = await _medicationProvider.DeleteAsync(userId, id);
            return result ? new BaseJsonResponse(true) : new BaseJsonResponse(false, "not found") { StatusCode = StatusCodes.Status404NotFound };

        }
    }
}
