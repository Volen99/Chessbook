namespace WorldFeed.Common.Public.Models.Interfaces
{
    public interface ITweetTextParts
    {
        string Content { get; }

        string Prefix { get; }

        string[] Mentions { get; }
    }
}
