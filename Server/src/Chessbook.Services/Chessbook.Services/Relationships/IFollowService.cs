using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Relationships;
using Chessbook.Data.Models;

namespace Chessbook.Services.Relationships
{
    public interface IFollowService
    {
        Task<UserFollow> Follow(int userId, int targetUserId, FollowState state);

        Task<Relationship> UnFollow(int userId, int targetUserId);

        Task<IList<Customer>> ListUserFollowing(int userId, int start, int count, bool following);
    }
}
