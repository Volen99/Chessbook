namespace WorldFeed.Upload.Application.Parameters
{
    /// <summary>
    /// For more description visit : https://dev.twitter.com/rest/media/uploading-media
    /// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
    /// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
    /// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
    /// </summary>
    public interface IUploadMessageVideoParameters : IUploadParameters
    {
    }

    /// <inheritdoc/>
    public class UploadMessageVideoParameters : UploadBinaryParameters, IUploadMessageVideoParameters
    {
        public UploadMessageVideoParameters(byte[] binary) : base(binary)
        {
            MediaType = Models.Enums.MediaType.VideoMp4;
            MediaCategory = Models.Enums.MediaCategory.DmVideo;
        }
    }
}
