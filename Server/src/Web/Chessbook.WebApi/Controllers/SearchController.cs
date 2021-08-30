using Chessbook.Services.Data.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Nop.Web.Models.Catalog;
using Nop.Web.Areas.Admin.Models.Customers;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Models.Posts;

namespace Chessbook.Web.Api.Controllers
{
    [Route("search")]
    [ApiController]
    public class SearchController : BaseApiController
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IPostsService postService;
        private readonly IPostModelFactory postModelFactory;
        private readonly IPostTagService postTagService;

        public SearchController(IUserService userService, IUserModelFactory userModelFactory, IPostsService postService, IPostModelFactory postModelFactory,
            IPostTagService postTagService)
        {
            this.userService = userService;
            this.userModelFactory = userModelFactory;
            this.postService = postService;
            this.postModelFactory = postModelFactory;
            this.postTagService = postTagService;
        }

        [HttpGet]
        [Route("posts")]
        public async Task<IActionResult> PostsByTag([FromQuery] string tagsOneOf, [FromQuery] CatalogProductsCommand command)
        {
            var productTag = await this.postTagService.GetPostTagByNameAsync(tagsOneOf);
            if (productTag == null)
            {
                return this.Ok(new
                {
                    data = new List<ProductsByTagModel>(),
                    total = 0,
                });
            }

            var model = await this.postModelFactory.PrepareProductsByTagModelAsync(productTag, command);

            return this.Ok(new
            {
                data = model.CatalogProductsModel.Products,
                total = model.CatalogProductsModel.Products.Count,
            });
        }

        [HttpGet]
        [Route("video-channels")]
        public async Task<IActionResult> GetUser([FromQuery] string search, [FromQuery] CatalogProductsCommand command)
        {
            var user = await this.userService.GetCustomerByUsernameAsync(search);

            if (user == null)
            {
                return this.Ok(new
                {
                    data = new List<CustomerModel>(),
                    total = 0,
                });
            }

            var userModel = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user);

            return this.Ok(new
            {
                data = new List<CustomerModel>() { userModel },
                total = 1,
            });
        }
    }
}
