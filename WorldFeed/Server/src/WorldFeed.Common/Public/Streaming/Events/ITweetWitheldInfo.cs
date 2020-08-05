namespace WorldFeed.Common.Public.Streaming.Events
{
    using System.Collections.Generic;

    public interface ITweetWitheldInfo
    {
        long Id { get; }

        long UserId { get; }

        IEnumerable<string> WitheldInCountries { get; }
    }
}
