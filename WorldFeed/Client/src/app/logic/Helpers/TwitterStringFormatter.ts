import {ITwitterStringFormatter} from "../../core/Core/Helpers/ITwitterStringFormatter";
import Uri from "../../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";

export class TwitterStringFormatter implements ITwitterStringFormatter {
  public twitterEncode(source: string): string {
    if (source == null) {
      return string.Empty;
    }

    return Uri.EscapeDataString(source);
  }

  public twitterDecode(source: string): string {
    if (source == null) {
      return string.Empty;
    }

    return Uri.UnescapeDataString(source);
  }
}
