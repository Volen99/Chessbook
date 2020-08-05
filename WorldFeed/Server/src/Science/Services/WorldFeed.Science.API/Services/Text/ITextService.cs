namespace WorldFeed.Science.API.Services.Text
{
    using System.Threading.Tasks;

    public interface ITextService
    {
        Task<int> CreateTextAsync(string text, int postId);
    }
}
