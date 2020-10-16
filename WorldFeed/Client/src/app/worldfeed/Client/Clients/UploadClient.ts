import {IUploadClient} from "../../../core/Public/Client/Clients/IUploadClient";
import {IUploadRequester} from "../../../core/Public/Client/Requesters/IUploadRequester";
import {IUploadClientParametersValidator} from "../../../core/Core/Client/Validators/UploadClientParametersValidator";
import {IMedia} from "../../../core/Public/Models/Interfaces/IMedia";
import {IUploadParameters, UploadBinaryParameters} from "../../../core/Public/Parameters/Upload/UploadBinaryParameters";
import {IUploadTweetImageParameters, UploadTweetImageParameters} from "../../../core/Public/Parameters/Upload/UploadTweetImageParameters";
import {IUploadMessageImageParameters, UploadMessageImageParameters} from "../../../core/Public/Parameters/Upload/UploadMessageImageParameters";
import {IUploadTweetVideoParameters, UploadTweetVideoParameters} from "../../../core/Public/Parameters/Upload/UploadTweetVideoParameters";
import {IUploadMessageVideoParameters, UploadMessageVideoParameters} from "../../../core/Public/Parameters/Upload/UploadMessageVideoParameters";
import {AddMediaMetadataParameters, IAddMediaMetadataParameters} from "../../../core/Public/Parameters/Upload/AddMediaMetadataParameters";
import {IUploadedMediaInfo} from "../../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import {ITwitterClient} from "../../../core/Public/ITwitterClient";
import {IMediaMetadata} from "../../../core/Public/Models/Interfaces/DTO/IMediaMetadata";

export class UploadClient implements IUploadClient {
  private readonly _client: ITwitterClient;
  private readonly _uploadRequester: IUploadRequester;

  constructor(client: ITwitterClient) {
    this._client = client;
    this._uploadRequester = client.Raw.upload;
  }

  get parametersValidator(): IUploadClientParametersValidator {
    return this._client.ParametersValidator;
  }

  public async uploadBinaryAsync(binaryOrParameters: number[] | IUploadParameters): Promise<IMedia> {
    let parameters: IUploadParameters;
    if (this.isIUploadParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadBinaryParameters(binaryOrParameters);
    }

    let chunkUploadResult = await this._uploadRequester.uploadBinaryAsync(parameters); // .ConfigureAwait(false);
    return chunkUploadResult.media;
  }

  public uploadTweetImageAsync(binaryOrParameters: number[] | IUploadTweetImageParameters): Promise<IMedia> {
    let parameters: IUploadTweetImageParameters;
    if (this.isIUploadTweetImageParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadTweetImageParameters(binaryOrParameters);
    }

    return this.uploadBinaryAsync(parameters);
  }

  public uploadMessageImageAsync(binaryOrParameters: number[] | IUploadMessageImageParameters): Promise<IMedia> {
    let parameters: IUploadMessageImageParameters;
    if (this.isIUploadMessageImageParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadMessageImageParameters(binaryOrParameters);
    }

    return this.uploadBinaryAsync(parameters);
  }

  public uploadTweetVideoAsync(binaryOrParameters: number[] | IUploadTweetVideoParameters): Promise<IMedia> {
    let parameters: IUploadTweetVideoParameters;
    if (this.isIUploadTweetVideoParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadTweetVideoParameters(binaryOrParameters);
    }

    return this.uploadBinaryAsync(parameters);
  }

  public uploadMessageVideoAsync(binaryOrParameters: number[] | IUploadMessageVideoParameters): Promise<IMedia> {
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

  private isIUploadParameters(binaryOrParameters: number[] | IUploadParameters): binaryOrParameters is IUploadParameters {
    return (binaryOrParameters as IUploadParameters).binary !== undefined;
  }

  private isIUploadTweetImageParameters(binaryOrParameters: number[] | IUploadTweetImageParameters): binaryOrParameters is IUploadTweetImageParameters {
    return (binaryOrParameters as IUploadTweetImageParameters).binary !== undefined;
  }

  private isIUploadMessageImageParameters(binaryOrParameters: number[] | IUploadMessageImageParameters): binaryOrParameters is IUploadMessageImageParameters {
    return (binaryOrParameters as IUploadMessageImageParameters).binary !== undefined;
  }

  private isIUploadTweetVideoParameters(binaryOrParameters: number[] | IUploadTweetVideoParameters): binaryOrParameters is IUploadTweetVideoParameters {
    return (binaryOrParameters as IUploadTweetVideoParameters).binary !== undefined;
  }

  private isIUploadMessageVideoParameters(binaryOrParameters: number[] | IUploadMessageVideoParameters): binaryOrParameters is IUploadMessageVideoParameters {
    return (binaryOrParameters as IUploadMessageVideoParameters).binary !== undefined;
  }

  private isIAddMediaMetadataParameters(metadataOrParameters: IMediaMetadata | IAddMediaMetadataParameters): metadataOrParameters is IAddMediaMetadataParameters {
    return (metadataOrParameters as IAddMediaMetadataParameters).altText !== undefined;
  }
}
