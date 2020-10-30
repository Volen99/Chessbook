import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information read: https://developer.twitter.com/en/docs/geo/place-information/api-reference/get-geo-id-place_id
export interface IGetPlaceParameters extends ICustomRequestParameters {
  // A place in the world. These IDs can be retrieved from geo/reverse_geocode.
  placeId: string;
}

export class GetPlaceParameters extends CustomRequestParameters implements IGetPlaceParameters {
  constructor(placeId: string) {
    super();

    this.placeId = placeId;
  }

  public placeId: string;
}
