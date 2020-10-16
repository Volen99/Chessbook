// Filter the tweets based on their creator.
// https://dev.twitter.com/streaming/overview/request-parameters#with
export enum WithFilterType {
  /// DEFAULT : User receives messages from himself and followers.
  /// (Twitter home timeline behavior)
  Followings,

  /// User receives messages that are related to himself exclusively.
  User
}
