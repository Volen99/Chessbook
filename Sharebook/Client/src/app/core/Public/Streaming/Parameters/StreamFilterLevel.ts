// Level you want to use to filter tweets containing violence, sex or any sensible subjects.
// None meaning that you accept ALL the tweets.
// https://dev.twitter.com/streaming/overview/request-parameters#filter_level
export enum StreamFilterLevel {
  None,
  Low,
  Medium
}
