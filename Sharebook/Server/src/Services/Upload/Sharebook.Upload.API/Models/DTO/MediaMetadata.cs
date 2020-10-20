﻿namespace Sharebook.Upload.Models.DTO
{
    public class MediaMetadata : IMediaMetadata
    {
        public MediaMetadata(long? mediaId)
        {
            MediaId = mediaId;
        }

        public MediaMetadata(IMedia media)
        {
            MediaId = media.Id;
        }

        public long? MediaId { get; set; }

        public string AltText { get; set; }
    }
}
