import {IMedia} from "../../../../../../../shared/models/upload/media/media";
import {IUploadedMediaInfo} from "../../../../../../../shared/models/upload/media/uploaded-media-info";

export class Media implements IMedia {
  // Parameter used to indicate that the media is in the process
  // of being uploaded, but has not yet completed. This give developers
  // the ability to use chunked uploads from multiple computers in parallel
  private _existingMediaId: number | null;

  public name: string;

  // [JsonIgnore]
  public data: number[];
  public contentType: string;

  get id(): number | null {
    // Once the media has been uploaded there is no possible way for developers to change the value of the media Id.
    // The _mediaId parameter is therefore ignored
    // if (this.hasBeenUploaded) {             TODO: UNCOMMENT AND FIX LOGIC WHEN YOU FIX FINALIZE AFTER SHARE BUTTON CLICKED!
    //   return this.uploadedMediaInfo.mediaId;
    // }

    return this._existingMediaId;
  }

  set id(value: number) {
    this._existingMediaId = value;
  }

  get hasBeenUploaded(): boolean {
    return this.uploadedMediaInfo != null;
  }

  get isReadyToBeUsed(): boolean {
    let processingInfo = this.uploadedMediaInfo?.processingInfo;
    return this.hasBeenUploaded; // && processingInfo?.error == null;
  }

  public uploadedMediaInfo: IUploadedMediaInfo;

  public cloneWithoutMediaInfo(source: IMedia): IMedia {

    let result: IMedia = new Media();
    result.name = source.name;
    result.data = source.data;

    return result;
  }

  public cloneWithoutUploadInfo(): IMedia {
    let clone: IMedia = new Media();
    clone.name = this.name;
    clone.data = this.data;
    clone.contentType = this.contentType;
    clone.id = this.id;
    this._existingMediaId = this._existingMediaId;

    return clone;
  }
}
