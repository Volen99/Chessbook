// import {ISampleStream} from "../core/Public/Streaming/ISampleStream";
// import {ITwitterClient} from "../core/Public/ITwitterClient";
// import {IStreamResultGenerator} from "../core/Core/Streaming/IStreamResultGenerator";
// import {ITwitterClientFactories} from "../core/Public/Client/Tools/ITwitterClientFactories";
// import {ICreateSampleStreamParameters} from "../core/Public/Parameters/StreamsClient/CreateSampleStreamParameters";
// import {StreamResources} from "./Properties/stream-resources";
// import {TweetStream} from "./TweetStream";
//
// export class SampleStream extends TweetStream implements ISampleStream {
//   constructor(
//     twitterClient: ITwitterClient,
//     streamResultGenerator: IStreamResultGenerator,
//     jsonObjectConverter: IJsonObjectConverter,
//     jObjectStaticWrapper: IJObjectStaticWrapper,
//     factories: ITwitterClientFactories,
//     createSampleStreamParameters: ICreateSampleStreamParameters) {
//     super(twitterClient, streamResultGenerator, jsonObjectConverter,
//       jObjectStaticWrapper, factories, createSampleStreamParameters);
//   }
//
//         public async  StartAsync(): Promise<void>
//         {
//             await super.StartAsync(StreamResources.Stream_Sample).ConfigureAwait(false);
//         }
//     }
