namespace Sharebook.Common.Public.Parameters.StreamsClient
{
    public interface ICreateFilteredTweetStreamParameters : ICreateTrackedTweetStreamParameters
    {
    }

    public class CreateFilteredTweetStreamParameters : CreateTrackedTweetStreamParameters, ICreateFilteredTweetStreamParameters
    {
    }
}
