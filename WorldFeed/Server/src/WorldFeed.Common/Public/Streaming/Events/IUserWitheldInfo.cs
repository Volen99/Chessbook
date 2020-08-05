namespace WorldFeed.Common.Public.Streaming.Events
{
    using System.Collections.Generic;

    public interface IUserWitheldInfo
    {
        long Id { get; }

        IEnumerable<string> WitheldInCountries { get; }
    }
}
