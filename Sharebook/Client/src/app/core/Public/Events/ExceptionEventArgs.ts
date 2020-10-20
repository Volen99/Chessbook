import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";
import Exception from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exception';
import {IDisconnectMessage} from '../Streaming/Events/IDisconnectMessage';

// Event to inform that a stream has stopped.
export class StreamStoppedEventArgs extends EventArgs {
  constructor(ex?: Exception, disconnectMessage: IDisconnectMessage = null) {
    super();
    if (ex) {
      this.Exception = ex;
      this.DisconnectMessage = disconnectMessage;
    }
  }


  public Exception: Exception;
  public DisconnectMessage: IDisconnectMessage;
}

// public StreamStoppedEventArgs()
// {
// }
//
// public StreamStoppedEventArgs(Exception ex, IDisconnectMessage disconnectMessage = null)
// {
//     Exception = ex;
//     DisconnectMessage = disconnectMessage;
// }
