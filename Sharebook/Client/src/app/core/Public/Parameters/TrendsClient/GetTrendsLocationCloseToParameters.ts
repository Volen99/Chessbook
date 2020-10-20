import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ICoordinates} from "../../Models/Interfaces/ICoordinates";
import {Coordinates} from '../../Models/Coordinates';
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information read : https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-closest
export interface IGetTrendsLocationCloseToParameters extends ICustomRequestParameters {
  // Coordinates from where to search trends
  coordinates: ICoordinates;
}

export class GetTrendsLocationCloseToParameters extends CustomRequestParameters implements IGetTrendsLocationCloseToParameters {

  constructor(latitudeOrCoordinates: number | ICoordinates, longitude?: number) {
    super();

    let coordinatesCurrent: ICoordinates;
    if (Type.isNumber(latitudeOrCoordinates)) {
      coordinatesCurrent = new Coordinates(latitudeOrCoordinates, longitude);
    } else {
      coordinatesCurrent = latitudeOrCoordinates;
    }

    this.coordinates = coordinatesCurrent;
  }

  public coordinates: ICoordinates;
}


// public GetTrendsLocationCloseToParameters(double latitude, double longitude) : this(new Coordinates(latitude, longitude))
// {
// }
//
// public GetTrendsLocationCloseToParameters(ICoordinates coordinates)
// {
//   Coordinates = coordinates;
// }
