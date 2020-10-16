import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";

export interface IUploadProgressChanged {
  // Numbers of bytes that have been successfully sent at the current time
  NumberOfBytesUploaded: number;

  // Total number of bytes of the upload
  TotalOfBytesToUpload: number;

  // Percentage of completion of the upload
  Percentage: number;
}

// Event that indicates a progress change during an upload
export class UploadProgressChangedEventArgs extends EventArgs implements IUploadProgressChanged {
  constructor(numberOfBytesUploaded: number, totalOfBytesToUpload: number) {
    super();
    this.NumberOfBytesUploaded = numberOfBytesUploaded;
    this.TotalOfBytesToUpload = totalOfBytesToUpload;
  }

  public NumberOfBytesUploaded: number;
  public TotalOfBytesToUpload: number;

  get Percentage(): number {
    if (this.TotalOfBytesToUpload === 0) {
      return 0;
    }

    return (/*(float)*/this.NumberOfBytesUploaded / this.TotalOfBytesToUpload * 100) as number;
  }
}
