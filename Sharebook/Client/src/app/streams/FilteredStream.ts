// import {IStreamTrackManager} from "../core/Core/Streaming/IStreamTrackManager";
// import {ITweet} from "../core/Public/Models/Interfaces/ITweet";
// import {IFilteredStream} from "../core/Public/Streaming/IFilteredStream";
// import {ITwitterClientFactories} from "../core/Public/Client/Tools/ITwitterClientFactories";
// import {ITwitterClient} from "../core/Public/ITwitterClient";
// import {MatchOn} from '../core/Public/Streaming/MatchOn';
// import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
// import {Action} from "../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
// import {ILocation} from "../core/Public/Models/Interfaces/ILocation";
// import {IStreamResultGenerator} from "../core/Core/Streaming/IStreamResultGenerator";
// import {ICreateFilteredTweetStreamParameters} from "../core/Public/Parameters/StreamsClient/CreateFilteredStreamParameters";
// import StringBuilder from '../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder';
// import {StreamResources} from "./Properties/stream-resources";
// import {QueryGeneratorHelper} from "./Helpers/QueryGeneratorHelper";
// import {HttpMethod} from "../core/Public/Models/Enum/HttpMethod";
// import {IUserIdentifier} from "../core/Public/Models/Interfaces/IUserIdentifier";
// import Exception from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";
// import {ICoordinates} from "../core/Public/Models/Interfaces/ICoordinates";
//
// export class FilteredStream extends TrackedStream implements IFilteredStream {
//   private StreamTrackManager: IStreamTrackManager<ITweet>;  // { get; }
//   private readonly _client: ITwitterClient;
//   private readonly _filterStreamTweetMatcherFactory: IFilterStreamTweetMatcherFactory;
//   private readonly _factories: ITwitterClientFactories;
//
//   // Const
//   private static readonly MAXIMUM_TRACKED_LOCATIONS_AUTHORIZED: number = 25;
//   private static readonly MAXIMUM_TRACKED_USER_ID_AUTHORIZED: number = 5000;
//
//   // Filters
//   public MatchOn: MatchOn;
//   private _filterStreamTweetMatcher: IFilterStreamTweetMatcher;
//
//   // Properties
//   private readonly _followingUserIds: Dictionary<number, Action<ITweet>>;    // number?
//
//   get FollowingUserIds(): Dictionary<number, Action<ITweet>> {   // long?
//     return this._followingUserIds;
//   }
//
//   private readonly _locations: Dictionary<ILocation, Action<ITweet>>;
//
//   get Locations(): Dictionary<ILocation, Action<ITweet>> {
//     return this._locations;
//   }
//
//   // Constructor
//   constructor(
//     client: ITwitterClient,
//     streamTrackManager: IStreamTrackManager<ITweet>,
//     filterStreamTweetMatcherFactory: IFilterStreamTweetMatcherFactory,
//     jsonObjectConverter: IJsonObjectConverter,
//     jObjectStaticWrapper: IJObjectStaticWrapper,
//     streamResultGenerator: IStreamResultGenerator,
//     factories: ITwitterClientFactories,
//     createFilteredTweetStreamParameters: ICreateFilteredTweetStreamParameters) {
//     super(client, streamTrackManager, jsonObjectConverter, jObjectStaticWrapper, streamResultGenerator,
//       factories, createFilteredTweetStreamParameters);
//
//     this.StreamTrackManager = streamTrackManager;
//     this._client = client;
//     this._filterStreamTweetMatcherFactory = filterStreamTweetMatcherFactory;
//     this._factories = factories;
//
//     this._followingUserIds = new Dictionary<number, Action<ITweet>>();  // long?
//     this._locations = new Dictionary<ILocation, Action<ITweet>>();
//
//     MatchOn = MatchOn.Everything;
//   }
//
//         public async  StartMatchingAnyConditionAsync(): Promise<void>
//         {
//             _filterStreamTweetMatcher = _filterStreamTweetMatcherFactory.Create(StreamTrackManager, _locations, _followingUserIds);
//
//             ITwitterRequest CreateTwitterRequest()
//             {
//                 var queryBuilder = GenerateORFilterQuery();
//                 AddBaseParametersToQuery(queryBuilder);
//
//                 var request = _client.CreateRequest();
//                 request.Query.Url = queryBuilder.ToString();
//                 request.Query.HttpMethod = HttpMethod.POST;
//                 return request;
//             }
//
//              OnJsonReceived(json: string): void
//             {
//                 RaiseJsonObjectReceived(json);
//
//                 if (IsEvent(json))
//                 {
//                     TryInvokeGlobalStreamMessages(json);
//                     return;
//                 }
//
//                 var tweet = _factories.CreateTweet(json);
//
//                 var matchingTracksEvenArgs = _filterStreamTweetMatcher.GetMatchingTweetEventArgsAndRaiseMatchingElements(tweet, json, MatchOn);
//
//                 var matchingTracks = matchingTracksEvenArgs.MatchingTracks;
//                 var matchingLocations = matchingTracksEvenArgs.MatchingLocations;
//                 var matchingFollowers = matchingTracksEvenArgs.MatchingFollowers;
//
//                 var isTweetMatching = matchingTracks.Length != 0 || matchingLocations.Length != 0 || matchingFollowers.Length != 0;
//
//                 var quotedTweetMatchingTracks = matchingTracksEvenArgs.QuotedTweetMatchingTracks;
//                 var quotedTweetMatchingLocations = matchingTracksEvenArgs.QuotedTweetMatchingLocations;
//                 var quotedTweetMatchingFollowers = matchingTracksEvenArgs.QuotedTweetMatchingFollowers;
//
//                 var isQuotedTweetMatching = quotedTweetMatchingTracks.Length != 0 || quotedTweetMatchingLocations.Length != 0 || quotedTweetMatchingFollowers.Length != 0;
//
//                 var retweetMatchingTracks = matchingTracksEvenArgs.RetweetMatchingTracks;
//                 var retweetMatchingLocations = matchingTracksEvenArgs.RetweetMatchingLocations;
//                 var retweetMatchingFollowers = matchingTracksEvenArgs.RetweetMatchingFollowers;
//
//                 var isRetweetMatching = retweetMatchingTracks.Length != 0 || retweetMatchingLocations.Length != 0 || retweetMatchingFollowers.Length != 0;
//
//                 RaiseTweetReceived(matchingTracksEvenArgs);
//
//                 if (isTweetMatching || isQuotedTweetMatching || isRetweetMatching)
//                 {
//                     RaiseMatchingTweetReceived(matchingTracksEvenArgs);
//                 }
//                 else
//                 {
//                     RaiseNonMatchingTweetReceived(new TweetEventArgs(tweet, json));
//                 }
//             }
//
//             await _streamResultGenerator.StartAsync(OnJsonReceived, CreateTwitterRequest).ConfigureAwait(false);
//         }
//
//         public async  StartMatchingAllConditionsAsync(): Promise<void>
//         {
//             _filterStreamTweetMatcher = _filterStreamTweetMatcherFactory.Create(StreamTrackManager, _locations, _followingUserIds);
//
//             ITwitterRequest CreateTwitterRequest()
//             {
//                 var queryBuilder = GenerateANDFilterQuery();
//                 AddBaseParametersToQuery(queryBuilder);
//
//                 var twitterRequest = _client.CreateRequest();
//                 twitterRequest.Query.Url = queryBuilder.ToString();
//                 twitterRequest.Query.HttpMethod = HttpMethod.POST;
//                 return twitterRequest;
//             }
//
//              JsonReceived(json: string): void
//             {
//                 RaiseJsonObjectReceived(json);
//
//                 if (IsEvent(json))
//                 {
//                     TryInvokeGlobalStreamMessages(json);
//                     return;
//                 }
//
//                 var tweet = _factories.CreateTweet(json);
//
//                 var matchingTracksEvenArgs = _filterStreamTweetMatcher.GetMatchingTweetEventArgsAndRaiseMatchingElements(tweet, json, MatchOn);
//
//                 var matchingTracks = matchingTracksEvenArgs.MatchingTracks;
//                 var matchingLocations = matchingTracksEvenArgs.MatchingLocations;
//                 var matchingFollowers = matchingTracksEvenArgs.MatchingFollowers;
//
//                 var retweetMatchingTracks = matchingTracksEvenArgs.RetweetMatchingTracks;
//                 var retweetMatchingLocations = matchingTracksEvenArgs.RetweetMatchingLocations;
//                 var retweetMatchingFollowers = matchingTracksEvenArgs.RetweetMatchingFollowers;
//
//                 var quotedTweetMatchingTracks = matchingTracksEvenArgs.QuotedTweetMatchingTracks;
//                 var quotedTweetMatchingLocations = matchingTracksEvenArgs.QuotedTweetMatchingLocations;
//                 var quotedTweetMatchingFollowers = matchingTracksEvenArgs.QuotedTweetMatchingFollowers;
//
//                 RaiseTweetReceived(matchingTracksEvenArgs);
//
//                 if (DoestTheTweetMatchAllConditions(tweet, matchingTracks, matchingLocations, matchingFollowers) ||
//                     DoestTheTweetMatchAllConditions(tweet, retweetMatchingTracks, retweetMatchingLocations, retweetMatchingFollowers) ||
//                     DoestTheTweetMatchAllConditions(tweet, quotedTweetMatchingTracks, quotedTweetMatchingLocations, quotedTweetMatchingFollowers))
//                 {
//                     RaiseMatchingTweetReceived(matchingTracksEvenArgs);
//                 }
//                 else
//                 {
//                     RaiseNonMatchingTweetReceived(new TweetEventArgs(tweet, json));
//                 }
//             }
//
//             await _streamResultGenerator.StartAsync(JsonReceived, CreateTwitterRequest).ConfigureAwait(false);
//         }
//
//         public  CheckIfTweetMatchesStreamFilters(tweet: ITweet): MatchOn
//         {
//             return _filterStreamTweetMatcher.GetMatchingTweetEventArgsAndRaiseMatchingElements(tweet, null, MatchOn).MatchOn;
//         }
//
//         private  DoestTheTweetMatchAllConditions(tweet: ITweet, matchingTracks: string[], matchingLocations: ILocation[], matchingFollowers: number[]): boolean
//         {
//             if (tweet == null || tweet.createdBy.id == default)
//             {
//                 return false;
//             }
//
//             bool followMatches = FollowingUserIds.IsEmpty() || matchingFollowers.Any();
//             bool tracksMatches = Tracks.IsEmpty() || matchingTracks.Any();
//             bool locationMatches = Locations.IsEmpty() || matchingLocations.Any();
//
//             if (FollowingUserIds.Any())
//             {
//                 return followMatches && tracksMatches && locationMatches;
//             }
//
//             if (Tracks.Any())
//             {
//                 return tracksMatches && locationMatches;
//             }
//
//             if (Locations.Any())
//             {
//                 return locationMatches;
//             }
//
//             return true;
//         }
//
//         // #region Generate Query
//
//         private  GenerateORFilterQuery(): StringBuilder
//         {
//             var queryBuilder = new StringBuilder(StreamResources.Stream_Filter);
//
//             var followPostRequest = QueryGeneratorHelper.GenerateFilterFollowRequest(FollowingUserIds.Keys.ToList());
//             var trackPostRequest = QueryGeneratorHelper.GenerateFilterTrackRequest(Tracks.Keys.ToList());
//             var locationPostRequest = QueryGeneratorHelper.GenerateFilterLocationRequest(Locations.Keys.ToList());
//
//             if (!string.IsNullOrEmpty(trackPostRequest))
//             {
//                 queryBuilder.Append(trackPostRequest);
//             }
//
//             if (!string.IsNullOrEmpty(followPostRequest))
//             {
//                 queryBuilder.Append(queryBuilder.Length == 0 ? followPostRequest : string.Format("&{0}", followPostRequest));
//             }
//
//             if (!string.IsNullOrEmpty(locationPostRequest))
//             {
//                 queryBuilder.Append(queryBuilder.Length == 0 ? locationPostRequest : string.Format("&{0}", locationPostRequest));
//             }
//
//             return queryBuilder;
//         }
//
//         private  GenerateANDFilterQuery(): StringBuilder
//         {
//             var queryBuilder = new StringBuilder(StreamResources.Stream_Filter);
//
//             var followPostRequest = QueryGeneratorHelper.GenerateFilterFollowRequest(FollowingUserIds.Keys.ToList());
//             var trackPostRequest = QueryGeneratorHelper.GenerateFilterTrackRequest(Tracks.Keys.ToList());
//             var locationPostRequest = QueryGeneratorHelper.GenerateFilterLocationRequest(Locations.Keys.ToList());
//
//             if (!string.IsNullOrEmpty(followPostRequest))
//             {
//                 queryBuilder.Append(followPostRequest);
//             }
//             else if (!string.IsNullOrEmpty(trackPostRequest))
//             {
//                 queryBuilder.Append(trackPostRequest);
//             }
//             else if (!string.IsNullOrEmpty(locationPostRequest))
//             {
//                 queryBuilder.Append(locationPostRequest);
//             }
//
//             return queryBuilder;
//         }
//
//        // #endregion
//
//        // #region Follow
//
//         public  AddFollow(userId: number, userPublishedTweet: Action<ITweet> = null): void
//         {
//             if (userId > 0 && _followingUserIds.Count < MAXIMUM_TRACKED_USER_ID_AUTHORIZED)
//             {
//                 _followingUserIds.Add(userId, userPublishedTweet);
//             }
//         }
//
//         public  AddFollow(user: IUserIdentifier, userPublishedTweet: Action<ITweet> = null): void
//         {
//             if (user == null || user.id <= 0)
//             {
//                 throw new Exception("Follow parameter only accept user ids, user names cannot be used.");
//             }
//
//             AddFollow(user.id, userPublishedTweet);
//         }
//
//         public  RemoveFollow(userId: long): void
//         {
//             _followingUserIds.Remove(userId);
//         }
//
//         public  RemoveFollow(user: IUserIdentifier): void
//         {
//             if (user != null)
//             {
//                 RemoveFollow(user.id);
//             }
//         }
//
//         public  ContainsFollow(userId: long): boolean
//         {
//             return _followingUserIds.Keys.Contains(userId);
//         }
//
//         public  ContainsFollow(user: IUserIdentifier): boolean
//         {
//             if (user != null)
//             {
//                 return ContainsFollow(user.id);
//             }
//
//             return false;
//         }
//
//         public  ClearFollows(): void
//         {
//             _followingUserIds.Clear();
//         }
//
//         // #endregion
//
//         // #region Location
//
//         public  AddLocation(coordinate1: ICoordinates, coordinate2: ICoordinates, locationDetected: Action<ITweet> = null): ILocation
//         {
//             ILocation location = new Location(coordinate1, coordinate2);
//             AddLocation(location, locationDetected);
//
//             return location;
//         }
//
//         public  AddLocation(location: ILocation, locationDetected: Action<ITweet> = null): void
//         {
//             if (!ContainsLocation(location) && _locations.Count < MAXIMUM_TRACKED_LOCATIONS_AUTHORIZED)
//             {
//                 Locations.Add(location, locationDetected);
//             }
//         }
//
//         public  RemoveLocation(coordinate1: ICoordinates, coordinate2: ICoordinates): void
//         {
//             var location = Locations.Keys.FirstOrDefault(x => (x.Coordinate1 == coordinate1 && x.Coordinate2 == coordinate2) ||
//                                                               (x.Coordinate1 == coordinate2 && x.Coordinate2 == coordinate1));
//
//             if (location != null)
//             {
//                 Locations.Remove(location);
//             }
//         }
//
//         public  RemoveLocation(location: ILocation): void
//         {
//             RemoveLocation(location.coordinate1, location.coordinate2);
//         }
//
//         public  ContainsLocation(coordinate1: ICoordinates, coordinate2: ICoordinates): boolean
//         {
//             return Locations.Keys.Any(x => (x.Coordinate1 == coordinate1 && x.Coordinate2 == coordinate2) ||
//                                            (x.Coordinate1 == coordinate2 && x.Coordinate2 == coordinate1));
//         }
//
//         public  ContainsLocation(location: ILocation): boolean
//         {
//             return ContainsLocation(location.coordinate1, location.coordinate2);
//         }
//
//         public  ClearLocations(): void
//         {
//             Locations.Clear();
//         }
//
//        // #endregion
//     }
