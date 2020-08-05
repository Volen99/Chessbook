namespace WorldFeed.Common.Public.Models.Interfaces
{
    public interface ICategorySuggestion
    {
        string Name { get; }

        string Slug { get; }

        int Size { get; }
    }
}
