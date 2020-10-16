import {ProcessingState} from '../../Enum/ProcessingState';
import {IUploadProcessingError} from "./IUploadProcessingError";

export interface IUploadProcessingInfo {
  state: string;
  processingState: ProcessingState;
  checkAfterInSeconds: number;
  checkAfterInMilliseconds: number;
  progressPercentage: number;
  error: IUploadProcessingError;
}
