import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";

// Event to inform that the limit of tweets that can be received by the application has been reached.
export class LimitReachedEventArgs extends EventArgs {
  constructor(numberOfTweetsNotReceived: number) {
    super();
    this.NumberOfTweetsNotReceived = numberOfTweetsNotReceived;
  }

  public NumberOfTweetsNotReceived: number;
}
