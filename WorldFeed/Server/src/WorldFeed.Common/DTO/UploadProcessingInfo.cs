﻿namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class UploadProcessingInfo : IUploadProcessingInfo
    {
        public UploadProcessingInfo()
        {
            CheckAfterInSeconds = 0;
            ProgressPercentage = 0;
        }

        [JsonProperty("state")]

        public string State { get; set; }

        [JsonIgnore]
        public ProcessingState ProcessingState
        {
            get
            {
                switch (State)
                {
                    case "pending":
                        return ProcessingState.Pending;
                    case "in_progress":
                        return ProcessingState.InProgress;
                    case "succeeded":
                        return ProcessingState.Succeeded;
                    case "failed":
                        return ProcessingState.Failed;
                    default:
                        return ProcessingState.Undefined;
                }
            }
            set
            {
                switch (value)
                {
                    case ProcessingState.Pending:
                        State = "pending";
                        break;
                    case ProcessingState.InProgress:
                        State = "in_progress";
                        break;
                    case ProcessingState.Succeeded:
                        State = "succeeded";
                        break;
                    case ProcessingState.Failed:
                        State = "failed";
                        break;
                    case ProcessingState.Undefined:
                        State = "undefined";
                        break;

                }
            }
        }

        [JsonProperty("check_after_secs")]
        public int CheckAfterInSeconds { get; set; }

        [JsonIgnore]
        public int CheckAfterInMilliseconds => CheckAfterInSeconds * 1000;

        [JsonProperty("progress_percent")]
        public int ProgressPercentage { get; set; }

        [JsonProperty("error")]
        public IUploadProcessingError Error { get; set; }
    }
}
