import {ITweetinviSettings, SharebookSettings} from "../../Public/Settings/SharebookSettings";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import InvalidOperationException from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException";
import {ITwitterClientEvents} from "../Events/TweetinviGlobalEvents";

export interface ITwitterExecutionContext extends ITweetinviSettings {
  requestFactory: () => ITwitterRequest;
  container: ITweetinviContainer;
  events: ITwitterClientEvents;
}

export class TwitterExecutionContext extends SharebookSettings implements ITwitterExecutionContext {
  constructor(context?: ITwitterExecutionContext) {
    if (!context) {
      super();

      this.requestFactory = () => {
        throw new InvalidOperationException(`You cannot run contextual operations without configuring the ${nameof(this.requestFactory)} of the ExecutionContext`);
      };
    } else {
      super(context);

      this.requestFactory = context.requestFactory;
      this.container = context.container;
      this.events = context.events;
    }
  }

  public requestFactory: () => ITwitterRequest;
  public container: ITweetinviContainer;
  public events: ITwitterClientEvents;
}
