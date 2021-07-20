using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Post;
using Chessbook.Data;
using Nop.Core;

namespace Chessbook.Services.Entities
{
    public class PostCommentService : IPostCommentService
    {
        private const string ACTOR_NAME_ALPHABET = @"[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\-_.:]";

        private readonly IRepository<PostComment> postCommentRepositoy;

        public PostCommentService(IRepository<PostComment> postCommentRepositoy)
        {
            this.postCommentRepositoy = postCommentRepositoy;
        }

        public async Task<PostComment> Create(int userId, int postId, string text, PostComment inReplyToComment = null)
        {
            int? originCommentId = null;
            int? inReplyToCommentId = null;

            if (inReplyToComment != null)
            {                                      // obj.inReplyToComment.originCommentId || obj.inReplyToComment.id
                originCommentId = inReplyToComment.OriginCommentId != null ? inReplyToComment.OriginCommentId : inReplyToComment.Id;
                inReplyToCommentId = inReplyToComment.Id;
            }

            var commentNew = new PostComment
            {
                UserId = userId,
                PostId = postId,
                OriginCommentId = originCommentId,
                InReplyToCommentId = inReplyToCommentId,
                Text = text,
                Url = "url :)",
                CreatedAt = DateTime.UtcNow,
            };

            await this.postCommentRepositoy.InsertAsync(commentNew);

            // broadcast

            return commentNew;
        }

        public async Task<PostComment> GetById(int id)
        {
            var comment = await this.postCommentRepositoy.GetByIdAsync(id);

            return comment;
        }

        /// <summary>
        /// Gets all comments
        /// </summary>
        /// <param name="postId">Post ID; 0 or null to load all records</param>
        /// <param name="threadId">Thread identifier; pass 0 to load all records</param>
        /// <param name="userId">User identifier; 0 to load all records</param>
        /// <param name="fromUtc">Item creation from; null to load all records</param>
        /// <param name="toUtc">Item creation to; null to load all records</param>
        /// <param name="commentText">Search comment text; null to load all records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the comments
        /// </returns>
        public async Task<IPagedList<PostComment>> GetPostCommentThreads(int postId, int userId = 0,
            DateTime? fromUtc = null, DateTime? toUtc = null, string commentText = null,
            bool ascSort = false, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            return await this.postCommentRepositoy.GetAllPagedAsync(query =>
            {
                if (postId > 0)
                    query = query.Where(comment => comment.PostId == postId);

                query = query.Where(comment => comment.OriginCommentId == null);

                //if (userId > 0)
                //    query = query.Where(comment => comment.UserId == userId);

                if (fromUtc.HasValue)
                    query = query.Where(comment => fromUtc.Value <= comment.CreatedAt);

                if (toUtc.HasValue)
                    query = query.Where(comment => toUtc.Value >= comment.CreatedAt);

                if (!string.IsNullOrEmpty(commentText))
                    query = query.Where(c => c.Text.Contains(commentText));

                query = query.OrderBy(comment => comment.CreatedAt);

                return query;
            }, pageIndex, pageSize);
        }

        public async Task<IList<PostComment>> GetPostThreadComments(int postId, int threadId, int userId = 0)
        {
            return await this.postCommentRepositoy.GetAllAsync(query =>
            {
                if (postId > 0)
                    query = query.Where(comment => comment.PostId == postId);

                if (threadId > 0)
                    query = query.Where(comment => comment.OriginCommentId == threadId);

                query = query.Where(comment => comment.OriginCommentId != null);

                query = query.OrderBy(comment => comment.CreatedAt);

                return query;
            });
        }

        public async Task<int> GetTotalReplies(int? commentId)
        {
            var sqlQuery = "SELECT COUNT(replies.id) FROM PostComment AS Replies WHERE Replies.OriginCommentId = 2 AND DeletedAt IS NULL";

            var totalReplies = await this.postCommentRepositoy.Table.CountAsyncExt(pc => pc.OriginCommentId == commentId && pc.DeletedAt == null);

            return totalReplies;
        }


        // Thanks https://docs.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.groupcollection?view=net-5.0 ♥
        public string[] ExtractMentions(string text)
        {
            var result = new List<string>();

            var localMention = $"@({ACTOR_NAME_ALPHABET}+)";

            var mentionRegex = $"(?:(?:' + remoteMention + ')|(?:' + {localMention} + '))";

            var firstMentionRegex = new Regex($"^{mentionRegex} ");
            var endMentionRegex = new Regex($" {mentionRegex}$");

            MatchCollection matchesFirst = Regex.Matches(text, firstMentionRegex.ToString());
            MatchCollection matchesEnd = Regex.Matches(text, endMentionRegex.ToString());

            foreach (Match match in matchesFirst)
            {
                GroupCollection groups = match.Groups;
                result.Add(groups[1].Value);
            }

            foreach (Match match in matchesEnd)
            {
                GroupCollection groups = match.Groups;
                result.Add(groups[1].Value);
            }

            // Include local mentions
            // ..

            return result.Distinct().ToArray();
        }


        //private RegexpCapture(string str, Regex regex, int maxIterations = 100)
        //{

        //}
    }
}
