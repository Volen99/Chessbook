namespace WorldFeed.Programming.Quiz.Common.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiController : ControllerBase
    {
        public const string PathSeparator = "/";
        public const string Id = "{id}";
    }
}
