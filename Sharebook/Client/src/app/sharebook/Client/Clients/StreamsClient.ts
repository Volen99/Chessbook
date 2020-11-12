import {IStreamsClient} from 'src/app/core/Public/Client/Clients/IStreamsClient';
import {ICreateFilteredTweetStreamParameters} from "../../../core/Public/Parameters/StreamsClient/CreateFilteredStreamParameters";
import {ISampleStream} from "../../../core/Public/Streaming/ISampleStream";
import {ICreateSampleStreamParameters} from "../../../core/Public/Parameters/StreamsClient/CreateSampleStreamParameters";
import {ICreateTrackedTweetStreamParameters} from "../../../core/Public/Parameters/StreamsClient/CreateTrackedStreamParameters";
import {ICreateTweetStreamParameters} from "../../../core/Public/Parameters/StreamsClient/CreateTweetStreamParameters";

export class StreamsClient /* implements IStreamsClient */{
  // createFilteredStream(): IFilteredStream;
  // createFilteredStream(parameters: ICreateFilteredTweetStreamParameters): IFilteredStream;
  // createFilteredStream(parameters?: ICreateFilteredTweetStreamParameters): IFilteredStream {
  //   return undefined;
  // }
  //
  // createSampleStream(): ISampleStream;
  // createSampleStream(parameters: ICreateSampleStreamParameters): ISampleStream;
  // createSampleStream(parameters?: ICreateSampleStreamParameters): ISampleStream {
  //   return undefined;
  // }
  //
  // createTrackedTweetStream(): ITrackedStream;
  // createTrackedTweetStream(parameters: ICreateTrackedTweetStreamParameters): ITrackedStream;
  // createTrackedTweetStream(parameters?: ICreateTrackedTweetStreamParameters): ITrackedStream {
  //   return undefined;
  // }
  //
  // createTweetStream(): ITweetStream;
  // createTweetStream(parameters: ICreateTweetStreamParameters): ITweetStream;
  // createTweetStream(parameters?: ICreateTweetStreamParameters): ITweetStream {
  //   return undefined;
  // }
}

// @Injectable()
// export class StreamsClient implements IStreamsClient {
//   private readonly _client: ITwitterClient;
//   private readonly _sampleStreamFactory: IFactory<ISampleStream>;
//   private readonly _filteredStreamFactory: IFactory<IFilteredStream>;
//   private readonly _trackedStreamFactory: IFactory<ITrackedStream>;
//   private readonly _tweetStreamFactory: IFactory<ITweetStream>;
//
//   constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
//               @Inject() sampleStreamFactory: IFactory<ISampleStream>,
//               @Inject() filteredStreamFactory: IFactory<IFilteredStream>,
//               @Inject() trackedStreamFactory: IFactory<ITrackedStream>,
//               @Inject() tweetStreamFactory: IFactory<ITweetStream>) {
//     this._client = client;
//     this._sampleStreamFactory = sampleStreamFactory;
//     this._filteredStreamFactory = filteredStreamFactory;
//     this._trackedStreamFactory = trackedStreamFactory;
//     this._tweetStreamFactory = tweetStreamFactory;
//   }
//
//         public createSampleStream(): ISampleStream
//         {
//             return CreateSampleStream(new CreateSampleStreamParameters());
//         }
//
//         public  createSampleStream(parameters: ICreateSampleStreamParameters): ISampleStream
//         {
//             parameters ??= new CreateSampleStreamParameters();
//             let customRequestParameters = this._sampleStreamFactory.GenerateParameterOverrideWrapper("createSampleStreamParameters", parameters);
//             let stream = this._sampleStreamFactory.create(customRequestParameters);
//             stream.TweetMode = parameters.tweetMode ?? this._client.config.tweetMode;
//             return stream;
//         }
//
//         public createFilteredStream(): IFilteredStream
//         {
//             return CreateFilteredStream(new CreateFilteredTweetStreamParameters());
//         }
//
//         public  createFilteredStream(parameters: ICreateFilteredTweetStreamParameters): IFilteredStream
//         {
//             parameters ??= new CreateFilteredTweetStreamParameters();
//             let customRequestParameters = this._filteredStreamFactory.GenerateParameterOverrideWrapper("createFilteredTweetStreamParameters", parameters);
//             let stream = this._filteredStreamFactory.create(customRequestParameters);
//             stream.TweetMode = parameters.tweetMode ?? this._client.config.tweetMode;
//             return stream;
//         }
//
//         public  createTweetStream(): ITweetStream
//         {
//             return CreateTweetStream(new CreateTweetStreamParameters());
//         }
//
//         public  createTweetStream(parameters: ICreateTweetStreamParameters): ITweetStream
//         {
//             parameters ??= new CreateTweetStreamParameters();
//             let customRequestParameters = this._tweetStreamFactory.GenerateParameterOverrideWrapper("createTweetStreamParameters", parameters);
//             let stream = this._tweetStreamFactory.create(customRequestParameters);
//             stream.TweetMode = parameters.tweetMode ?? this._client.config.tweetMode;
//             return stream;
//         }
//
//         public  createTrackedTweetStream(): ITrackedStream
//         {
//             return CreateTrackedTweetStream(new CreateTrackedTweetStreamParameters());
//         }
//
//         public  createTrackedTweetStream(parameters: ICreateTrackedTweetStreamParameters): ITrackedStream
//         {
//             parameters ??= new CreateTrackedTweetStreamParameters();
//             let customRequestParameters = this._trackedStreamFactory.GenerateParameterOverrideWrapper("createTrackedTweetStreamParameters", parameters);
//             let stream = this._trackedStreamFactory.create(customRequestParameters);
//             stream.TweetMode = parameters.tweetMode ?? this._client.config.tweetMode;
//             return stream;
//         }
//     }
