import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {SharebookLimits} from "../../Settings/SharebookLimits";

// For more information visit : https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/list-events
export interface IGetMessagesParameters extends ICursorQueryParameters {
}

export class GetMessagesParameters extends CursorQueryParameters implements IGetMessagesParameters {
  constructor(parameters?: IGetMessagesParameters) {
    if (parameters) {
      super(parameters);
    } else {
      super();

      super.pageSize = SharebookLimits.DEFAULTS.MESSAGES_GET_MAX_PAGE_SIZE;
    }
  }
}

// public GetMessagesParameters()
// {
//    PageSize = TwitterLimits.DEFAULTS.MESSAGES_GET_MAX_PAGE_SIZE;
// }
//
// public GetMessagesParameters(IGetMessagesParameters parameters) : base(parameters)
// {
//   if (parameters == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.MESSAGES_GET_MAX_PAGE_SIZE;
//   }
// }
