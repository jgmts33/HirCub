using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace CareHub.API
{
    public class BaseJsonResponse:JsonResult
    {
        protected class JsonValue
        {
            public bool Success { get; set; }
            public List<string> Errors { get; set; }
        }
        
        public bool Success
        {
            get => ((JsonValue)this.Value).Success;
            set => ((JsonValue)this.Value).Success = value;
        }

        public List<string> Errors {             
            get => ((JsonValue)this.Value).Errors;
            set => ((JsonValue)this.Value).Errors = value;
        }
        public BaseJsonResponse():this(new JsonValue{Success = true})
        {
        }
        public BaseJsonResponse(bool success):this(new JsonValue{Success = success})
        {
        }
        public BaseJsonResponse(bool success, string error):this(new JsonValue{Success = success,Errors = new List<string>{error}})
        {
        }
        public BaseJsonResponse(bool success, List<string> errors):this(new JsonValue{Success = success,Errors = errors})
        {
        }

        protected BaseJsonResponse(object jsonValue) : base(jsonValue)
        {
        }
    }
    public class BaseJsonResponse<T>:BaseJsonResponse
    {
        protected class JsonValue<Tj>:JsonValue
        {
            public Tj Returned { get; set; }
        }

        public T Returned
        {
            get => ((JsonValue<T>)this.Value).Returned;
            set => ((JsonValue<T>)this.Value).Returned = value;

        }
        public BaseJsonResponse():this(new JsonValue<T>{Success = true})
        {
        }
        public BaseJsonResponse(T returned):this(new JsonValue<T>{Success = true,Returned = returned})
        {
        }
        public BaseJsonResponse(bool success, string error):this(new JsonValue<T>{Success = success,Errors = new List<string>{error}})
        {
        }
        public BaseJsonResponse(bool success, List<string> errors):this(new JsonValue<T>{Success = success,Errors = errors})
        {
        }

        protected BaseJsonResponse(JsonValue<T> value):base(value)
        {
        }
    }
}