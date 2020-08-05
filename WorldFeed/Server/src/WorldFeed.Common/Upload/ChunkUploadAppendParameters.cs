namespace WorldFeed.Common.Upload
{
    using System;

    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Parameters;

    public interface IChunkUploadAppendParameters
    {
        byte[] Binary { get; }

        string MediaType { get; }

        TimeSpan? Timeout { get; }

        int? SegmentIndex { get; set; }

        long? MediaId { get; set; }

        Action<IMediaUploadProgressChangedEventArgs> UploadProgressChanged { get; set; }

        ICustomRequestParameters CustomRequestParameters { get; set; }
    }

    public class ChunkUploadAppendParameters : IChunkUploadAppendParameters
    {
        public ChunkUploadAppendParameters(byte[] binary, string mediaType, TimeSpan? timeout)
        {
            this.Binary = binary;
            this.MediaType = mediaType;
            this.Timeout = timeout;
            
            this.CustomRequestParameters = new CustomRequestParameters();
        }

        public byte[] Binary { get; }

        public string MediaType { get; }

        public TimeSpan? Timeout { get; }

        public int? SegmentIndex { get; set; }

        public long? MediaId { get; set; }

        public Action<IMediaUploadProgressChangedEventArgs> UploadProgressChanged { get; set; }

        public ICustomRequestParameters CustomRequestParameters { get; set; }
    }
}
