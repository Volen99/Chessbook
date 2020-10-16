import {ITweetEntities} from "../../Entities/ITweetEntities";

export interface IExtendedTweet {
  text: string;

  fullText: string;

  displayTextRange: number[];
  legacyEntities: ITweetEntities;
  extendedEntities: ITweetEntities;
}
