import {IUploadProgressChanged, UploadProgressChangedEventArgs} from "./UploadProgressChangedEventArgs";
import {UploadProgressState} from "../Parameters/Enum/UploadProgressState";

export interface IMediaUploadProgressChangedEventArgs extends IUploadProgressChanged {
  // Type of operation executed for the upload
  State: UploadProgressState;
}

// Event that indicates a progress change during a media upload
export class MediaUploadProgressChangedEventArgs extends UploadProgressChangedEventArgs implements IMediaUploadProgressChangedEventArgs {
  constructor(state: UploadProgressState, numberOfBytesUploaded: number, totalOfBytesToUpload: number) {
    super(numberOfBytesUploaded, totalOfBytesToUpload);
    this.State = state;
    super.numberOfBytesUploaded = numberOfBytesUploaded;
    super.totalOfBytesToUpload = totalOfBytesToUpload;
  }

  public State: UploadProgressState;
}
