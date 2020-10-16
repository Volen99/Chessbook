import {IMediaMetadata} from "../../core/Public/Models/Interfaces/DTO/IMediaMetadata";
import {IMedia} from "../../core/Public/Models/Interfaces/IMedia";
import {Media} from "../../core/Core/Models/Media";

export class MediaMetadata implements IMediaMetadata {
  constructor(mediaIdOrMedia: number | IMedia) {
    if (typeof mediaIdOrMedia === 'number') {
      this.mediaId = mediaIdOrMedia;
    } else if (mediaIdOrMedia instanceof Media) {
      this.mediaId = mediaIdOrMedia.id;
    }
  }

  public mediaId?: number;
  public altText: string;
}


// public MediaMetadata(long? mediaId)
// {
//   MediaId = mediaId;
// }
//
// public MediaMetadata(IMedia media)
// {
//   MediaId = media.Id;
// }
