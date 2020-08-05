
namespace WorldFeed.Common.Credentials
{
    using System;

    using WorldFeed.Common.Public.Models.Authentication;

    public interface ICredentialsAccessor
    {
        ITwitterCredentials ApplicationCredentials { get; set; }

        ITwitterCredentials CurrentThreadCredentials { get; set; }

        T ExecuteOperationWithCredentials<T>(ITwitterCredentials credentials, Func<T> operation);

        void ExecuteOperationWithCredentials(ITwitterCredentials credentials, Action operation);
    }
}
