import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";

// Event informing of operations being performed on a container lifecycle.
// <para>This is for advance use cases and debugging of the library</para>
export class TweetinviContainerEventArgs extends EventArgs {
  constructor(tweetinviContainer: ITweetinviContainer) {
    super();
    this.TweetinviContainer = tweetinviContainer;
  }

  public TweetinviContainer: ITweetinviContainer;
}
