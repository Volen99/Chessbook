namespace WorldFeed.Post.API.Models
{
    public interface ICategorySuggestion
    {
        string Name { get; }

        string Slug { get; }

        int Size { get; }
    }
}
