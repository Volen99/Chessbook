export interface SymbolModel {
  // An array of integers indicating the offsets within the Tweet text where the symbol/cashtag begins and ends.
  // The first integer represents the location of the $ character in the Tweet text string. The second integer
  // represents the location of the first character after the cashtag. Therefore the difference between the two
  // numbers will be the length of the hashtag name plus one (for the ‘$’ character).
  indices: [];
  text: string; // Name of the cashhtag, minus the leading ‘$’ character: "text":"twtr"
}
