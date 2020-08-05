﻿namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using System;

    public interface IUploadedMediaInfo
    {
        DateTime CreatedDate { get; }

        long MediaId { get; set; }
        string MediaIdStr { get; set; }
        int MediaSize { get; set; }

        IUploadedImageDetails ImageDetails { get; set; }

        IUploadedVideoDetails VideoDetails { get; set; }

        IUploadProcessingInfo ProcessingInfo { get; set; }
    }
}
