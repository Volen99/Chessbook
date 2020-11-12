import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IUploadProgressChanged} from "../../Events/UploadProgressChangedEventArgs";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";

// For more information visit : https://dev.twitter.com/rest/reference/post/account/update_profile_image
export interface IUpdateProfileImageParameters extends ICustomRequestParameters {
  // Binary of the profile image. Must be a valid GIF, JPG, or PNG image of less than 700 kilobytes in size.
  // Images with width larger than 400 pixels will be scaled down.
  binary: number[];

  // Include tweet entities.
  includeEntities?: boolean;


  // When set to true, statuses will not be included in the returned user objects.
  skipStatus?: boolean;

  // If set, the http request will use this duration before throwing an exception.
  timeout?: TimeSpan;

  // Action invoked to show the progress of the upload. {current / total}
  uploadProgressChanged: (uploadProgressChanged: IUploadProgressChanged) => void;
}

export class UpdateProfileImageParameters extends CustomRequestParameters implements IUpdateProfileImageParameters {
  constructor(image: number[]) {
    super();
    this.binary = image;
  }

  public binary: number[];
  public includeEntities?: boolean;
  public skipStatus?: boolean;
  public timeout?: TimeSpan;
  public uploadProgressChanged: (uploadProgressChanged: IUploadProgressChanged) => void;
}
