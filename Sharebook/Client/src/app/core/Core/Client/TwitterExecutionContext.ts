import {ISharebookSettings, SharebookSettings} from "../../Public/Settings/SharebookSettings";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterClientEvents} from "../Events/TweetinviGlobalEvents";
import InvalidOperationException from "typescript-dotnet-commonjs/System/Exceptions/InvalidOperationException";

export interface ITwitterExecutionContext extends ISharebookSettings {
  requestFactory: () => ITwitterRequest;
  events: ITwitterClientEvents;
}

export class TwitterExecutionContext extends SharebookSettings implements ITwitterExecutionContext {
  constructor(context?: ITwitterExecutionContext) {
    if (!context) {
      super();

      this.requestFactory = () => {
        throw new InvalidOperationException(`You cannot run contextual operations without configuring the ${`nameof(this.requestFactory)`} of the ExecutionContext`);
      };
    } else {
      super(context);

      this.requestFactory = context.requestFactory;
      this.events = context.events;
    }
  }

  public requestFactory: () => ITwitterRequest;
  public events: ITwitterClientEvents;
}
