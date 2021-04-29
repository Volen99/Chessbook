using Chessbook.Data.Models;
using Chessbook.Services.Data;
using Chessbook.Services.Data.Services;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.Inputs;
using Chessbook.Web.Models.Outputs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Controllers
{
    [Route("relationships")]
    public class RelationshipsController : BaseApiController
    {
        private readonly IRelationshipService relationshipService;
        private readonly IUserService userService;

        public RelationshipsController(IRelationshipService relationshipService, IUserService userService)
        {
            this.relationshipService = relationshipService;
            this.userService = userService;
        }

        [HttpGet]
        [Route("show")]
        public async Task<IActionResult> GetRelationship([FromQuery] QueryGetRelationshipInput input)
        {
            var relationship = await this.relationshipService.GetByUsersId<RelationshipDetailsDTO>(input.SourceId, input.TargetId);

            return this.Ok(relationship);
        }

        [HttpGet]
        [Route("exist")]
        public async Task<IActionResult> GetFollowExist([FromQuery] string screenName)
        {
            var targetUser = await this.userService.GetByScreenName(screenName);

            if (targetUser == null)
            {
                return this.BadRequest("Sorry bro, such username does not exists :| I am sure it is Volen's mistake tho, aka the creator of this website :D");
            }

            var currentUserId = User.GetUserId();

            var relationship = await this.relationshipService.GetByUsersId<RelationshipDetailsDTO>(currentUserId, targetUser.Id);

            var result = "{" + $"\"{screenName}\"" + ":" + $"{relationship.Following.ToString().ToLower()}" + "}";

            return this.Ok(result);
        }

        [HttpPost]
        [Route("follow")]
        public async Task<IActionResult> PostFollow([FromBody] BodyFollowInputModel input)
        {
            var currentUserId = User.GetUserId();

            // Follow
            if (input.ScreenName != null)
            {
                var targetUser = await this.userService.GetByScreenName(input.ScreenName);

                var yourRelationship = await this.relationshipService.GetByUsersId(currentUserId, targetUser.Id);
                var crushRelationship = await this.relationshipService.GetByUsersId(targetUser.Id, currentUserId);

                yourRelationship.Following = true;
                crushRelationship.FollowedBy = true;

                var relationshipDetails = await this.relationshipService.Update<RelationshipDetailsDTO>(yourRelationship);
                await this.relationshipService.Update<RelationshipDetailsDTO>(crushRelationship);

                // update users followings

                var sourceUser = await this.userService.GetByIdClean(currentUserId);
                var crushUser = await this.userService.GetByIdClean(targetUser.Id);

                sourceUser.FriendsCount += 1;
                crushUser.FollowersCount += 1;

                await this.userService.Update(sourceUser);
                await this.userService.Update(crushUser);
                
                return this.Ok(relationshipDetails);
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

            var targetUser = await this.userService.GetByScreenName(screenName);

            var yourRelationship = await this.relationshipService.GetByUsersId(currentUserId, targetUser.Id);
            var crushRelationship = await this.relationshipService.GetByUsersId(targetUser.Id, currentUserId);

            yourRelationship.Following = false;
            crushRelationship.FollowedBy = false;

            var relationshipDetails = await this.relationshipService.Update<RelationshipDetailsDTO>(yourRelationship);
            await this.relationshipService.Update<RelationshipDetailsDTO>(crushRelationship);


            // update users followings

            var sourceUser = await this.userService.GetByIdClean(currentUserId);
            var crushUser = await this.userService.GetByIdClean(targetUser.Id);

            sourceUser.FriendsCount -= 1;
            crushUser.FollowersCount -= 1;

            await this.userService.Update(sourceUser);
            await this.userService.Update(crushUser);

            return this.Ok(relationshipDetails);
        }
    }
}
