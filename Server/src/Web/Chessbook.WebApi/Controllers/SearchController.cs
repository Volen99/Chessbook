using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Services;
using Chessbook.Services.Entities;
using Chessbook.Web.Models.Catalog;
using Chessbook.Web.Areas.Admin.Models.Customers;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Models.Posts;
using Chessbook.Core.Domain.Posts;
using Chessbook.Web.Api.Models.Search;

namespace Chessbook.Web.Api.Controllers
{
    [Route("search")]
    [ApiController]
    public class SearchController : BaseApiController
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IPostModelFactory postModelFactory;
        private readonly IPostTagService postTagService;

        public SearchController(IUserService userService, IUserModelFactory userModelFactory, IPostModelFactory postModelFactory,
            IPostTagService postTagService)
        {
            this.userService = userService;
            this.userModelFactory = userModelFactory;
            this.postModelFactory = postModelFactory;
            this.postTagService = postTagService;
        }

        [HttpGet]
        [Route("posts")]
        public async Task<IActionResult> PostsByTag([FromQuery] SearchInputQuery searchQuery, [FromQuery] string[] tagsAllOf, [FromQuery] CatalogProductsCommand command)
        {
            if (searchQuery.TagsOneOf != null)
            {
                var productTag = await this.postTagService.GetPostTagByNameAsync(searchQuery.TagsOneOf);
                if (productTag == null)
                {
                    return this.Ok(new
                    {
                        data = new List<ProductsByTagModel>(),
                        total = 0,
                    });
                }

                var model = await this.postModelFactory.PrepareProductsByTagModelAsync(productTag, searchQuery.Start, searchQuery.Count, searchQuery.Search, searchQuery.TagsOneOf, searchQuery.Sort, searchQuery.StartDate, searchQuery.OriginallyPublishedStartDate, searchQuery.OriginallyPublishedEndDate, command);

                return this.Ok(new
                {
                    data = model.CatalogProductsModel.Products,
                    total = model.CatalogProductsModel.Products.Count,
                });
            }

            var postTags = new List<Tag>();
            foreach (var tag in tagsAllOf)
            {
                var postTag = await this.postTagService.GetPostTagByNameAsync(tag);
                if (postTag == null)
                {
                    continue;
                }

                postTags.Add(postTag);
            }

            if (!postTags.Any())
            {
                return this.Ok(new
                {
                    data = new List<ProductsByTagModel>(),
                    total = 0,
                });
            }

            var modelByAllTags = await this.postModelFactory.PreparePostsByTagsModelAsync(postTags.ToArray(), command);

            return this.Ok(new
            {
                data = modelByAllTags,
                total = modelByAllTags.Count,
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
