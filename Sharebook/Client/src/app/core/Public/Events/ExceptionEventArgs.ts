import {IDisconnectMessage} from '../Streaming/Events/IDisconnectMessage';
import Exception from 'typescript-dotnet-commonjs/System/Exception';

// Event to inform that a stream has stopped.
export class StreamStoppedEventArgs /*extends EventArgs*/ {
  constructor(ex?: Exception, disconnectMessage: IDisconnectMessage = null) {
    // super();
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
