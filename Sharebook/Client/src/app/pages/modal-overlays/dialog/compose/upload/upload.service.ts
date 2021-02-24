import {Observable} from "rxjs";

import {UploadRequesterService} from "./chunked-upload/upload-requester.service";
import {IUploadParameters, UploadBinaryParameters} from "../../../../../shared/models/upload/upload-binary-parameters";
import {
  IUploadTweetImageParameters,
  UploadTweetImageParameters
} from "../../../../../shared/models/upload/upload-tweetImage-parameters";
import {
  IUploadMessageImageParameters,
  UploadMessageImageParameters
} from "../../../../../shared/models/upload/upload-message-image-parameters";
import {
  IUploadTweetVideoParameters,
  UploadTweetVideoParameters
} from "../../../../../shared/models/upload/upload-tweet-video-parameters";
import {
  IUploadMessageVideoParameters,
  UploadMessageVideoParameters
} from "../../../../../shared/models/upload/upload-message-video-parameters";
import {
  AddMediaMetadataParameters,
  IAddMediaMetadataParameters
} from "../../../../../shared/models/upload/add-media-metadata-parameters";
import {IMedia} from "../../../../../shared/models/upload/media/media";
import {IUploadedMediaInfo} from "../../../../../shared/models/upload/media/uploaded-media-info";
import {IMediaMetadata} from "../../../../../shared/models/upload/media/media-metadata";
import {IUploadClientParametersValidator} from "./validators/upload-client-parameters-validator";
import {Injectable} from "@angular/core";

@Injectable()
export class UploadService {
  constructor(private uploadRequesterService: UploadRequesterService) {
  }

  // get parametersValidator(): IUploadClientParametersValidator {
  //   return this._client.parametersValidator;
  // }

  public async uploadBinaryAsync(binaryOrParameters: ArrayBuffer | IUploadParameters, mediaType?: string): Promise<IMedia> {
    let parameters: IUploadParameters;
    if (this.isIUploadParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadBinaryParameters(binaryOrParameters, mediaType);
    }

    let chunkUploadResult = await this.uploadRequesterService.uploadBinaryAsync(parameters);

    return chunkUploadResult.media;
  }

  public uploadTweetImageAsync(binaryOrParameters: ArrayBuffer | IUploadTweetImageParameters, mediaType?: string): Promise<IMedia> {
    let parameters: IUploadTweetImageParameters;
    if (this.isIUploadTweetImageParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UploadTweetImageParameters(binaryOrParameters, mediaType);
    }

    return this.uploadBinaryAsync(parameters as IUploadParameters, mediaType); // TODO: might bug
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

  // public async addMediaMetadataAsync(metadataOrParameters: IMediaMetadata | IAddMediaMetadataParameters): Promise<void> {
  //   let parameters: IAddMediaMetadataParameters;
  //   if (this.isIAddMediaMetadataParameters(metadataOrParameters)) {
  //     parameters = metadataOrParameters;
  //   } else {
  //     parameters = new AddMediaMetadataParameters(metadataOrParameters.mediaId);
  //     parameters.altText = metadataOrParameters.altText;
  //   }
  //
  //   await this.uploadRequesterService.addMediaMetadataAsync(parameters); // .ConfigureAwait(false);
  // }

  // public async getVideoProcessingStatusAsync(media: IMedia): Promise<IUploadedMediaInfo> {
  //   let twitterResult = await this.uploadRequesterService.getVideoProcessingStatusAsync(media); // .ConfigureAwait(false);
  //   return twitterResult.model;
  // }
  //
  // public waitForMediaProcessingToGetAllMetadataAsync(media: IMedia): Promise<void> {
  //   return this.uploadRequesterService.waitForMediaProcessingToGetAllMetadataAsync(media);
  // }

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

  // private isIAddMediaMetadataParameters(metadataOrParameters: IMediaMetadata | IAddMediaMetadataParameters): metadataOrParameters is IAddMediaMetadataParameters {
  //   return (metadataOrParameters as IAddMediaMetadataParameters).altText !== undefined;
  // }
}
