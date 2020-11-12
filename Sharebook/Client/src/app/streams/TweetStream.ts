// import {ITweetStream} from "../core/Core/Streaming/ITweetStream";
// import {ITwitterClient} from "../core/Public/ITwitterClient";
// import {IStreamResultGenerator} from "../core/Core/Streaming/IStreamResultGenerator";
// import {ITwitterClientFactories} from "../core/Public/Client/Tools/ITwitterClientFactories";
// import {ICreateTweetStreamParameters} from "../core/Public/Parameters/StreamsClient/CreateTweetStreamParameters";
// import StringBuilder from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
// import {HttpMethod} from "../core/Public/Models/Enum/HttpMethod";
// import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
//
// export class TweetStream extends TwitterStream implements ITweetStream
//     {
//         private readonly _client: ITwitterClient;
//         private readonly _factories: ITwitterClientFactories;
//
//         public event EventHandler<TweetReceivedEventArgs> TweetReceived;
//         public override event EventHandler<StreamEventReceivedArgs> EventReceived;
//
//       constructor(
//         client: ITwitterClient,
//         streamResultGenerator: IStreamResultGenerator,
//         jsonObjectConverter: IJsonObjectConverter,
//         jObjectStaticWrapper: IJObjectStaticWrapper,
//         factories: ITwitterClientFactories,
//         createTweetStreamParameters: ICreateTweetStreamParameters) {
//         super(streamResultGenerator, jsonObjectConverter, jObjectStaticWrapper, createTweetStreamParameters);
//
//         this._client = client;
//         this._factories = factories;
//       }
//
//         public async  StartAsync(url: string): Promise<void>
//         {
//             ITwitterRequest createTwitterRequest()
//             {
//                 var queryBuilder = new StringBuilder(url);
//                 AddBaseParametersToQuery(queryBuilder);
//
//                 var request = this._client.createRequest();
//                 request.query.url = queryBuilder.ToString();
//                 request.query.httpMethod = HttpMethod.GET;
//                 return request;
//             }
//
//              onTweetReceived(json: string): void
//             {
//                 this.Raise(EventReceived, new StreamEventReceivedArgs(json));
//
//                 if (IsEvent(json))
//                 {
//                     TryInvokeGlobalStreamMessages(json);
//                     return;
//                 }
//
//                 var tweet = _factories.CreateTweet(json);
//                 if (tweet != null)
//                 {
//                     this.Raise(TweetReceived, new TweetReceivedEventArgs(tweet, json));
//                 }
//             }
//
//             await _streamResultGenerator.StartAsync(onTweetReceived, createTwitterRequest).ConfigureAwait(false);
//         }
//     }
