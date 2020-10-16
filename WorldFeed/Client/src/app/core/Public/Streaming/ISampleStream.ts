import {ITwitterStream} from "../../Core/Streaming/ITwitterStream";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';

export interface ISampleStream extends ITwitterStream
    {
        // A tweet has been received.
        event EventHandler<TweetReceivedEventArgs> TweetReceived;

        // Start a stream ASYNCHRONOUSLY. The task will complete when the stream stops.
         StartAsync(): Task<void>
    }
