namespace Sharebook.Storage.API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Sharebook.Storage.API.ViewModels;

    public class PostsController : ControllerBase
    {
        [Route("posts/update")]
        public IActionResult Update()
        {
            return this.Ok(new TweetDTO());
        }
    }
}
