using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Relationships;
using Chessbook.Data;
using Chessbook.Data.Models;
using Chessbook.Services.Data;
using Chessbook.Services.Data.Services;
using Nop.Core;

namespace Chessbook.Services.Relationships
{
    public class FollowService : IFollowService
    {
        private readonly IRepository<UserFollow> userFollowRepository;
        private readonly IRelationshipService relationshipService;
        private readonly IUserService userService;

        public FollowService(IRepository<UserFollow> userFollowRepository, IRelationshipService relationshipService, IUserService userService)
        {
            this.userFollowRepository = userFollowRepository;
            this.relationshipService = relationshipService;
            this.userService = userService;
        }

        public async Task<UserFollow> Follow(int userId, int targetUserId, FollowState state)
        {
            var followNew = new UserFollow
            {
                UserId = userId,
                TargetUserId = targetUserId,
                State = state,
                CreatedAt = DateTime.UtcNow,
            };

            await this.userFollowRepository.InsertAsync(followNew);

            var yourRelationship = await this.relationshipService.GetByUsersId(userId, targetUserId);
            var crushRelationship = await this.relationshipService.GetByUsersId(targetUserId, userId);

            yourRelationship.Following = followNew.State == FollowState.Accepted;
            crushRelationship.FollowedBy = followNew.State == FollowState.Accepted;

            await this.relationshipService.Update(yourRelationship);
            await this.relationshipService.Update(crushRelationship);

            // update users followings
            var sourceUser = await this.userService.GetCustomerByIdAsync(userId);
            var crushUser = await this.userService.GetCustomerByIdAsync(targetUserId);

            sourceUser.FollowingCount += 1;
            crushUser.FollowersCount += 1;

            await this.userService.Update(sourceUser);
            await this.userService.Update(crushUser);

            return followNew;
        }

        public async Task<Relationship> UnFollow(int userId, int targetUserId)
        {
            var yourRelationship = await this.relationshipService.GetByUsersId(userId, targetUserId);
            var crushRelationship = await this.relationshipService.GetByUsersId(targetUserId, userId);

            yourRelationship.Following = false;
            crushRelationship.FollowedBy = false;

            await this.relationshipService.Update(yourRelationship);
            await this.relationshipService.Update(crushRelationship);

            // update users followings
            var sourceUser = await this.userService.GetCustomerByIdAsync(userId);
            var crushUser = await this.userService.GetCustomerByIdAsync(targetUserId);

            sourceUser.FollowingCount -= 1;
            crushUser.FollowersCount -= 1;

            await this.userService.Update(sourceUser);
            await this.userService.Update(crushUser);

            // followModel
            var follow = await this.userFollowRepository.Table
                .Where(r => r.UserId == sourceUser.Id && r.TargetUserId == crushUser.Id)
                .FirstOrDefaultAsyncExt();

            if (follow == null)
            {
                // idk
            }

            await this.userFollowRepository.DeleteAsync(follow);

            return yourRelationship;
        }

        public async Task<IList<Customer>> ListUserFollowing(int userId, int start, int count, bool following)
        {
            var followings = await this.userFollowRepository.GetAllPagedAsync(query =>
            {
                if (following)
                {
                    query = query.Where(x => x.UserId == userId);
                }
                else
                {
                    query = query.Where(x => x.TargetUserId == userId);
                }

                return query;
            }, start, count);

            var ids = new List<int>();
            if (following)
            {
                ids = followings.Select(v => v.TargetUserId).ToList();
            }
            else
            {
                ids = followings.Select(v => v.UserId).ToList();

            }

            var users = await this.userService.GetCustomersByIdsAsync(ids.ToArray());

            return users;
        }
    }
}
