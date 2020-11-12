
// Event to inform that the limit of tweets that can be received by the application has been reached.
export class LimitReachedEventArgs /*extends EventArgs*/ {
  constructor(numberOfTweetsNotReceived: number) {
    // super();

    this.numberOfTweetsNotReceived = numberOfTweetsNotReceived;
  }

  public numberOfTweetsNotReceived: number;
}
