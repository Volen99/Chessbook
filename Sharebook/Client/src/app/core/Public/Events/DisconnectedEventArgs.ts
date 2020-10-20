import {EventArgs} from 'src/app/c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs';

// The stream was disconnected
export class DisconnectedEventArgs extends EventArgs {
  constructor(disconnectMessage: IDisconnectMessage) {
    super();
    this.DisconnectMessage = disconnectMessage;
  }

  public DisconnectMessage: IDisconnectMessage;
}
