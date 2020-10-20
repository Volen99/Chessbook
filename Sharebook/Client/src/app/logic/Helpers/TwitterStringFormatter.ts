import {ITwitterStringFormatter} from "../../core/Core/Helpers/ITwitterStringFormatter";
import Uri from "../../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import {SharebookConsts} from "../../core/Public/sharebook-consts";

export class TwitterStringFormatter implements ITwitterStringFormatter {
  public twitterEncode(source: string): string {
    if (source == null) {
      return SharebookConsts.EMPTY;
    }

    return Uri.EscapeDataString(source);
  }

  public twitterDecode(source: string): string {
    if (source == null) {
      return SharebookConsts.EMPTY;
    }

    return Uri.UnescapeDataString(source);
  }
}
