// import {ILocation} from "../core/Public/Models/Interfaces/ILocation";
// import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
// import {ITweet} from "../core/Public/Models/Interfaces/ITweet";
// import {IStreamTrackManager} from "../core/Core/Streaming/IStreamTrackManager";
// import {FilterStreamTweetMatcher, IFilterStreamTweetMatcher} from "./FilterStreamTweetMatcher";
// import {Action} from "../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
//
// export interface IFilterStreamTweetMatcherFactory {
//   Create(
//     streamTrackManager: IStreamTrackManager<ITweet>,
//     locations: Dictionary<ILocation, Action<ITweet>>,
//     followingUserIds: Dictionary<number, Action<ITweet>>): IFilterStreamTweetMatcher;  // long?
// }
//
// export class FilterStreamTweetMatcherFactory implements IFilterStreamTweetMatcherFactory {
//   Create(
//     streamTrackManager: IStreamTrackManager<ITweet>,
//     locations: Dictionary<ILocation, Action<ITweet>>,
//     followingUserIds: Dictionary<number, Action<ITweet>>): IFilterStreamTweetMatcher {    // long?
//     return new FilterStreamTweetMatcher(streamTrackManager, locations, followingUserIds);
//   }
// }
