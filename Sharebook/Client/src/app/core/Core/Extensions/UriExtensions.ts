import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";
import {format} from "typescript-dotnet-commonjs/System/Text/Utility";
import {UriKind} from "../../Public/Models/Enum/uri-kind";

export abstract class UriExtensions {
  public static getEndpointURL(uri: Uri): string {
    return format("{0}://{1}{2}", uri.scheme, uri.host, uri.path); // .absolutePath
    // Other solution : uri.absoluteUri.replace(uri.query, "");
  }

  public static isWellFormedUriString(uriString: string, uriKind: UriKind): boolean {
    let validUrl = require('valid-url');

    if (validUrl.isUri(uriString)) {
      return true;
    } else {
      return false;
    }
  }
}
