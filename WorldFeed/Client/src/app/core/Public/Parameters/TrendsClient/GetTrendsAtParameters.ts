import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

export enum GetTrendsExclude {
  Nothing,
  Hashtags
}

// For more information read : https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place
export interface IGetTrendsAtParameters extends ICustomRequestParameters {
  // The Yahoo! Where On Earth ID of the location to return trending information for.
  // Global information is available by using 1 as the WOEID .
  Woeid: number;

  // Setting this equal to hashtags will remove all hashtags from the trends list.
  Exclude?: GetTrendsExclude;
}

export class GetTrendsAtParameters extends CustomRequestParameters implements IGetTrendsAtParameters {
  constructor(woeid: number) {
    super();
    this.Woeid = woeid;
  }

  public Woeid: number;
  public Exclude?: GetTrendsExclude;
}
