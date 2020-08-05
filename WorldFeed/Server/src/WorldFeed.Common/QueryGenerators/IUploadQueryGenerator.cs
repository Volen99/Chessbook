namespace WorldFeed.Common.QueryGenerators
{
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Upload;

    public interface IUploadQueryGenerator
    {
        string GetChunkedUploadInitQuery(IChunkUploadInitParameters chunkUploadInitParameters);

        string GetChunkedUploadAppendQuery(IChunkUploadAppendParameters parameters);

        string GetChunkedUploadFinalizeQuery(long mediaId, ICustomRequestParameters customRequestParameters);
    }
}
