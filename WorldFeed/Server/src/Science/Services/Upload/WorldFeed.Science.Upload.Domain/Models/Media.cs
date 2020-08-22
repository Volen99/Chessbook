namespace WorldFeed.Science.Upload.Domain.Models
{
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class Media
    {
        // Parameter used to indicate that the media is in the process
        // of being uploaded, but has not yet completed. This give developers
        // the ability to use chunked uploads from multiple computers in parallel
        private long? _existingMediaId;

        public string Name { get; set; }

        public byte[] Data { get; set; }

        public string ContentType { get; set; }

        public long? Id
        {
            get
            {
                // Once the media has been uploaded there is no possible way for developers to change the value of the media Id.
                // The _mediaId parameter is therefore ignored
                if (HasBeenUploaded)
                {
                    // return UploadedMediaInfo.MediaId;
                }

                return _existingMediaId;
            }
            set => _existingMediaId = value;
        }

        public bool HasBeenUploaded { get; set; }
        
        public bool IsReadyToBeUsed { get; set; }

        public Media CloneWithoutMediaInfo(Media source)
        {
            return new Media
            {
                Name = source.Name,
                Data = source.Data
            };
        }

        public Media CloneWithoutUploadInfo()
        {
            var clone = new Media
            {
                Name = Name,
                Data = Data,
                ContentType = ContentType,
                Id = Id,
                _existingMediaId = _existingMediaId
            };

            return clone;
        }
    }
}
