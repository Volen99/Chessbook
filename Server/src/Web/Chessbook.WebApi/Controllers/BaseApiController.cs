namespace Chessbook.Web.Api.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Authorize]
    public abstract class BaseApiController : ControllerBase
    {
    }
}
