namespace Chessbook.Web.Api.Controllers
{
    using Chessbook.Web.Framework.Mvc.Filters;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [SaveIpAddress]
    public abstract class BaseApiController : ControllerBase
    {
    }
}
