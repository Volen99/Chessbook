// import {IUploadMediaStatusQueryExecutor} from "./upload-media-status-query-executor";
// import {IMedia} from "../../../shared/models/upload/media/media";
// import {TimeSpan} from "../shared/timespan";
// import {IUploadedMediaInfo} from "../../../shared/models/upload/media/uploaded-media-info";
// import {IUploadProcessingInfo} from "../../../shared/models/upload/upload-processing-info";
// import {Resources} from "../../../helpers/resourse";
//
// export interface IUploadHelper {
//   waitForMediaProcessingToGetAllMetadataAsync(media: IMedia, request: ITwitterRequest): Promise<void>;
// }
//
// @Injectable({
//   providedIn: 'root',
// })
// export class UploadHelper implements IUploadHelper {
//   private readonly _uploadQueryExecutor: IUploadMediaStatusQueryExecutor;
//
//   constructor(@Inject(IUploadMediaStatusQueryExecutorToken) uploadQueryExecutor: IUploadMediaStatusQueryExecutor) {
//     this._uploadQueryExecutor = uploadQueryExecutor;
//   }
//
//   public async waitForMediaProcessingToGetAllMetadataAsync(media: IMedia, request: ITwitterRequest): Promise<void> {
//     if (media == null) {
//       return;
//     }
//
//     let isProcessed: boolean = this.isMediaProcessed(media.uploadedMediaInfo);
//     if (isProcessed) {
//       return;
//     }
//
//     let processingInfoDelay = media.uploadedMediaInfo.processingInfo.checkAfterInMilliseconds;
//     let dateWhenProcessingCanBeChecked = media.uploadedMediaInfo.createdDate.add(TimeSpan.fromMilliseconds(processingInfoDelay));
//
//     let timeToWait: any; //  = dateWhenProcessingCanBeChecked.subtract(DateTime.now).TotalMilliseconds as number;
//
//     let mediaStatus: IUploadedMediaInfo = null;
//     while (isProcessed === false) {
//       await this.sleep(Math.max(timeToWait, 1)); // .ConfigureAwait(false); // TODO: might have UI bugs decades later
//
//       // The second parameter (false) informs Tweetinvi that you are manually awaiting the media to be ready
//       let mediaStatusTwitterResult = await this._uploadQueryExecutor.getMediaStatusAsync(media, request);         // .ConfigureAwait(false);
//
//       mediaStatus = mediaStatusTwitterResult.model;
//       isProcessed = this.isMediaProcessed(mediaStatus.processingInfo);
//       timeToWait = mediaStatus.processingInfo.checkAfterInMilliseconds;
//     }
//
//     debugger
//     media.uploadedMediaInfo = mediaStatus;
//   }
//
//   private sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
//
//   private isMediaProcessed(mediaInfoOrProcessInfo: IUploadedMediaInfo | IUploadProcessingInfo): boolean {
//     let processInfo: IUploadProcessingInfo;
//     if (this.isIUploadedMediaInfo(mediaInfoOrProcessInfo)) {
//       processInfo = mediaInfoOrProcessInfo?.processingInfo;
//     } else {
//       processInfo = mediaInfoOrProcessInfo;
//     }
//
//     let state = processInfo?.processingState;
//
//     if (processInfo == null) {
//       throw new Error(Resources.Exception_Upload_Status_No_ProcessingInfo);
//     }
//
//     return state === ProcessingState.Succeeded || state === ProcessingState.Failed;
//   }
//
//   private isIUploadedMediaInfo(mediaInfoOrProcessInfo: IUploadedMediaInfo | IUploadProcessingInfo): mediaInfoOrProcessInfo is IUploadedMediaInfo {
//     return (mediaInfoOrProcessInfo as IUploadedMediaInfo).mediaId !== undefined;
//   }
// }
