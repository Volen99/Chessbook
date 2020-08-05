namespace WorldFeed.Controllers.Upload
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Newtonsoft.Json;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters;
    using WorldFeed.Common.Public.Parameters.Enums;
    using WorldFeed.Common.QueryGenerators;
    using WorldFeed.Common.Upload;
    using WorldFeed.Common.Web;

    public class ChunkedUploader : IChunkedUploader
    {
        private readonly IMedia media;
        private readonly ITwitterAccessor twitterAccessor;
        private readonly IUploadQueryGenerator uploadQueryGenerator;
        private readonly ChunkUploadResult result;

        private int? expectedBinaryLength;

        public ChunkedUploader(ITwitterAccessor twitterAccessor, IUploadQueryGenerator uploadQueryGenerator, IMedia media)
        {
            this.twitterAccessor = twitterAccessor;
            this.uploadQueryGenerator = uploadQueryGenerator;
            this.media = media;
            this.result = new ChunkUploadResult
            {
                Media = this.media
            };

            UploadedSegments = new Dictionary<long, byte[]>();
        }

        public long? MediaId
        {
            get => this.media.Id;
            set => this.media.Id = value;
        }

        public Dictionary<long, byte[]> UploadedSegments { get; }

        public int NextSegmentIndex { get; set; }

        public async Task<bool> InitAsync(IChunkUploadInitParameters initParameters, ITwitterRequest request)
        {
            var initQuery = this.uploadQueryGenerator.GetChunkedUploadInitQuery(initParameters);

            request.Query.Url = initQuery;
            request.Query.HttpMethod = HttpMethod.POST;

            var twitterResult = await this.twitterAccessor.ExecuteRequestAsync<IUploadInitModel>(request).ConfigureAwait(false);
            this.result.Init = twitterResult;

            var initModel = twitterResult?.Model;
            if (initModel != null)
            {
                this.expectedBinaryLength = initParameters.TotalBinaryLength;
                this.media.Id = initModel.MediaId;
            }

            return initModel != null;
        }

        public async Task<bool> AppendAsync(IChunkUploadAppendParameters parameters, ITwitterRequest request)
        {
            if (this.MediaId == null)
            {
                throw new InvalidOperationException("You cannot append content to a non initialized chunked upload. You need to invoke the initialize method OR set the MediaId property of an existing ChunkedUpload.");
            }

            if (parameters.SegmentIndex == null)
            {
                parameters.SegmentIndex = this.NextSegmentIndex;
            }

            if (parameters.MediaId == null)
            {
                parameters.MediaId = this.MediaId;
            }

            var appendQuery = this.uploadQueryGenerator.GetChunkedUploadAppendQuery(parameters);

            var multipartQuery = new MultipartTwitterQuery(request.Query)
            {
                Url = appendQuery,
                HttpMethod = HttpMethod.POST,
                Binaries = new[] { parameters.Binary },
                Timeout = parameters.Timeout ?? TimeSpan.FromMilliseconds(System.Threading.Timeout.Infinite),
                ContentId = parameters.MediaType,
                UploadProgressChanged = args =>
                {
                    var progressChangedEventArgs = new MediaUploadProgressChangedEventArgs(UploadProgressState.PROGRESS_CHANGED, args.NumberOfBytesUploaded, args.TotalOfBytesToUpload);
                    parameters.UploadProgressChanged(progressChangedEventArgs);
                },
            };

            request.Query = multipartQuery;

            var twitterResult = await this.twitterAccessor.ExecuteRequestAsync(request).ConfigureAwait(false);
            this.result.AppendsList.Add(twitterResult);

            if (twitterResult.Response.IsSuccessStatusCode)
            {
                this.UploadedSegments.Add(parameters.SegmentIndex.Value, parameters.Binary);
                ++NextSegmentIndex;
            }

            return twitterResult.Response.IsSuccessStatusCode;
        }

        public async Task<bool> FinalizeAsync(ICustomRequestParameters customRequestParameters, ITwitterRequest request)
        {
            if (this.MediaId == null)
            {
                throw new InvalidOperationException("You cannot complete a non initialized chunked upload. Please initialize the method, append some content and then complete the upload.");
            }

            var finalizeQuery = this.uploadQueryGenerator.GetChunkedUploadFinalizeQuery(MediaId.Value, customRequestParameters);

            request.Query.Url = finalizeQuery;
            request.Query.HttpMethod = HttpMethod.POST;

            var finalizeTwitterResult = await this.twitterAccessor.ExecuteRequestAsync<UploadedMediaInfo>(request).ConfigureAwait(false);
            var uploadedMediaInfos = finalizeTwitterResult.Model;

            this.UpdateMedia(uploadedMediaInfos);

            this.result.Finalize = finalizeTwitterResult;

            return finalizeTwitterResult.Response.IsSuccessStatusCode;
        }

        public IChunkUploadResult Result => this.result;

        private void UpdateMedia(IUploadedMediaInfo uploadedMediaInfos)
        {
            this.media.UploadedMediaInfo = uploadedMediaInfos;

            if (this.expectedBinaryLength != null)
            {
                // If all the data has not been sent then we do not construct the data
                if (UploadedSegments.Sum(x => x.Value.Length) == this.expectedBinaryLength)
                {
                    var allSegments = UploadedSegments.OrderBy(x => x.Key);
                    this.media.Data = allSegments.SelectMany(x => x.Value).ToArray();
                }
            }
        }

        // ReSharper disable once ClassNeverInstantiated.Local
        private class UploadInitModel
        {
            [JsonProperty("media_id")]
            public long MediaId { get; set; }


            [JsonProperty("expires_after_secs")]
            public long ExpiresAfterInSeconds { get; set; }
        }
    }
}
