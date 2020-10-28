import {Inject, Injectable} from "@angular/core";

import {IUploadRequester} from "../../../core/Public/Client/Requesters/IUploadRequester";
import {IUploadHelper, IUploadHelperToken} from 'src/app/controllers/Upload/UploadHelper';
import {
  IUploadClientRequiredParametersValidator,
  IUploadClientRequiredParametersValidatorToken
} from 'src/app/core/Core/Client/Validators/UploadClientRequiredParametersValidator';
import {
  IUploadMediaStatusQueryExecutor,
  IUploadMediaStatusQueryExecutorToken
} from 'src/app/controllers/Upload/UploadMediaStatusQueryExecutor';
import {IUploadQueryExecutor, IUploadQueryExecutorToken} from 'src/app/controllers/Upload/UploadQueryExecutor';
import {BaseRequester} from "../BaseRequester";
import {IChunkUploadResult} from "../../../core/Core/Upload/ChunkUploaderResult";
import {IUploadParameters} from "../../../core/Public/Parameters/Upload/UploadBinaryParameters";
import {ITwitterResult} from 'src/app/core/Core/Web/TwitterResult';
import {IUploadedMediaInfo} from "../../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import {IMedia} from "../../../core/Public/Models/Interfaces/IMedia";
import {IAddMediaMetadataParameters} from 'src/app/core/Public/Parameters/Upload/AddMediaMetadataParameters';
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import Tweetinvi from "../../../core/Core/Events/TweetinviGlobalEvents";
import ITwitterClientEvents = Tweetinvi.Core.Events.ITwitterClientEvents;

@Injectable()
export class UploadRequester extends BaseRequester implements IUploadRequester {
  private readonly _uploadClientRequiredParametersValidator: IUploadClientRequiredParametersValidator;
  private readonly _uploadQueryExecutor: IUploadQueryExecutor;
  private readonly _uploadMediaStatusQueryExecutor: IUploadMediaStatusQueryExecutor;
  private readonly _uploadHelper: IUploadHelper;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) clientEvents: ITwitterClientEvents,
              @Inject(IUploadClientRequiredParametersValidatorToken) uploadClientRequiredParametersValidator: IUploadClientRequiredParametersValidator,
              @Inject(IUploadQueryExecutorToken) uploadQueryExecutor: IUploadQueryExecutor,
              @Inject(IUploadMediaStatusQueryExecutorToken) uploadMediaStatusQueryExecutor: IUploadMediaStatusQueryExecutor,
              @Inject(IUploadHelperToken) uploadHelper: IUploadHelper) {
    super(client, clientEvents);

    this._uploadClientRequiredParametersValidator = uploadClientRequiredParametersValidator;
    this._uploadQueryExecutor = uploadQueryExecutor;
    this._uploadMediaStatusQueryExecutor = uploadMediaStatusQueryExecutor;
    this._uploadHelper = uploadHelper;
  }

  public uploadBinaryAsync(parameters: IUploadParameters): Promise<IChunkUploadResult> {
    this._uploadClientRequiredParametersValidator.validate(parameters);
    return this.ExecuteRequestAsync(request => this._uploadQueryExecutor.uploadBinaryAsync(parameters, request));
  }

  public addMediaMetadataAsync(parameters: IAddMediaMetadataParameters): Promise<ITwitterResult> {
    this._uploadClientRequiredParametersValidator.validate(parameters);
    return this.ExecuteRequestAsync(request => this._uploadQueryExecutor.addMediaMetadataAsync(parameters, request));
  }

  public getVideoProcessingStatusAsync(media: IMedia): Promise<ITwitterResult<IUploadedMediaInfo>> {
    return this.ExecuteRequestAsync(request => this._uploadMediaStatusQueryExecutor.getMediaStatusAsync(media, request));
  }

  public waitForMediaProcessingToGetAllMetadataAsync(media: IMedia): Promise<void> {
    return this.ExecuteRequestAsync(request => this._uploadHelper.waitForMediaProcessingToGetAllMetadataAsync(media, request));
  }
}
