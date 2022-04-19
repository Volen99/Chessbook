using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Services.Security;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Logging;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("admin/post")]
    public class PostController : BaseAdminController
    {
        private readonly IPermissionService permissionService;
        private readonly IPostsService postsService;
        private readonly ICustomerActivityService customerActivityService;

        public PostController(IPermissionService permissionService, IPostsService postsService, ICustomerActivityService customerActivityService)
        {
            this.permissionService = permissionService;
            this.postsService = postsService;
            this.customerActivityService = customerActivityService;
        }

        [HttpPost]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await permissionService.AuthorizeAsync(StandardPermissionProvider.ManageProducts))
            {
                return this.Unauthorized();
            }

            // try to get a post with the specified id
            var post = await this.postsService.GetPostByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            await this.postsService.DeleteProductAsync(post);

            // activity log
            await this.customerActivityService.InsertActivityAsync("DeleteProduct", string.Format("Deleted a post ('{0}')", post.Id), post);

            return this.Ok();
        }
    }
}
