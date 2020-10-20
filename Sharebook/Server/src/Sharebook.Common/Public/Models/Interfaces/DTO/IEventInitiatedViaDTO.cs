namespace Sharebook.Common.Public.Models.Interfaces.DTO
{
    public interface IEventInitiatedViaDTO
    {
        long TweetId { get; }

        long? WelcomeMessageId { get; }
    }
}
