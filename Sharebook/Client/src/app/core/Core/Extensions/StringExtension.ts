import {UnicodeHelper} from "../Helpers/UnicodeHelper";
import {Match} from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/RegularExpressions";
import {SharebookConsts} from "../../Public/sharebook-consts";

// Extension methods on string classes
export abstract class StringExtension {
  // Calculate the length of a string using Twitter algorithm
  // <returns>Size of the current Tweet</returns>
  // [Obsolete("The value returned are no longer correct as Twitter changed their counting algorithm. " +
  // "Please use twitter-text official implementations in the meantime (https://github.com/twitter/twitter-text).")]
  public static estimateTweetLength(tweet: string, willBePublishedWithMedia: boolean = false): number {
    if (tweet == null) {
      return 0;
    }

    let length: number = tweet.UTF32Length(); // UnicodeHelper.UTF32Length(tweet);

    for (let link: Match of LinkParser.Matches(tweet)) {
      // If an url ends with . and 2 followed chars twitter does not
      // consider it as an URL
      if (link.Groups["start"].Value === SharebookConsts.EMPTY &&
        link.Groups["multiplePathElements"].Value === SharebookConsts.EMPTY &&
        link.Groups["secondPathElement"].Value.Length < 2 &&
        link.Groups["specialChar"].Value === SharebookConsts.EMPTY &&
        link.Groups["lastChar"].Value !== "/") {
        continue;
      }

      let isHttps = link.Groups["isSecured"].Value === "s";
      let linkSize = isHttps ? SharebookConsts.HTTPS_LINK_SIZE : SharebookConsts.HTTP_LINK_SIZE;

      length = length - link.Value.Length + linkSize;
    }

    if (willBePublishedWithMedia) {
      length += SharebookConsts.MEDIA_CONTENT_SIZE;
    }

    return length;
  }
}
