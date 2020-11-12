import {IWarningMessageFallingBehind} from "../Streaming/Events/IWarningMessageFallingBehind";

// Event informing that the processing of messages is too slow.
// <para>
// If you receive such message, please process the data received by the stream in another thread,
// or send the objects to a queue.
// </para>
export class WarningFallingBehindEventArgs /*extends EventArgs*/ {
  constructor(warningMessage: IWarningMessageFallingBehind) {
    // super();

    this.WarningMessage = warningMessage;
  }

  public WarningMessage: IWarningMessageFallingBehind;
}
