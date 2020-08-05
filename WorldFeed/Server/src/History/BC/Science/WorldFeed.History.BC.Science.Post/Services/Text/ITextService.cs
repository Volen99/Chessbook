namespace WorldFeed.History.BC.Science.Post.Services.Text
{
    using System.Threading.Tasks;

    public interface ITextService
    {
        Task<int> CreateTextAsync(string text, int postId);
    }
}
