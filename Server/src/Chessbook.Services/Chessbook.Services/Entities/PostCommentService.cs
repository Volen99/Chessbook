using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Chessbook.Core.Domain.Customers;
using Chessbook.Core.Domain.Posts;
using Chessbook.Data;
using Chessbook.Data.Models;
using Chessbook.Core;

namespace Chessbook.Services.Entities
{
    public class PostCommentService : IPostCommentService
    {
        private const string ACTOR_NAME_ALPHABET = @"[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\-_.:]";

        private readonly IRepository<PostComment> postCommentRepositoy;
        private readonly IRepository<Post> postRepositoy;
        private readonly IRepository<Customer> customerRepository;
        private readonly IRepository<UserBlocklist> userBlocklistRepository;

        public PostCommentService(IRepository<PostComment> postCommentRepositoy, IRepository<Post> postRepositoy,
            IRepository<Customer> customerRepository, IRepository<UserBlocklist> userBlocklistRepository)
        {
            this.postCommentRepositoy = postCommentRepositoy;
            this.postRepositoy = postRepositoy;
            this.customerRepository = customerRepository;
            this.userBlocklistRepository = userBlocklistRepository;
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

        public async Task<PostComment> GetById(int id, bool includeDeleted = false)
        {
            var comment = await this.postCommentRepositoy.GetByIdAsync(id, includeDeleted: includeDeleted);

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
            bool ascSort = false, int pageIndex = 0, int pageSize = int.MaxValue, bool getOnlyTotalCount = false,
            string sort = "-createdAt")
        {
            return await this.postCommentRepositoy.GetAllPagedAsync(query =>
            {
                if (postId > 0)
                    query = query.Where(comment => comment.PostId == postId);

                query = query.Where(comment => comment.OriginCommentId == null);

                if (fromUtc.HasValue)
                    query = query.Where(comment => fromUtc.Value <= comment.CreatedAt);

                if (toUtc.HasValue)
                    query = query.Where(comment => toUtc.Value >= comment.CreatedAt);

                if (!string.IsNullOrEmpty(commentText))
                    query = query.Where(c => c.Text.Contains(commentText));

                query = query.OrderBy(comment => comment.CreatedAt);

                return query;
            }, pageIndex, pageSize, getOnlyTotalCount);
        }

        public async Task<IList<PostComment>> GetPostThreadComments(int postId, int threadId, int userId = 0)
        {
            return await this.postCommentRepositoy.GetAllAsync(query =>
            {
                if (postId > 0)
                {
                    query = query.Where(comment => comment.PostId == postId);
                }

                if (threadId > 0)
                {
                    query = query.Where(comment => comment.OriginCommentId == threadId);
                }

                query = query.Where(comment => comment.OriginCommentId != null);

                query = query.Include(x => x.OriginPostComment);


                query = query.Where(comment => comment.Deleted == false);

                query = query.OrderBy(comment => comment.CreatedAt)
                .ThenBy(c => c.UpdatedAt);

                return query;
            });
        }

        public async Task<int> GetPostCommentsCount(int postId)
        {
            var res = await this.postCommentRepositoy.GetAllPagedAsync(query =>
            {
                query = query.Where(c => c.OriginCommentId == null);

                query = query.Where(comment => comment.PostId == postId);

                return query;
            }, getOnlyTotalCount: true);

            return res.TotalCount;
        }

        public async Task<int> GetTotalReplies(int? commentId, List<int> blockerIds)
        {
            if (!commentId.HasValue)
            {
                return 0;
            }

            var blocklistQuery = (from blockList in this.userBlocklistRepository.Table
                                  where blockerIds.Contains(blockList.UserId)
                                  select blockList.Id);
                    //.Union
                    //(from users in this.customerRepository.Table
                    // select users.Id);


            var query = from replies in this.postCommentRepositoy.Table
                        where replies.OriginCommentId == commentId
                        && replies.DeletedAt.Equals(null)
                        && blocklistQuery.Contains(replies.UserId) == false // debug it. This is buggy without Union
                        select replies.Id;

            var totalReplies = await query.CountAsyncExt();

            return totalReplies;
        }

        public async Task<int> GetTotalRepliesFrompPostAuthor(int? originCommentId)
        {
            if (!originCommentId.HasValue)
            {
                return 0;
            }

            var query = from replies in this.postCommentRepositoy.Table
                        join post in this.postRepositoy.Table on replies.PostId equals post.Id
                        join customer in this.customerRepository.Table on post.UserId equals customer.Id
                        where (replies.OriginCommentId.Value == originCommentId.Value && replies.UserId == customer.Id)
                        select replies.Id;

            var totalRepliesFrompPostAuthor = await query.CountAsyncExt();

            return totalRepliesFrompPostAuthor;
        }


        // Thanks https://docs.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.groupcollection?view=net-5.0 ♥
        public string[] ExtractMentions(string text)
        {
            var result = new List<string>();

            var localMention = $"@({ACTOR_NAME_ALPHABET}+)";

            var mentionRegex = $"(?:{localMention})";

            var firstMentionRegex = new Regex($"^{mentionRegex} ").ToString();
            var endMentionRegex = new Regex($" {mentionRegex}$").ToString();

            MatchCollection matchesFirst = Regex.Matches(text, firstMentionRegex);
            MatchCollection matchesEnd = Regex.Matches(text, endMentionRegex);

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

            return result.Distinct().ToArray();
        }

        public async Task Delete(PostComment comment)
        {
            comment.DeletedAt = DateTime.UtcNow;
            await this.postCommentRepositoy.DeleteAsync(comment);
        }
    }
}
