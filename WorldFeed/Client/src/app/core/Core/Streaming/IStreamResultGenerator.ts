
    import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
    import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
    import {Action, Func} from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
    import Exception from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";

    // Set of methods to extract objects from any kind of stream
    export interface IStreamResultGenerator
    {
        // The stream has started.
        event EventHandler StreamStarted;

        // The stream has resumed after being paused.
        event EventHandler StreamResumed;

        // The stream has paused.
        event EventHandler StreamPaused;

        // The stream has stopped. This can be due by an exception.
        // If it is the case the event args will contain the exception details.
        event EventHandler<StreamStoppedEventArgs> StreamStopped;

        // A keep-alive message has been received.
        // Twitter sends these every 30s so we know the stream's still working.
        event EventHandler KeepAliveReceived;

        // Get the current state of the stream analysis
      StreamState: StreamState

        // Start extracting objects from the stream
         StartAsync(onJsonReceivedCallback: Action<string>, createTwitterRequest: Func<ITwitterRequest>): Task<void>

        /// <summary>
        /// Start extracting objects from the stream
        /// </summary>
        /// <param name="onJsonReceivedCallback">Method to call foreach object</param>
        /// <param name="createTwitterRequest">Func to generate a request</param>
         StartAsync(onJsonReceivedCallback: Func<string, boolean>, createTwitterRequest: Func<ITwitterRequest>): Task<void>

        // Run the stream
         ResumeStream(): Task<void>

        // Pause the stream
         PauseStream(): Task<void>

        // Stop the stream
         StopStream(): Task<void>

        // Stop a stream an define which exception made it fail
         StopStream(exception: Exception, disconnectMessage: IDisconnectMessage): Task<void>
    }
}
