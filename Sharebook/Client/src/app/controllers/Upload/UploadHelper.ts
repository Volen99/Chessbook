import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {IMedia} from "../../core/Public/Models/Interfaces/IMedia";
import {IUploadedMediaInfo} from "../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import {
  IUploadMediaStatusQueryExecutor,
  IUploadMediaStatusQueryExecutorToken,
  UploadMediaStatusQueryExecutor
} from "./UploadMediaStatusQueryExecutor";
import {IUploadProcessingInfo} from "../../core/Public/Models/Interfaces/DTO/IUploadProcessingInfo";
import {ProcessingState} from "../../core/Public/Models/Enum/ProcessingState";
import {Resources} from "../../properties/resources";
import {inject, Inject, Injectable, InjectionToken} from "@angular/core";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";
import InvalidOperationException from "typescript-dotnet-commonjs/System/Exceptions/InvalidOperationException";

export interface IUploadHelper {
  waitForMediaProcessingToGetAllMetadataAsync(media: IMedia, request: ITwitterRequest): Promise<void>;
}

export const IUploadHelperToken = new InjectionToken<IUploadHelper>('IUploadHelper', {
  providedIn: 'root',
  factory: () => new UploadHelper(inject(UploadMediaStatusQueryExecutor)),
});

@Injectable({
  providedIn: 'root',
})
export class UploadHelper implements IUploadHelper {
  private readonly _uploadQueryExecutor: IUploadMediaStatusQueryExecutor;

  constructor(@Inject(IUploadMediaStatusQueryExecutorToken) uploadQueryExecutor: IUploadMediaStatusQueryExecutor) {
    this._uploadQueryExecutor = uploadQueryExecutor;
  }

  public async waitForMediaProcessingToGetAllMetadataAsync(media: IMedia, request: ITwitterRequest): Promise<void> {
    if (media == null) {
      return;
    }

    let isProcessed: boolean = this.isMediaProcessed(media.uploadedMediaInfo);
    if (isProcessed) {
      return;
    }

    let processingInfoDelay = media.uploadedMediaInfo.processingInfo.checkAfterInMilliseconds;
    let dateWhenProcessingCanBeChecked = media.uploadedMediaInfo.createdDate.add(TimeSpan.fromMilliseconds(processingInfoDelay));

    let timeToWait: any; //  = dateWhenProcessingCanBeChecked.subtract(DateTime.now).TotalMilliseconds as number;

    let mediaStatus: IUploadedMediaInfo = null;
    while (isProcessed === false) {
      await this.sleep(Math.max(timeToWait, 1)); // .ConfigureAwait(false); // TODO: might have UI bugs decades later

      // The second parameter (false) informs Tweetinvi that you are manually awaiting the media to be ready
      let mediaStatusTwitterResult = await this._uploadQueryExecutor.getMediaStatusAsync(media, request);         // .ConfigureAwait(false);

      mediaStatus = mediaStatusTwitterResult.model;
      isProcessed = this.isMediaProcessed(mediaStatus.processingInfo);
      timeToWait = mediaStatus.processingInfo.checkAfterInMilliseconds;
    }

    media.uploadedMediaInfo = mediaStatus;
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private isMediaProcessed(mediaInfoOrProcessInfo: IUploadedMediaInfo | IUploadProcessingInfo): boolean {
    let processInfo: IUploadProcessingInfo;
    if (this.isIUploadedMediaInfo(mediaInfoOrProcessInfo)) {
      processInfo = mediaInfoOrProcessInfo?.processingInfo;
    } else {
      processInfo = mediaInfoOrProcessInfo;
    }

    let state = processInfo?.processingState;

    if (processInfo == null) {
      throw new InvalidOperationException(Resources.Exception_Upload_Status_No_ProcessingInfo);
    }

    return state === ProcessingState.Succeeded || state === ProcessingState.Failed;
  }

  private isIUploadedMediaInfo(mediaInfoOrProcessInfo: IUploadedMediaInfo | IUploadProcessingInfo): mediaInfoOrProcessInfo is IUploadedMediaInfo {
    return (mediaInfoOrProcessInfo as IUploadedMediaInfo).mediaId !== undefined;
  }
}
