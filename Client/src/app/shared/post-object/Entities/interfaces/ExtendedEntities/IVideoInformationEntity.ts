import {IVideoEntityVariant} from "./IVideoEntityVariant";

export interface IVideoInformationEntity {
  // Video aspect ratio (width, height)
  aspectRatio: number[];

  // Duration of video in milliseconds
  durationInMilliseconds: number;

  // Video variants for different codecs, bitrates, etc.
  variants: IVideoEntityVariant[];
}
