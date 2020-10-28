import {IMedia} from "../../core/Public/Models/Interfaces/IMedia";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {IUploadedMediaInfo} from "../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import {ITwitterAccessor, ITwitterAccessorToken} from '../../core/Core/Web/ITwitterAccessor';
import InvalidOperationException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException';
import {HttpMethod} from "../../core/Public/Models/Enum/HttpMethod";
import {Resources} from "../../properties/resources";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import {TwitterAccessor} from "../../Tweetinvi.Credentials/TwitterAccessor";

export interface IUploadMediaStatusQueryExecutor {
  getMediaStatusAsync(media: IMedia, request: ITwitterRequest): Promise<ITwitterResult<IUploadedMediaInfo>>;
}

export const IUploadMediaStatusQueryExecutorToken = new InjectionToken<IUploadMediaStatusQueryExecutor>('IUploadMediaStatusQueryExecutor', {
  providedIn: 'root',
  factory: () => new UploadMediaStatusQueryExecutor(Inject(TwitterAccessor))
});

@Injectable()
export class UploadMediaStatusQueryExecutor implements IUploadMediaStatusQueryExecutor {
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(@Inject(ITwitterAccessorToken) twitterAccessor: ITwitterAccessor) {
    this._twitterAccessor = twitterAccessor;
  }

  public async getMediaStatusAsync(media: IMedia, request: ITwitterRequest): Promise<ITwitterResult<IUploadedMediaInfo>> {
    if (!media.hasBeenUploaded) {
      throw new InvalidOperationException(Resources.Exception_Upload_Status_NotUploaded);
    }

    if (media.uploadedMediaInfo.processingInfo == null) {
      throw new InvalidOperationException(Resources.Exception_Upload_Status_No_ProcessingInfo);
    }

    request.query.url = `https://upload.twitter.com/1.1/media/upload.json?command=STATUS&media_id=${media.id}`.EstimateTweetLength();
    request.query.httpMethod = HttpMethod.GET;

    return await this._twitterAccessor.executeRequestAsync<IUploadedMediaInfo>(request); // .ConfigureAwait(false);
  }
}
