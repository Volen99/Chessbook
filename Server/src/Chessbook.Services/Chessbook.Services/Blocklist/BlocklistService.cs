using Chessbook.Core.Domain.Customers;
using Chessbook.Data;
using Chessbook.Services.Data;
using Chessbook.Services.Data.Services;
using Nop.Core;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Services.Blocklist
{
    public class BlocklistService : IBlocklistService
    {
        private readonly IRepository<UserBlocklist> userBlocklistRepository;

        private readonly IUserService userService;
        private readonly IRelationshipService relationshipService;

        public BlocklistService(IRepository<UserBlocklist> userBlocklistRepository, IUserService userService, IRelationshipService relationshipService)
        {
            this.userBlocklistRepository = userBlocklistRepository;
            this.userService = userService;
            this.relationshipService = relationshipService;
        }

        public async Task<UserBlocklist> LoadByUserAndTarget(int accountId, int targetAccountId)
        {
            var userBlockList = await this.userBlocklistRepository.Table.Where(b => b.UserId == accountId && b.TargetUserId == targetAccountId)
                .FirstOrDefaultAsyncExt();

            if (userBlockList == null)
            {
                return null;
            }

            return userBlockList;
        }

        public async Task<IPagedList<UserBlocklist>> GetUserBlocklistAccounts(int start, int count, string sort, int userId, string search = null)
        {
            var blocks = await this.userBlocklistRepository.GetAllPagedAsync(query =>
            {
                // user
                query = query.Where(b => b.UserId == userId);

                query = query.OrderByDescending(b => b.CreatedAt).ThenBy(b => b.Id);

                return query;
            }, start, count);

            return blocks;
        }

        public async Task Block(int userId, string screenName)
        {
            if (string.IsNullOrWhiteSpace(screenName))
            {
                return;
            }

            var targetUser = await this.userService.GetCustomerByUsernameAsync(screenName);

            var blockNew = new UserBlocklist
            {
                UserId = userId,
                TargetUserId = targetUser.Id,
                CreatedAt = DateTime.UtcNow,
            };

            await this.userBlocklistRepository.InsertAsync(blockNew);

            // update relationship
            var yourRelationship = await this.relationshipService.GetByUsersId(userId, targetUser.Id);
            var crushRelationship = await this.relationshipService.GetByUsersId(targetUser.Id, userId);

            yourRelationship.Blocking = true;
            crushRelationship.BlockedBy = true;

            await this.relationshipService.Update(yourRelationship);
            await this.relationshipService.Update(crushRelationship);
        }

        public async Task UnBlock(int userId, string screenName)
        {
            if (string.IsNullOrWhiteSpace(screenName))
            {
                return;
            }

            var targetUser = await this.userService.GetCustomerByUsernameAsync(screenName);

            var blockListModel = await this.LoadByUserAndTarget(userId, targetUser.Id);

            await this.userBlocklistRepository.DeleteAsync(blockListModel);

            // update relationship
            var yourRelationship = await this.relationshipService.GetByUsersId(userId, targetUser.Id);
            var crushRelationship = await this.relationshipService.GetByUsersId(targetUser.Id, userId);

            yourRelationship.Blocking = false;
            crushRelationship.BlockedBy = false;

            await this.relationshipService.Update(yourRelationship);
            await this.relationshipService.Update(crushRelationship);

        }
    }
}
