// import {ITrackableStream} from "./ITrackableStream";
// import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
//
// export interface ITrackedStream extends ITwitterStream, ITrackableStream<ITweet>
//     {
//         // A tweet matching the specified filters has been received.
//         event EventHandler<MatchedTweetReceivedEventArgs> MatchingTweetReceived;
//
//         // A tweet has been received, regardless of the fact that is matching the specified criteria.
//         event EventHandler<MatchedTweetReceivedEventArgs> TweetReceived;
//
//         // A tweet has been received but it does not match all of the specified filters.
//         event EventHandler<TweetEventArgs> NonMatchingTweetReceived;
//
//         // Start a stream ASYNCHRONOUSLY. The task will complete when the stream stops.
//          StartAsync(url: string): Task<void>
//     }
// }
