export interface Hashtag {
  indices: Array<number>; // An array of integers indicating the offsets within the Tweet text where the hashtag begins and ends
  text: string; // Name of the hashtag, minus the leading ‘#’ character
}
