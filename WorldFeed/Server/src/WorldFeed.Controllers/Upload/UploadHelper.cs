﻿namespace WorldFeed.Controllers.Upload
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Controllers.Properties;

    public interface IUploadHelper
    {
        Task WaitForMediaProcessingToGetAllMetadataAsync(IMedia media, ITwitterRequest request);
    }

    public class UploadHelper : IUploadHelper
    {
        private readonly IUploadMediaStatusQueryExecutor uploadQueryExecutor;

        public UploadHelper(IUploadMediaStatusQueryExecutor uploadQueryExecutor)
        {
            this.uploadQueryExecutor = uploadQueryExecutor;
        }

        public async Task WaitForMediaProcessingToGetAllMetadataAsync(IMedia media, ITwitterRequest request)
        {
            if (media == null)
            {
                return;
            }

            var isProcessed = IsMediaProcessed(media.UploadedMediaInfo);
            if (isProcessed)
            {
                return;
            }

            var processingInfoDelay = media.UploadedMediaInfo.ProcessingInfo.CheckAfterInMilliseconds;
            var dateWhenProcessingCanBeChecked = media.UploadedMediaInfo.CreatedDate.Add(TimeSpan.FromMilliseconds(processingInfoDelay));

            var timeToWait = (int)dateWhenProcessingCanBeChecked.Subtract(DateTime.Now).TotalMilliseconds;

            IUploadedMediaInfo mediaStatus = null;
            while (!isProcessed)
            {
                await Task.Delay(Math.Max(timeToWait, 1)).ConfigureAwait(false);

                // The second parameter (false) informs Tweetinvi that you are manually awaiting the media to be ready
                var mediaStatusTwitterResult = await this.uploadQueryExecutor.GetMediaStatusAsync(media, request).ConfigureAwait(false);

                mediaStatus = mediaStatusTwitterResult.Model;
                isProcessed = IsMediaProcessed(mediaStatus.ProcessingInfo);
                timeToWait = mediaStatus.ProcessingInfo.CheckAfterInMilliseconds;
            }

            media.UploadedMediaInfo = mediaStatus;
        }

        private bool IsMediaProcessed(IUploadedMediaInfo mediaInfo)
        {
            return IsMediaProcessed(mediaInfo?.ProcessingInfo);
        }

        private bool IsMediaProcessed(IUploadProcessingInfo processInfo)
        {
            var state = processInfo?.ProcessingState;

            if (processInfo == null)
            {
                throw new InvalidOperationException(Resources.Exception_Upload_Status_No_ProcessingInfo);
            }

            return state == ProcessingState.Succeeded || state == ProcessingState.Failed;
        }
    }
}
