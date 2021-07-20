﻿using Chessbook.Data.Models.Post;
using Chessbook.Services.Caching;

namespace Nop.Services.Forums.Caching
{
    /// <summary>
    /// Represents a forum post vote cache event consumer
    /// </summary>
    public partial class PostVoteCacheEventConsumer : CacheEventConsumer<PostVote>
    {
    }
}