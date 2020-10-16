export interface ITrend {
  // Name/Title of the trend.
  name: string;

  // Search URL returning the tweets related with this trend.
  URL: string;

  // Only the query part of the search URL.
  query: string;

  // TODO : ADD THE FIELD DESCRIPTION
  promotedContent: string;

  // Number of tweet matching the trend that have been posted for the last 24 hours.
  tweetVolume?: number;
}
