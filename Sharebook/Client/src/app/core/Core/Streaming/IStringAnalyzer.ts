import List from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/List';

export interface ITrackStringAnalyzer {
  // Verify that the input matches one requirement
  Matches(input: string): boolean;

  // Verify that the input matches all requirements
  MatchesAll(input: string): boolean;

  /// <summary>
  /// Collection of chars[] (keywords) matched in the input.
  /// e.g. : 'linvi' matches 'hello linvi from tweetinvi'
  /// e.g. : 'linvi' matches 'hellolinvifromtweetinvi'
  /// </summary>
  GetMatchingCharacters(input: string): List<string>;

  /// <summary>
  /// Collection of tracked Keywords matched in the input
  /// e.g. : 'linvi' matches 'hello linvi from tweetinvi'
  /// e.g. : 'linvi' does not match 'hellolinvifromtweetinvi'
  /// </summary>
  GetMatchingTracks(input: string): List<string>;
}
