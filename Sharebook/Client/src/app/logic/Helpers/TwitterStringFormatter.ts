import {ITwitterStringFormatter} from "../../core/Core/Helpers/ITwitterStringFormatter";
import {SharebookConsts} from "../../core/Public/sharebook-consts";

export class TwitterStringFormatter implements ITwitterStringFormatter {
  public twitterEncode(source: string): string {
    if (source == null) {
      return SharebookConsts.EMPTY;
    }

    return null; // Uri.EscapeDataString(source);
  }

  public twitterDecode(source: string): string {
    if (source == null) {
      return SharebookConsts.EMPTY;
    }

    return null; // Uri.UnescapeDataString(source);
  }
}
