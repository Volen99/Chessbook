import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-available
export interface IGetTrendsLocationParameters extends ICustomRequestParameters {
}

export class GetTrendsLocationParameters extends CustomRequestParameters implements IGetTrendsLocationParameters {
}
