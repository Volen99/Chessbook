import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';

    export interface ITweetStream extends ITwitterStream
    {
        // Event informing that a tweet has been received.
        event EventHandler<TweetReceivedEventArgs> TweetReceived;

        // Start a stream SYNCHRONOUSLY. The thread will continue after the stream has stopped.
         StartAsync(url: string): Task<void>
    }
