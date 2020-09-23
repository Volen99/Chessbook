namespace WorldFeed.Upload.API.Controllers
{
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Upload.ChunkedUpload;

    public interface IUploadQueryGenerator
    {
        string GetChunkedUploadInitQuery(IChunkUploadInitParameters chunkUploadInitParameters);

        string GetChunkedUploadAppendQuery(IChunkUploadAppendParameters parameters);

        string GetChunkedUploadFinalizeQuery(long mediaId, ICustomRequestParameters customRequestParameters);
    }
}
