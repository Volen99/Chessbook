import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import TimeSpan from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import {IUploadProgressChanged} from "../../Events/UploadProgressChangedEventArgs";

// For more information visit: https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-update_profile_banner
export interface IUpdateProfileBannerParameters extends ICustomRequestParameters {
  // Binary of the banner image.
  binary: number[];

  // The width of the preferred section of the image being uploaded in pixels. Use with height, offset_left, and offset_top to select the desired region of the image to use.
  width?: number;

  // The height of the preferred section of the image being uploaded in pixels. Use with width, offset_left, and offset_top to select the desired region of the image to use.
  height?: number;

  // The number of pixels by which to offset the uploaded image from the left. Use with height, width, and offset_top to select the desired region of the image to use.
  offsetLeft?: number;

  // The number of pixels by which to offset the uploaded image from the top. Use with height, width, and offset_left to select the desired region of the image to use.
  offsetTop?: number;

  // If set, the http request will use this duration before throwing an exception.
  timeout?: TimeSpan;

  // Action invoked to show the progress of the upload. {current / total}
  uploadProgressChanged: (uploadProgressChanged: IUploadProgressChanged) => void;
}

export class UpdateProfileBannerParameters extends CustomRequestParameters implements IUpdateProfileBannerParameters {
  constructor(image: number[]) {
    super();
    this.binary = image;
  }

  public binary: number[];
  public width?: number;
  public height?: number;
  public offsetLeft?: number;
  public offsetTop?: number;
  public timeout?: TimeSpan;
  public uploadProgressChanged: (uploadProgressChanged: IUploadProgressChanged) => void;
}
