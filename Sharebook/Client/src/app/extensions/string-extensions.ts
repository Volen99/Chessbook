import {HttpUtility} from "../core/Core/Helpers/HttpUtility";
import { ITweetTextParts } from '../core/Public/Models/Interfaces/ITweetTextParts';
import {TweetTextParts} from "../core/Core/Helpers/TweetTextParts";
import Regex, {Match, RegexOptions} from "typescript-dotnet-commonjs/System/Text/RegularExpressions";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";

const TWITTER_URL_REGEX: string =
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

let _linkParser: Regex = new Regex(TWITTER_URL_REGEX, RegexOptions.IGNORE_CASE);
let _httpUtility: HttpUtility = new HttpUtility();

declare global {
  interface String {
    addParameterToQuery(query: string, parameterName: string, parameterValue: string): string;

    last(s: string): string;

    regexFiltering(keywords: string[]): string;

    cleanForRegex(regexKeyword: string): string;

    cleanForRegexGroupName(groupName: string): string;

    replaceNonPrintableCharacters(s: string, replaceWith: string /*char*/): string;

    getURLParameter(this: string, parameterName: string): string;

    HTMLDecode(s: string): string;

    isMatchingJsonFormat(json: string): boolean;

    tweetParts(tweetText: string): ITweetTextParts;

    UTF32Length(this: string): number;
  }
}

String.prototype.addParameterToQuery = (query: string, parameterName: string, parameterValue: string): string => {
  if (!parameterName || !parameterValue) {
    return query;
  }

  if (query.includes("?") && query[query.length - 1] !== '?' && query[query.length - 1] !== '&') {
    query += "&";
  }

  if (!query.includes("?")) {
    query += "?";
  }

  query += `${parameterName}=${parameterValue}`;

  return query;
};

String.prototype.last = (s: string): string => {
  if (s.length === 0) {
    return undefined;
  }

  return s[s.length - 1];
};

// Create a filtering Regex for all the expected keywords and creates a Group that you can inspect to see if the
// specific keyword has been matched
String.prototype.regexFiltering = (keywords: string[]): string => {
  let patternBuilder: StringBuilder = new StringBuilder();
  for (let keywordPattern of keywords) {
    patternBuilder.append(`(?=.*(?<${0}>(?:^|\s+)${1}(?:\s+|$)))?`, String.prototype.cleanForRegexGroupName(keywordPattern), String.prototype.cleanForRegex(keywordPattern));
  }

  // Check the first group to analyze the result of the Regex :
  // MatchCollection matches = Regex.Matches(input, pattern, RegexOptions.IgnoreCase);
  // GroupCollection groups = matches[0].Groups;

  return patternBuilder.toString();
};

// Clean a keyword that you want to search with a regex
String.prototype.cleanForRegex = (regexKeyword: string): string => {
  return Regex.replace(regexKeyword, "[.^$*+?()[{\\|#]", (match) => `\\${match}`);
};

// Creates a groupName by replacing invalidCharacters with unique groupName
String.prototype.cleanForRegexGroupName = (groupName: string): string => {
  let res: string = Regex.replace(groupName, "^[^a-zA-Z]", (match) => `special${match.value[0] as unknown as number}`);
  return Regex.replace(res, "[^a-zA-Z0-9]", (match) => `special${match.value[0] as unknown as number}`);
};

// Give the ability to replace NonPrintableCharacters to another character
// This is very useful for streaming as we receive Tweets from around the world
// <param name="s">String to be updated</param>
// <param name="replaceWith">Character to replace by</param>
// <returns>String without any of the special characters</returns>
String.prototype.replaceNonPrintableCharacters = (s: string, replaceWith: string): string => {
  let result: StringBuilder = new StringBuilder();

  for (let i = 0; i < s.length; i++) {
    if (s[i].charCodeAt(0) > 51135) {
      result.append(replaceWith);
    } else {
      result.append(s[i]);
    }
  }

  return result.toString();
};

String.prototype.getURLParameter = function(parameterName: string): string {
  if (this == null) {
    return null;
  }

  let pattern = `${parameterName}=(?<parameter_value>[^&]*)`;
  let regex: Regex = new Regex(pattern);

  let urlInformation: Match = regex.match(this);

  if (!urlInformation.success) {
    return null;
  }

  return urlInformation.groups[`parameter_value`].value;
};

// Decode a string formatted to be used within a url
String.prototype.HTMLDecode = (s: string): string => {
  return _httpUtility.htmlDecode(s);
};

// String.prototype.isMatchingJsonFormat = function(json: string): boolean {
//   return json && json.length >= 2 && ((json[0] === '{' && json[json.length - 1] === '}') || (json[0] === '[' && json[json.length - 1] === ']'));
// };

// Returns the different parts of an Extended Tweet string.
String.prototype.tweetParts = (tweetText: string): ITweetTextParts => {
  return new TweetTextParts(tweetText);
};

// Get the UTF32 length of a string
String.prototype.UTF32Length = function(this: string): number {
  if (this == null) {
    return 0;
  }

  return this.length;       // new StringInfo(str).LengthInTextElements;
};

export {};
