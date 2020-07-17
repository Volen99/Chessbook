namespace WorldFeed.Common.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using WorldFeed.Web.Common;

    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("[controller]")]
    public class ApiController : Controller
    {
        public const string PathSeparator = "/";
        public const string Id = "{id}";

        protected ApiResponse<T> Error<T>(string item, string message)
        {
            return new ApiResponse<T>(new ApiError(item, message));
        }

        protected ApiResponse<T> ModelStateErrors<T>()
        {
            if (this.ModelState == null || this.ModelState.Count == 0)
            {
                return new ApiResponse<T>(new ApiError("Model", "Empty or null model."));
            }

            var errors = new List<ApiError>();
            foreach (var item in this.ModelState)
            {
                foreach (var error in item.Value.Errors)
                {
                    errors.Add(new ApiError(item.Key, error.ErrorMessage));
                }
            }

            return new ApiResponse<T>(errors);
        }
    }
}