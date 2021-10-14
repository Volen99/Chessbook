using Chessbook.Core.Domain.Posts;
using Chessbook.Services.Caching;

namespace Chessbook.Services.Forums.Caching
{
    /// <summary>
    /// Represents a forum post vote cache event consumer
    /// </summary>
    public partial class PostVoteCacheEventConsumer : CacheEventConsumer<PostVote>
    {
    }
}
