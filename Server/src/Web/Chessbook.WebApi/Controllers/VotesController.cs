﻿namespace Chessbook.Web.Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Data.Models.Post;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Web.Api.Areas.Admin.Models.Post;
    using Chessbook.Web.Api.Factories;
    using Chessbook.Services.Data.Services;
    using Nop.Core;
    using Chessbook.Services.Localization;
    using Chessbook.Web.Api.Lib;

    [Route("vote")]
    public class VotesController : BaseApiController
    {
        private readonly IPostsService postServce;
        private readonly IPostModelFactory postModelFactory;
        private readonly IUserService userService;
        private readonly IWorkContext _workContext;
        private readonly ILocaleStringResourceService localeStringResourceService;

        public VotesController(IPostsService postServce, IPostModelFactory postModelFactory, IUserService userService, IWorkContext workContext,
            ILocaleStringResourceService localeStringResourceService)
        {
            this.postServce = postServce;
            this.postModelFactory = postModelFactory;
            this.userService = userService;
            this._workContext = workContext;
            this.localeStringResourceService = localeStringResourceService;
        }

        [HttpPut]
        [Route("{id:int}")]
        public virtual async Task<IActionResult> RatePost(int id, [FromBody] PostRateBody body)
        {
            var res = await this.postServce.InsertPostVoteAsync(id, User.GetUserId(), body.Rating);

            if (res != null)
            {
                Notifier.Instance.NotifyOfNewPostLike(res);
            }

            return this.NoContent();
        }
    }
}
