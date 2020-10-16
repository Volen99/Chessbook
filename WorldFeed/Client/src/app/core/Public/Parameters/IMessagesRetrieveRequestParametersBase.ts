import {ICustomRequestParameters} from "./CustomRequestParameters";

export interface IMessagesRetrieveRequestParametersBase extends ICustomRequestParameters {
  // Maximum number of messages to retrieve.
  MaximumNumberOfMessagesToRetrieve: number;

  // Returns tweets with an ID greater than the specified value.
  SinceId: number;

  // Returns tweets with an ID lower than the specified value.
  MaxId: number;

  // Include tweet entities.
  IncludeEntities: boolean;

  // Messages with more than 140 characters will be truncated if this value is set to false.
  FullText: boolean;
}
