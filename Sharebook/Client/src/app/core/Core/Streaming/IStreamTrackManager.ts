import {Action} from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
import {ITrackManager} from "./ITrackManager";
import {ITrackStringAnalyzer} from "./IStringAnalyzer";

export interface IStreamTrackManager<T> extends ITrackManager<T>, ITrackStringAnalyzer {
  /// Collection of tracks and their related actions. An action is invoked if a track has been matched.
  GetMatchingTracksAndActions(inputs: string): Array<Tuple<string, (t: T) => void>>;
}
