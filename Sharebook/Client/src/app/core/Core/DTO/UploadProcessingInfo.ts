import {ProcessingState} from "../../Public/Models/Enum/ProcessingState";
import {IUploadProcessingInfo} from "../../Public/Models/Interfaces/DTO/IUploadProcessingInfo";
import {IUploadProcessingError} from "../../Public/Models/Interfaces/DTO/IUploadProcessingError";

export class UploadProcessingInfo implements IUploadProcessingInfo {
  constructor() {
    this.checkAfterInSeconds = 0;
    this.progressPercentage = 0;
  }

  // [JsonProperty("state")]
  public state: string;

  get processingState(): ProcessingState {
    switch (this.state) {
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

  set processingState(value: ProcessingState) {
    switch (value) {
      case ProcessingState.Pending:
        this.state = "pending";
        break;
      case ProcessingState.InProgress:
        this.state = "in_progress";
        break;
      case ProcessingState.Succeeded:
        this.state = "succeeded";
        break;
      case ProcessingState.Failed:
        this.state = "failed";
        break;
      case ProcessingState.Undefined:
        this.state = "undefined";
        break;
    }
  }

  // [JsonProperty("check_after_secs")]
  public checkAfterInSeconds: number;

  // [JsonIgnore]
  get checkAfterInMilliseconds(): number {
    return this.checkAfterInSeconds * 1000;
  }

  // [JsonProperty("progress_percent")]
  public progressPercentage: number;

  // [JsonProperty("error")]
  public error: IUploadProcessingError;
}
