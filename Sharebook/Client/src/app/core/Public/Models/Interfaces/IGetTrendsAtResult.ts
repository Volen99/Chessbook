import {IWoeIdLocation} from "./IWoeIdLocation";
import {ITrend} from "./ITrend";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface IGetTrendsAtResult {
  asOf: DateTime; // DateTimeOffset;
  createdAt: DateTime; // DateTimeOffset;
  woeIdLocations: IWoeIdLocation[];
  trends: ITrend[];
}
