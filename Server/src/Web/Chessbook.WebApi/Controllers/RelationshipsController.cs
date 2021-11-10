using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Core.Domain.Relationships;
using Chessbook.Data.Models;
using Chessbook.Services.Data;
using Chessbook.Services;
using Chessbook.Services.Relationships;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Api.Lib;
using Chessbook.Web.Models.Inputs;

namespace Chessbook.Web.Api.Controllers
{
    [Route("relationships")]
    public class RelationshipsController : BaseApiController
    {
        private readonly IRelationshipService relationshipService;
        private readonly IUserService userService;
        private readonly IRelationshipModelFactory relationshipModelFactory;
        private readonly IFollowService followService;

        public RelationshipsController(IRelationshipService relationshipService, IUserService userService, IRelationshipModelFactory relationshipModelFactory,
            IFollowService followService)
        {
            this.relationshipService = relationshipService;
            this.userService = userService;
            this.relationshipModelFactory = relationshipModelFactory;
            this.followService = followService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRelationship([FromQuery(Name = "id[]")] int[] ids)
        {
            var relationship = await this.relationshipService.GetByUsersId(User.GetUserId(), ids[0]);

            if (relationship == null)
            {
                return this.NotFound();
            }

            var model = this.relationshipModelFactory.PrepareRelationshipModel(relationship);

            return this.Ok(model);
        }

        [HttpGet]
        [Route("exist")]
        public async Task<IActionResult> GetFollowExist([FromQuery] string[] screenNames)
        {
            var dic = new Dictionary<string, bool>();
            foreach (var screenName in screenNames)
            {
                var targetUser = await this.userService.GetCustomerByUsernameAsync(screenName);

                if (targetUser == null)
                {
                    return this.BadRequest("Sorry bro, such username does not exists :| I am sure it is Volencho's mistake tho, aka the creator of this website :D");
                }

                var currentUserId = User.GetUserId();

                var relationship = await this.relationshipService.GetByUsersId(currentUserId, targetUser.Id);

                var model = this.relationshipModelFactory.PrepareRelationshipModel(relationship);

                if (!dic.ContainsKey(screenName))
                {
                    dic.Add(screenName, model.Following);
                }

                // var result = "{" + $"\"{screenName}\"" + ":" + $"{model.Following.ToString().ToLower()}" + "}";   // omg
            }

            return this.Ok(dic);
        }

        [HttpPost]
        [Route("follow")]
        public async Task<IActionResult> PostFollow([FromBody] BodyFollowInputModel input)
        {
            var currentUserId = User.GetUserId();

            // Follow
            if (input.ScreenName != null)
            {
                var targetUser = await this.userService.GetCustomerByUsernameAsync(input.ScreenName);

                if (targetUser == null)
                {
                    return BadRequest(); // throw exception?
                }

                var followCurrent = await this.followService.GetByUsersId(currentUserId, targetUser.Id);

                if (followCurrent != null)
                {
                    return this.BadRequest("You already follow this user");
                }

                var state = targetUser.Protected ? FollowState.Pending : FollowState.Accepted;
                var userFollow = await this.followService.Follow(currentUserId, targetUser.Id, state);

                // var model = this.relationshipModelFactory.PrepareRelationshipModel(yourRelationship);

                var userFollowFull = new UserFollowFull
                {
                    UserFollow = userFollow,
                    TargetUser = targetUser,
                    UserFollower = await this.userService.GetCustomerByIdAsync(currentUserId),
                };

                Notifier.Instance.NotifyOfNewUserFollow(userFollowFull);

                return this.Ok(userFollow); // model
            }

            return this.BadRequest();
        }

        [HttpPost]
        [Route("unfollow/{screenName:length(3,16)}")]
        public async Task<IActionResult> PostUnfollow(string screenName)
        {
            if (screenName == null)
            {
                return this.BadRequest("👻");
            }

            var currentUserId = User.GetUserId();
            var targetUser = await this.userService.GetCustomerByUsernameAsync(screenName);

            var followCurrent = await this.followService.GetByUsersId(currentUserId, targetUser.Id);

            if (followCurrent == null)
            {
                return this.NotFound();
            }

            var yourRelationship = await this.followService.UnFollow(currentUserId, targetUser.Id);

            var model = this.relationshipModelFactory.PrepareRelationshipModel(yourRelationship);

            return this.Ok(model);
        }


        // Object.assign(actorFollow, { ActorFollowing: targetActor, ActorFollower: follower })
        public class UserFollowFull
        {
            public UserFollow UserFollow { get; set; }

            public Customer TargetUser { get; set; }

            public Customer UserFollower { get; set; }
        }
    }
}
