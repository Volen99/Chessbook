namespace WorldFeed.History.BC.Science.Services.Posts
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using WorldFeed.History.BC.Science.Models.Posts;

    public interface IPostService
    {
        Task<int> CreatePostAsync(int postId, DateTime createdOn, string userId, int textId);

        Task<IEnumerable<PostOutputModel>> GetAll();

        Task<PostOutputModel> GetLastPost(); // TODO: Not UX
    }
}
