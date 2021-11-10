using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Posts;
using Chessbook.Core;

namespace Chessbook.Services.Entities
{
    public interface IPostCommentService
    {
        Task<PostComment> Create(int userId, int postId, string text, PostComment inReplyToComment = null);

        Task<PostComment> GetById(int id, bool includeDeleted = false);

        Task<IPagedList<PostComment>> GetPostCommentThreads(int postId, int userId = 0,
             DateTime? fromUtc = null, DateTime? toUtc = null, string commentText = null,
             bool ascSort = false, int pageIndex = 0, int pageSize = int.MaxValue, bool getOnlyTotalCount = false,
             string sort = "-createdAt");

        Task<IList<PostComment>> GetPostThreadComments(int postId, int threadId, int userId = 0);

        Task<int> GetTotalReplies(int? originCommentId, List<int> blockerIds);

        Task<int> GetTotalRepliesFrompPostAuthor(int? originCommentId);

        Task<int> GetPostCommentsCount(int postId);

        Task Delete(PostComment comment);

        string[] ExtractMentions(string text);
    }
}
