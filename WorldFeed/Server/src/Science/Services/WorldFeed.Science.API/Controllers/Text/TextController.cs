namespace WorldFeed.Science.API.Controllers.Text
{
    using System.Threading.Tasks;
    using System.IO;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    using WorldFeed.Web.Common;
    using WorldFeed.Common.Controllers;
    using WorldFeed.Services.Identity;
    using WorldFeed.Science.API.Services.Text;
    using WorldFeed.Science.API.Services.Posts;
    using WorldFeed.Science.API.Models.Text;

    public class TextController : ApiController
    {
        private readonly ICurrentUserService currentUser;
        private readonly ITextService textService;
        private readonly IPostService postService;

        public TextController(ICurrentUserService currentUser, ITextService textService, IPostService postService)
        {
            this.currentUser = currentUser;
            this.textService = textService;
            this.postService = postService;
        }

        [Route(nameof(Create))]
        [HttpPost]
        public async Task<ApiResponse<CreateTextResponse>> Create()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var bodyData = await reader.ReadToEndAsync();
                var data = JsonConvert.DeserializeObject<BodyData>(bodyData);

                if (data.PostId == 0)
                {
                   data.PostId = await this.postService.CreatePostAsync(this.currentUser.UserId);
                }
                
                await this.textService.CreateTextAsync(data.Text, data.PostId);

                return new CreateTextResponse { Text = data.Text }.ToApiResponse();
            }
        }

        private class BodyData
        {
            public string Text { get; set; }

            public int PostId { get; set; }
        }
    }
}
