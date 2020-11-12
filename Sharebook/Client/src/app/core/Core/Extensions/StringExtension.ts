import {SharebookConsts} from "../../Public/sharebook-consts";
import {HttpUtility} from "../Helpers/HttpUtility";
import Regex, {RegexOptions} from "typescript-dotnet-commonjs/System/Text/RegularExpressions";

// Extension methods on string classes
export abstract class StringExtension {
  private static readonly TWITTER_URL_REGEX: string =
    "(?<=^|\\s+)" +                                              // URL can be prefixed by space or start of line
    "\\b(?<start>http(?<isSecured>s?)://(?:www\\.)?|www\\.|)" +  // Start of an url
    "(?!www\\.)" +                                               // The first keyword cannot be www.
    "(?<firstPathElement>\\w+([\\w-]*\\w+)?\\.)" +               // first keyword required
    "(?<secondPathElement>\\w+[\\w-]*\\w+)\\w*?" +               // second keyword required
    "(?<multiplePathElements>(?:\\.\\w+[\\w-]*\\w+)*)" +         // potential sub-sites
    "?\\.{0}" +                                                  // . is forbidden at this stage
    "(?<specialChar>[/?])?" +                                    // is there a character specifying the url will be extended
    "(?(specialChar)" +                                          // has a specialChar been detected
    "(?:" +                                                      // if so
    "(?:(?:\\w|\\d)+)" +                                         // Get all the letters
    "(?:(?:\\p{P}|=)+)" +                                        // Followed by at least 1 or multiple punctuation (twitter behavior)
    ")*(?:(?:\\w|\\d)+))" +                                      // And the end should be a literal char
    "(?<lastChar>[/?])?";                                        // Or a '/';

  private static _linkParser: Regex;
  private static _httpUtility: HttpUtility = new HttpUtility();


  // Calculate the length of a string using Twitter algorithm
  // <returns>Size of the current Tweet</returns>
  // [Obsolete("The value returned are no longer correct as Twitter changed their counting algorithm. " +
  // "Please use twitter-text official implementations in the meantime (https://github.com/twitter/twitter-text).")]
  public static estimateTweetLength(tweet: string, willBePublishedWithMedia: boolean = false): number {
    if (tweet == null) {
      return 0;
    }

    // @ts-ignore
    let length: number = tweet.UTF32Length(); // UnicodeHelper.UTF32Length(tweet);

    for (let link/*: Match*/ of StringExtension.LinkParser.matches(tweet)) {
      // If an url ends with . and 2 followed chars twitter does not
      // consider it as an URL
      if (link.groups["start"].Value === SharebookConsts.EMPTY &&
        link.groups["multiplePathElements"].Value === SharebookConsts.EMPTY &&
        link.groups["secondPathElement"].Value.Length < 2 &&
        link.groups["specialChar"].Value === SharebookConsts.EMPTY &&
        link.groups["lastChar"].Value !== "/") {
        continue;
      }

      let isHttps = link.groups["isSecured"].Value === "s";
      let linkSize = isHttps ? SharebookConsts.HTTPS_LINK_SIZE : SharebookConsts.HTTP_LINK_SIZE;

      length = length - link.value.length + linkSize;
    }

    if (willBePublishedWithMedia) {
      length += SharebookConsts.MEDIA_CONTENT_SIZE;
    }

    return length;
  }

  public static isMatchingJsonFormat(json: string): boolean {
    return json && json.length >= 2 && ((json[0] === '{' && json[json.length - 1] === '}') || (json[0] === '[' && json[json.length - 1] === ']'));
  }

  /*// Create on demand
        private static Regex LinkParser
        {
            get
            {
                if (_linkParser == null)
                {
                    _linkParser = new Regex(TWITTER_URL_REGEX, RegexOptions.IgnoreCase);
                }

                return _linkParser;
            }
        }*/

  private static get LinkParser(): Regex {
    if (StringExtension._linkParser == null) {
      StringExtension._linkParser = new Regex(StringExtension.TWITTER_URL_REGEX, RegexOptions.IGNORE_CASE);
    }

    return StringExtension._linkParser;
  }
}
