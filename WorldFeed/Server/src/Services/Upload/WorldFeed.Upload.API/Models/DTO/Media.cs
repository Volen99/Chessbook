﻿namespace WorldFeed.Upload.Models.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Upload.DTO;

    public class Media : IMedia
    {
        // Parameter used to indicate that the media is in the process of being uploaded, but has not yet completed. 
        // This give developers the ability to use chunked uploads from multiple computers in parallel
        private long? _existingMediaId;

        public string Name { get; set; }

        [JsonIgnore]
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
                    return UploadedMediaInfo.MediaId;
                }

                return _existingMediaId;
            }
            set => _existingMediaId = value;
        }

        public bool HasBeenUploaded => UploadedMediaInfo != null;

        public bool IsReadyToBeUsed
        {
            get
            {
                var processingInfo = UploadedMediaInfo?.ProcessingInfo;
                return HasBeenUploaded && processingInfo?.Error == null;
            }
        }

        public IUploadedMediaInfo UploadedMediaInfo { get; set; }

        public IMedia CloneWithoutMediaInfo(IMedia source)
        {
            return new Media
            {
                Name = source.Name,
                Data = source.Data
            };
        }

        public IMedia CloneWithoutUploadInfo()
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
