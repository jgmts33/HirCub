using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace CareHub.API.Utils
{
    public static class ModelStateDictionaryExt
    {
        public static List<string> Errors(this ModelStateDictionary modelState) => modelState
            .Values
            .SelectMany(v => v.Errors)
            .Select(err => err.ErrorMessage)
            .ToList();
    }
}
