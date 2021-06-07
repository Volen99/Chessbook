using Chessbook.Data.Models;
using Chessbook.Services.Data;
using Chessbook.Services.Data.Services;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.Inputs;
using Chessbook.Web.Models.Outputs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Controllers
{
    [Route("relationships")]
    public class RelationshipsController : BaseApiController
    {
        private readonly IRelationshipService relationshipService;
        private readonly IUserService userService;
        private readonly IRelationshipModelFactory relationshipModelFactory;

        public RelationshipsController(IRelationshipService relationshipService, IUserService userService, IRelationshipModelFactory relationshipModelFactory)
        {
            this.relationshipService = relationshipService;
            this.userService = userService;
            this.relationshipModelFactory = relationshipModelFactory;
        }

        [HttpGet]
        [Route("show")]
        public async Task<IActionResult> GetRelationship([FromQuery] QueryGetRelationshipInput input)
        {
            var relationship = await this.relationshipService.GetByUsersId(input.SourceId, input.TargetId);

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

                // var result = "{" + $"\"{screenName}\"" + ":" + $"{model.Following.ToString().ToLower()}" + "}";                      // omg
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

                var yourRelationship = await this.relationshipService.GetByUsersId(currentUserId, targetUser.Id);
                var crushRelationship = await this.relationshipService.GetByUsersId(targetUser.Id, currentUserId);

                yourRelationship.Following = true;
                crushRelationship.FollowedBy = true;

                await this.relationshipService.Update(yourRelationship);
                await this.relationshipService.Update(crushRelationship);

                // update users followings
                var sourceUser = await this.userService.GetCustomerByIdAsync(currentUserId);
                var crushUser = await this.userService.GetCustomerByIdAsync(targetUser.Id);

                sourceUser.FriendsCount += 1;
                crushUser.FollowersCount += 1;

                await this.userService.Update(sourceUser);
                await this.userService.Update(crushUser);

                var model = this.relationshipModelFactory.PrepareRelationshipModel(yourRelationship);
                
                return this.Ok(model);
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

            var yourRelationship = await this.relationshipService.GetByUsersId(currentUserId, targetUser.Id);
            var crushRelationship = await this.relationshipService.GetByUsersId(targetUser.Id, currentUserId);

            yourRelationship.Following = false;
            crushRelationship.FollowedBy = false;

            await this.relationshipService.Update(yourRelationship);
            await this.relationshipService.Update(crushRelationship);


            // update users followings
            var sourceUser = await this.userService.GetCustomerByIdAsync(currentUserId);
            var crushUser = await this.userService.GetCustomerByIdAsync(targetUser.Id);

            sourceUser.FriendsCount -= 1;
            crushUser.FollowersCount -= 1;

            await this.userService.Update(sourceUser);
            await this.userService.Update(crushUser);

            var model = this.relationshipModelFactory.PrepareRelationshipModel(yourRelationship);

            return this.Ok(model);
        }
    }
}
