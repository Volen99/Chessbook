import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";

// https://dev.twitter.com/overview/api/entities-in-twitter-objects#symbols
export interface ISymbolEntity extends IEquatable<ISymbolEntity> {
  // Text containing the symbol
  // Name of the cashtag, minus the leading ‘$’ character: "text":"twtr"
  text: string;

  // The symbol text start and end position
  // An array of integers indicating the offsets within the Tweet text where the symbol/cashtag begins and ends.
  // The first integer represents the location of the $ character in the Tweet text string. The second integer
  // represents the location of the first character after the cashtag. Therefore the difference between the two
  // numbers will be the length of the hashtag name plus one (for the ‘$’ character).
  indices: number[];
}
