import {IMinMaxQueryParameters, MinMaxQueryParameters} from "../query/min-max-query-parameters";

export interface ITimelineRequestParameters extends IMinMaxQueryParameters {
  // If set to true, the creator property (IUser) will only contain the id.
  trimUser: boolean | null;

  // Include tweet entities.
  includeEntities: boolean | null;
}

export abstract class TimelineRequestParameters extends MinMaxQueryParameters implements ITimelineRequestParameters {
  protected constructor() {
      super();
  }

  public trimUser: boolean | null;
  public includeEntities: boolean | null;
}
