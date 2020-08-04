namespace WorldFeed.History.BC.Science.Services.Text
{
    using System.Threading.Tasks;

    public interface ITextService
    {
        Task<int> CreateTextAsync(int textId, string content, int postId);
    }
}
