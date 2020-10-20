import StringBuilder from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder';
import {ILocation} from "../../core/Public/Models/Interfaces/ILocation";
import {SharebookConsts} from "../../core/Public/sharebook-consts";

export class QueryGeneratorHelper {
  public static GenerateFilterTrackRequest(tracks: Array<string>): string {
    if (!tracks) {
      return SharebookConsts.EMPTY;
    }
    let queryBuilder: StringBuilder = new StringBuilder();
    queryBuilder.append("track=");

    for (let i = 0; i < tracks.length - 1; ++i) {
      queryBuilder.append(`${tracks[i]}`);                 // queryBuilder.append(Uri.EscapeDataString(string.Format("{0},", tracks.ElementAt(i))));
    }

    queryBuilder.append(tracks[tracks.length - 1]);         // queryBuilder.append(Uri.EscapeDataString(tracks.ElementAt(tracks.count - 1)));

    return queryBuilder.toString();
  }

  public static GenerateFilterFollowRequest(followUserIds: Array<number>): string {
    if (!followUserIds) {
      return SharebookConsts.EMPTY;
    }

    let queryBuilder: StringBuilder = new StringBuilder();
    queryBuilder.append("follow=");
    for (let i = 0; i < followUserIds.length - 1; ++i) {
      queryBuilder.append(`${followUserIds[i]}`);             // queryBuilder.append(Uri.EscapeDataString(string.Format("{0},", followUserIds[i])));
    }

    queryBuilder.append(followUserIds[followUserIds.length - 1]);

    return queryBuilder.toString();
  }

  private static GenerateLocationParameters(location: ILocation, isLastLocation: boolean): string {
    let maxLongitude = Math.max(location.coordinate1.longitude, location.coordinate2.longitude);
    let maxLatitude = Math.max(location.coordinate1.latitude, location.coordinate2.latitude);

    let minLongitude = Math.min(location.coordinate1.longitude, location.coordinate2.longitude);
    let minLatitude = Math.min(location.coordinate1.latitude, location.coordinate2.latitude);

    return `
    ${minLongitude.toString(CultureInfo.InvariantCulture)},
    ${minLatitude.toString(CultureInfo.InvariantCulture)},
    ${maxLongitude.toString(CultureInfo.InvariantCulture)},
    ${maxLatitude.toString(CultureInfo.InvariantCulture)}
    ${isLastLocation ? "" : ","}`;
  }

  public static GenerateFilterLocationRequest(locations: Array<ILocation>): string {
    if (!locations) {
      return SharebookConsts.EMPTY;
    }

    let queryBuilder: StringBuilder = new StringBuilder();
    // queryBuilder.Append("locations=");
    for (let i = 0; i < locations.length - 1; ++i) {
      queryBuilder.append(QueryGeneratorHelper.GenerateLocationParameters(locations[i], false));
    }

    queryBuilder.append(QueryGeneratorHelper.GenerateLocationParameters(locations[locations.length - 1], true));

    return `locations=${queryBuilder.toString().urlEncode()}`;     // string.Format("locations={0}", StringFormater.UrlEncode(queryBuilder.toString()));
  }
}
