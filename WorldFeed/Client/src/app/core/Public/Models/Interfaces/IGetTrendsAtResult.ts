import {IWoeIdLocation} from "./IWoeIdLocation";
import {ITrend} from "./ITrend";
import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface IGetTrendsAtResult {
  asOf: DateTime; // DateTimeOffset;
  createdAt: DateTime; // DateTimeOffset;
  woeIdLocations: IWoeIdLocation[];
  trends: ITrend[];
}
