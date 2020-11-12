export interface IUploadProgressChanged {
  // Numbers of bytes that have been successfully sent at the current time
  numberOfBytesUploaded: number;

  // Total number of bytes of the upload
  totalOfBytesToUpload: number;

  // Percentage of completion of the upload
  percentage: number;
}

// Event that indicates a progress change during an upload
export class UploadProgressChangedEventArgs /*extends EventArgs*/ implements IUploadProgressChanged {
  constructor(numberOfBytesUploaded: number, totalOfBytesToUpload: number) {
    // super();

    this.numberOfBytesUploaded = numberOfBytesUploaded;
    this.totalOfBytesToUpload = totalOfBytesToUpload;
  }

  public numberOfBytesUploaded: number;
  public totalOfBytesToUpload: number;

  get percentage(): number {
    if (this.totalOfBytesToUpload === 0) {
      return 0;
    }

    return (/*(float)*/this.numberOfBytesUploaded / this.totalOfBytesToUpload * 100) as number;
  }
}
