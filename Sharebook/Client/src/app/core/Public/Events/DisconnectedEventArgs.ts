import {IDisconnectMessage} from "../Streaming/Events/IDisconnectMessage";

// The stream was disconnected
export class DisconnectedEventArgs /*extends EventArgs*/ {
  constructor(disconnectMessage: IDisconnectMessage) {
    // super();

    this.DisconnectMessage = disconnectMessage;
  }

  public DisconnectMessage: IDisconnectMessage;
}
