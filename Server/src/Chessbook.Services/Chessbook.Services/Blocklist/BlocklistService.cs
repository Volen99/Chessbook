using Chessbook.Core.Domain.Customers;
using Chessbook.Data;
using Chessbook.Data.Models;
using Chessbook.Services.Data;
using Chessbook.Services.Data.Services;
using Nop.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Services.Blocklist
{
    public class BlocklistService : IBlocklistService
    {
        private readonly IRepository<UserBlocklist> userBlocklistRepository;

        private readonly IUserService userService;
        private readonly IRelationshipService relationshipService;
        private readonly IWorkContext workContext;

        public BlocklistService(IRepository<UserBlocklist> userBlocklistRepository, IUserService userService, IRelationshipService relationshipService,
            IWorkContext workContext)
        {
            this.userBlocklistRepository = userBlocklistRepository;
            this.userService = userService;
            this.relationshipService = relationshipService;
            this.workContext = workContext;
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

        // Ofc it might bug..
        public async Task<Dictionary<int, bool>> IsAccountMutedByMulti(List<int> accountIds, int targetAccountId)
        {
            var rows = await this.userBlocklistRepository.GetAllAsync(query =>
            {
                query = query.Where(b => accountIds.Contains(b.UserId) && b.TargetUserId == targetAccountId);

                return query;
            });

            var result = new Dictionary<int, bool>();
            foreach (var accountId in accountIds)
            {
                result[accountId] = rows.FirstOrDefault(r => r.UserId == accountId) != null;
            }

            return result;
        }

        public async Task<bool> IsBlockedByServerOrAccount(Customer targetAccount, Customer userAccount)
        {
            var serverAccountId = (await this.workContext.GetCurrentCustomerAsync()).Id;
            var sourceAccounts = new List<int>() { serverAccountId };

            if (userAccount != null)
            {
                sourceAccounts.Add(userAccount.Id);
            }

            var accountMutedHash = await this.IsAccountMutedByMulti(sourceAccounts, targetAccount.Id);
            if (accountMutedHash[serverAccountId] || (userAccount != null && accountMutedHash[userAccount.Id]))
            {
                return true;
            }

            return false;
        }
    }
}
