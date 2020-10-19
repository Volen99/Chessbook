import {ICustomRequestParameters} from "./CustomRequestParameters";

export interface IMessagesRetrieveRequestParametersBase extends ICustomRequestParameters {
  // Maximum number of messages to retrieve.
  maximumNumberOfMessagesToRetrieve: number;

  // Returns tweets with an ID greater than the specified value.
  sinceId: number;

  // Returns tweets with an ID lower than the specified value.
  maxId: number;

  // Include tweet entities.
  includeEntities: boolean;

  // Messages with more than 140 characters will be truncated if this value is set to false.
  fullText: boolean;
}
