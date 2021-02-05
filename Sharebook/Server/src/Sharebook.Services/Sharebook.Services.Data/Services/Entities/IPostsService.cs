namespace Sharebook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Sharebook.Data.Models.Post;
    using Sharebook.Web.Models.Outputs.Posts;

    public interface IPostsService
    {
        Task<Post> CreateAsync(string text, string mediaIds, int userId);

        T GetById<T>(long id);

        IEnumerable<T> GetByCategoryId<T>(int categoryId, int? take = null, int skip = 0);

        IEnumerable<T> GetHomeTimeline<T>(int userId, int? count = null, int skip = 0);

        int GetCountByCategoryId(int categoryId);

        Task<PostDTO> InsertPostVoteAsync(long postId, int userId, bool isUp);

        /// <summary>
        /// Get a post vote 
        /// </summary>
        /// <param name="postId">Post identifier</param>
        /// <param name="customer">Customer</param>
        /// <returns>Post vote</returns>
        Task<PostVote> GetPostVoteAsync(int postId, int userId);

        /// <summary>
        /// Delete a post vote
        /// </summary>
        Task<PostDTO> ChangeVote(PostVote postVote);

        Task<PostDTO> RemoveVote(PostVote postVote);

        /// <summary>
        /// Get post vote made since the parameter date
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="сreatedFromUtc">Date</param>
        /// <returns>Post votes count</returns>
        Task<int> GetNumberOfPostVotesAsync(int userId, DateTime сreatedFromUtc);
    }
}
