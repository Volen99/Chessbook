import {IUploadedMediaInfo} from "./DTO/IUploadedMediaInfo";
import {InjectionToken} from "@angular/core";
import { Media } from 'src/app/core/Core/Models/Media';

export interface IMedia {
  name: string;
  data: number[];
  id?: number;
  contentType: string;

  hasBeenUploaded: boolean;
  isReadyToBeUsed: boolean;

  uploadedMediaInfo: IUploadedMediaInfo;

  cloneWithoutMediaInfo(source: IMedia): IMedia;

  cloneWithoutUploadInfo(): IMedia;
}

export const IMediaToken = new InjectionToken<IMedia>('IMedia', {
  providedIn: 'root',
  factory: () => new Media(),
});
