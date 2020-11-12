import {Inject, Injectable} from "@angular/core";

import {IUploadClient} from "../../../core/Public/Client/Clients/IUploadClient";
import {IUploadRequester, IUploadRequesterToken} from "../../../core/Public/Client/Requesters/IUploadRequester";
import {IUploadClientParametersValidator} from "../../../core/Core/Client/Validators/UploadClientParametersValidator";
import {IMedia} from "../../../core/Public/Models/Interfaces/IMedia";
import {IUploadParameters, UploadBinaryParameters} from "../../../core/Public/Parameters/Upload/UploadBinaryParameters";
import {IUploadTweetImageParameters, UploadTweetImageParameters} from "../../../core/Public/Parameters/Upload/UploadTweetImageParameters";
import {IUploadMessageImageParameters, UploadMessageImageParameters} from "../../../core/Public/Parameters/Upload/UploadMessageImageParameters";
import {IUploadTweetVideoParameters, UploadTweetVideoParameters} from "../../../core/Public/Parameters/Upload/UploadTweetVideoParameters";
import {IUploadMessageVideoParameters, UploadMessageVideoParameters} from "../../../core/Public/Parameters/Upload/UploadMessageVideoParameters";
import {AddMediaMetadataParameters, IAddMediaMetadataParameters} from "../../../core/Public/Parameters/Upload/AddMediaMetadataParameters";
import {IUploadedMediaInfo} from "../../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IMediaMetadata} from "../../../core/Public/Models/Interfaces/DTO/IMediaMetadata";
import {RawExecutors} from "../RawExecutors";
import {IRawExecutors, IRawExecutorsToken} from "../../../core/Public/Client/IRawExecutors";

@Injectable({
  providedIn: 'root',
})
export class UploadClient implements IUploadClient {
  private readonly _client: ITwitterClient;
  private readonly _uploadRequester: IUploadRequester;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient, @Inject(IUploadRequesterToken) raw?: IUploadRequester) {
    this._client = client;
    this._uploadRequester = raw; // client.raw.upload;
  }

  get parametersValidator(): IUploadClientParametersValidator {
    // @ts-ignore
    return this._client.parametersValidator;
  }

  public async uploadBinaryAsync(binaryOrParameters: ArrayBuffer | IUploadParameters): Promise<IMedia> {
    let parameters: IUploadParameters;
    if (this.isIUploadParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadBinaryParameters(binaryOrParameters);
    }

    let chunkUploadResult = await this._uploadRequester.uploadBinaryAsync(parameters);
    debugger
    return chunkUploadResult.media;
  }

  public uploadTweetImageAsync(binaryOrParameters: ArrayBuffer | IUploadTweetImageParameters): Promise<IMedia> {
    let parameters: IUploadTweetImageParameters;
    if (this.isIUploadTweetImageParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadTweetImageParameters(binaryOrParameters);
    }

    return this.uploadBinaryAsync(parameters as IUploadParameters); // TODO: might bug
  }

  public uploadMessageImageAsync(binaryOrParameters: ArrayBuffer | IUploadMessageImageParameters): Promise<IMedia> {
    let parameters: IUploadMessageImageParameters;
    if (this.isIUploadMessageImageParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadMessageImageParameters(binaryOrParameters);
    }

    return this.uploadBinaryAsync(parameters);
  }

  public uploadTweetVideoAsync(binaryOrParameters: ArrayBuffer | IUploadTweetVideoParameters): Promise<IMedia> {
    let parameters: IUploadTweetVideoParameters;
    if (this.isIUploadTweetVideoParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadTweetVideoParameters(binaryOrParameters);
    }

    return this.uploadBinaryAsync(parameters);
  }

  public uploadMessageVideoAsync(binaryOrParameters: ArrayBuffer | IUploadMessageVideoParameters): Promise<IMedia> {
    let parameters: IUploadMessageVideoParameters;
    if (this.isIUploadMessageVideoParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadMessageVideoParameters(binaryOrParameters);
    }

    return this.uploadBinaryAsync(parameters);
  }

  public async addMediaMetadataAsync(metadataOrParameters: IMediaMetadata | IAddMediaMetadataParameters): Promise<void> {
    let parameters: IAddMediaMetadataParameters;
    if (this.isIAddMediaMetadataParameters(metadataOrParameters)) {
      parameters = metadataOrParameters;
    } else {
      parameters = new AddMediaMetadataParameters(metadataOrParameters.mediaId);
      parameters.altText = metadataOrParameters.altText;
    }

    await this._uploadRequester.addMediaMetadataAsync(parameters); // .ConfigureAwait(false);
  }

  public async getVideoProcessingStatusAsync(media: IMedia): Promise<IUploadedMediaInfo> {
    let twitterResult = await this._uploadRequester.getVideoProcessingStatusAsync(media); // .ConfigureAwait(false);
    return twitterResult.model;
  }

  public waitForMediaProcessingToGetAllMetadataAsync(media: IMedia): Promise<void> {
    return this._uploadRequester.waitForMediaProcessingToGetAllMetadataAsync(media);
  }

  private isIUploadParameters(binaryOrParameters: ArrayBuffer | IUploadParameters): binaryOrParameters is IUploadParameters {
    return (binaryOrParameters as IUploadParameters).binary !== undefined;
  }

  private isIUploadTweetImageParameters(binaryOrParameters: ArrayBuffer | IUploadTweetImageParameters): binaryOrParameters is IUploadTweetImageParameters {
    return (binaryOrParameters as IUploadTweetImageParameters).binary !== undefined;
  }

  private isIUploadMessageImageParameters(binaryOrParameters: ArrayBuffer | IUploadMessageImageParameters): binaryOrParameters is IUploadMessageImageParameters {
    return (binaryOrParameters as IUploadMessageImageParameters).binary !== undefined;
  }

  private isIUploadTweetVideoParameters(binaryOrParameters: ArrayBuffer | IUploadTweetVideoParameters): binaryOrParameters is IUploadTweetVideoParameters {
    return (binaryOrParameters as IUploadTweetVideoParameters).binary !== undefined;
  }

  private isIUploadMessageVideoParameters(binaryOrParameters: ArrayBuffer | IUploadMessageVideoParameters): binaryOrParameters is IUploadMessageVideoParameters {
    return (binaryOrParameters as IUploadMessageVideoParameters).binary !== undefined;
  }

  private isIAddMediaMetadataParameters(metadataOrParameters: IMediaMetadata | IAddMediaMetadataParameters): metadataOrParameters is IAddMediaMetadataParameters {
    return (metadataOrParameters as IAddMediaMetadataParameters).altText !== undefined;
  }
}
