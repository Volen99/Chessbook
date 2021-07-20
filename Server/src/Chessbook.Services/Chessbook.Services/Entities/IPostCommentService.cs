using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Post;
using Nop.Core;

namespace Chessbook.Services.Entities
{
    public interface IPostCommentService
    {
        Task<PostComment> Create(int userId, int postId, string text, PostComment inReplyToComment = null);

        Task<PostComment> GetById(int id);

        Task<IPagedList<PostComment>> GetPostCommentThreads(int postId, int userId = 0,
             DateTime? fromUtc = null, DateTime? toUtc = null, string commentText = null,
             bool ascSort = false,  int pageIndex = 0, int pageSize = int.MaxValue);

        Task<IList<PostComment>> GetPostThreadComments(int postId, int threadId, int userId = 0);

        Task<int> GetTotalReplies(int? originCommentId);
    }
}
