namespace WorldFeed.Science.API.Services.Posts
{
    using System.Threading.Tasks;

    public interface IPostService
    {
        Task<int> CreatePostAsync(string userId);
    }
}
