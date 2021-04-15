namespace Chessbook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Chessbook.Data.Models.Post;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Web.Models.Outputs.Posts;

    public interface IPostsService
    {
        Task<Post> CreateAsync(QueryPostParams query, int userId, int[] mediaIds = null, int pollId = 0);

        T GetById<T>(int id);

        IEnumerable<T> GetByCategoryId<T>(int categoryId, int? take = null, int skip = 0);

        Task<IEnumerable<T>> GetHomeTimeline<T>(int userId, int? count = null, int skip = 0);

        Task<IEnumerable<T>> GetUserProfileTimeline<T>(int userId, int? count = null, int skip = 0);

        int GetCountByCategoryId(int categoryId);

        Task<PostDTO> InsertPostVoteAsync(int postId, int userId, PostRateType postRateType);

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
        Task<PostDTO> ChangeVote(PostRateType postRateType, PostVote postVote);

        Task<PostDTO> RemoveVote(PostVote postVote);

        Task<PostRateDTO> LoadUserPostRate(int userId, int postId);

        /// <summary>
        /// Get post vote made since the parameter date
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="сreatedFromUtc">Date</param>
        /// <returns>Post votes count</returns>
        Task<int> GetNumberOfPostVotesAsync(int userId, DateTime сreatedFromUtc);

        Task<IEnumerable<T>> GetLikers<T>(int postId);
    }
}
