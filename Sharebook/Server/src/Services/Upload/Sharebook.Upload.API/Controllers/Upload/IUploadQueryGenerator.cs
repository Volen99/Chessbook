namespace Sharebook.Upload.API.Controllers
{
    using Sharebook.Common.Public.Parameters;
    using Sharebook.Upload.ChunkedUpload;

    public interface IUploadQueryGenerator
    {
        string GetChunkedUploadInitQuery(IChunkUploadInitParameters chunkUploadInitParameters);

        string GetChunkedUploadAppendQuery(IChunkUploadAppendParameters parameters);

        string GetChunkedUploadFinalizeQuery(long mediaId, ICustomRequestParameters customRequestParameters);
    }
}
