
export interface IUploadProcessingInfo {
  state: string;
  // processingState: ProcessingState;
  checkAfterInSeconds: number;
  checkAfterInMilliseconds: number;
  progressPercentage: number;
  // error: UploadProcessingError;
}
