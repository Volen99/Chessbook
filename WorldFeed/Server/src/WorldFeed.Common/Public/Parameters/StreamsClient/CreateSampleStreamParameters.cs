namespace WorldFeed.Common.Public.Parameters.StreamsClient
{
    public interface ICreateSampleStreamParameters : ICreateTweetStreamParameters
    {
    }

    public class CreateSampleStreamParameters : CreateTweetStreamParameters, ICreateSampleStreamParameters
    {
    }
}
