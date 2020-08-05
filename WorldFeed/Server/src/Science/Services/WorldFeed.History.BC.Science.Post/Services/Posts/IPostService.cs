namespace WorldFeed.History.BC.Science.Post.Services.Posts
{
    using System.Threading.Tasks;

    public interface IPostService
    {
        Task<int> CreatePostAsync(string userId);
    }
}
