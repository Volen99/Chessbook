using Microsoft.AspNetCore.Mvc;

using Chessbook.Web.Framework.Mvc.Filters;
using Chessbook.Web.Framework;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [ApiController]
    [Area(AreaNames.Admin)]
    [ValidateIpAddress]
    [AuthorizeAdmin]
    public abstract class BaseAdminController : ControllerBase
    {
        /// <summary>
        /// Creates an object that serializes the specified object to JSON.
        /// </summary>
        /// <param name="data">The object to serialize.</param>
        /// <returns>The created object that serializes the specified data to JSON format for the response.</returns>
        //public override JsonResult Json(object data)
        //{
        //    //use IsoDateFormat on writing JSON text to fix issue with dates in grid
        //    var useIsoDateFormat = EngineContext.Current.Resolve<AdminAreaSettings>()?.UseIsoDateFormatInJsonResult ?? false;
        //    var serializerSettings = EngineContext.Current.Resolve<IOptions<MvcNewtonsoftJsonOptions>>()?.Value?.SerializerSettings
        //        ?? new JsonSerializerSettings();

        //    if (!useIsoDateFormat)
        //        return base.Json(data, serializerSettings);

        //    serializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
        //    serializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Unspecified;

        //    return base.Json(data, serializerSettings);
        //}

    }
}
