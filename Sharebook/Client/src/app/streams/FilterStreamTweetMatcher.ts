// import {ITweet} from "../core/Public/Models/Interfaces/ITweet";
// import {MatchOn} from "../core/Public/Streaming/MatchOn";
// import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
// import {ILocation} from "../core/Public/Models/Interfaces/ILocation";
// import {Action} from "../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
// import {IStreamTrackManager} from "../core/Core/Streaming/IStreamTrackManager";
// import {FilteredStreamMatcherConfig} from "./FilteredStreamMatcherConfig";
// import IEnumerable from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
// import KeyValuePair from "../c#-objects/TypeScript.NET-Core/packages/Core/source/KeyValuePair";
// import List from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/List";
// import {ICoordinates} from "../core/Public/Models/Interfaces/ICoordinates";
//
// export interface IFilterStreamTweetMatcher {
//   GetMatchingTweetEventArgsAndRaiseMatchingElements(tweet: ITweet, json: string, matchOn: MatchOn): MatchedTweetReceivedEventArgs
// }
//
// export class FilterStreamTweetMatcher implements IFilterStreamTweetMatcher {
//   private readonly _streamTrackManager: IStreamTrackManager<ITweet>;
//   private readonly _locations: Dictionary<ILocation, Action<ITweet>>;
//   private readonly _followingUserIds: Dictionary<number, Action<ITweet>>;    // long?
//
//   constructor(streamTrackManager: IStreamTrackManager<ITweet>, locations: Dictionary<ILocation, Action<ITweet>>,
//               followingUserIds: Dictionary<number, Action<ITweet>>)   // long?
//   {
//     this._streamTrackManager = streamTrackManager;
//     this._locations = locations;
//     this._followingUserIds = followingUserIds;
//   }
//
//   public GetMatchingTweetEventArgsAndRaiseMatchingElements(tweet: ITweet, json: string, matchOn: MatchOn): MatchedTweetReceivedEventArgs {
//     var result = new MatchedTweetReceivedEventArgs(tweet, json);
//
//     var trackMatcherConfig = new FilteredStreamMatcherConfig<string>(matchOn);
//     var locationMatcherConfig = new FilteredStreamMatcherConfig<ILocation>(matchOn);
//     var followersMatcherConfig = new FilteredStreamMatcherConfig<long>(matchOn);
//
//     UpdateMatchesBasedOnTweetText(tweet, trackMatcherConfig, result);
//     UpdateMatchesBasedOnUrlEntities(tweet, trackMatcherConfig, result);
//     UpdateMatchesBasedOnHashTagEntities(tweet, trackMatcherConfig, result);
//     UpdateMatchesBasedOnUserMentions(tweet, trackMatcherConfig, result);
//     UpdateMatchesBasedOnSymbols(tweet, trackMatcherConfig, result);
//     UpdateMatchesBasedOnTweetLocation(tweet, locationMatcherConfig, result);
//     UpdateMatchesBasedOnTweetCreator(tweet, followersMatcherConfig, result);
//     UpdateMatchesBasedOnTweetInReplyToUser(tweet, followersMatcherConfig, result);
//
//     result.MatchingTracks = trackMatcherConfig.TweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//     result.MatchingLocations = locationMatcherConfig.TweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//     result.MatchingFollowers = followersMatcherConfig.TweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//
//     result.RetweetMatchingTracks = trackMatcherConfig.RetweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//     result.RetweetMatchingLocations = locationMatcherConfig.RetweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//     result.RetweetMatchingFollowers = followersMatcherConfig.RetweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//
//     result.QuotedTweetMatchingTracks = trackMatcherConfig.QuotedTweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//     result.QuotedTweetMatchingLocations = locationMatcherConfig.QuotedTweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//     result.QuotedTweetMatchingFollowers = followersMatcherConfig.QuotedTweetMatchingTrackAndActions.Select(x => x.Key).ToArray();
//
//     CallMultipleActions(tweet, trackMatcherConfig.GetAllMatchingTracks().Select(x => x.Value));
//     CallMultipleActions(tweet, locationMatcherConfig.GetAllMatchingTracks().Select(x => x.Value));
//     CallMultipleActions(tweet, followersMatcherConfig.GetAllMatchingTracks().Select(x => x.Value));
//
//     return result;
//   }
//
//   // Update Event Args
//   private UpdateMatchesBasedOnTweetText(tweet: ITweet, config: FilteredStreamMatcherConfig<string>, result: MatchedTweetReceivedEventArgs): void {
//     if (config.MatchOn.HasFlag(MatchOn.Everything) ||
//       config.MatchOn.HasFlag(MatchOn.TweetText)) {
//       GetMatchingTracksInTweetText(tweet, config.TweetMatchingTrackAndActions, () => result.matchOn |= MatchOn.TweetText);
//
//       if (tweet.retweetedTweet != null) {
//         GetMatchingTracksInTweetText(tweet.retweetedTweet, config.RetweetMatchingTrackAndActions, () => result.retweetMatchOn |= MatchOn.TweetText);
//       }
//
//       if (tweet.quotedTweet != null) {
//         GetMatchingTracksInTweetText(tweet.quotedTweet, config.QuotedTweetMatchingTrackAndActions, () => result.quotedTweetMatchOn |= MatchOn.TweetText);
//       }
//     }
//   }
//
//   private GetMatchingTracksInTweetText(tweet: ITweet, matchingTrackAndActions: Dictionary<string, Action<ITweet>>, onTrackFound: Action): void {
//     var tracksMatchingTweetText = _streamTrackManager.GetMatchingTracksAndActions(tweet.fullText);
//     tracksMatchingTweetText.ForEach(x => {
//       matchingTrackAndActions.TryAdd(x.Item1, x.Item2);
//     });
//     if (tracksMatchingTweetText.Count > 0) {
//       onTrackFound();
//     }
//   }
//
//   private UpdateMatchesBasedOnUrlEntities(tweet: ITweet, config: FilteredStreamMatcherConfig<string>, result: MatchedTweetReceivedEventArgs): void {
//     if (config.MatchOn.HasFlag(MatchOn.Everything) ||
//       config.MatchOn.HasFlag(MatchOn.AllEntities) ||
//       config.MatchOn.HasFlag(MatchOn.URLEntities)) {
//       GetMatchingTracksInTweetUrls(tweet, config.TweetMatchingTrackAndActions, () => result.matchOn |= MatchOn.URLEntities);
//
//       if (tweet.retweetedTweet != null) {
//         GetMatchingTracksInTweetUrls(tweet.retweetedTweet, config.RetweetMatchingTrackAndActions, () => result.retweetMatchOn |= MatchOn.URLEntities);
//       }
//
//       if (tweet.quotedTweet != null) {
//         GetMatchingTracksInTweetUrls(tweet.quotedTweet, config.QuotedTweetMatchingTrackAndActions, () => result.quotedTweetMatchOn |= MatchOn.URLEntities);
//       }
//     }
//   }
//
//   private GetMatchingTracksInTweetUrls(
//     tweet: ITweet,
//     matchingTrackAndActions: Dictionary<string, Action<ITweet>>,
//     onTrackFound: Action): void {
//     var expandedUrls = tweet.entities.urls.Select(x => x.ExpandedURL);
//     expandedUrls = expandedUrls.Union(tweet.entities.medias.Select(x => x.ExpandedURL));
//     expandedUrls.ForEach(x => {
//       var tracksMatchingExpandedURL = _streamTrackManager.GetMatchingTracksAndActions(x);
//       tracksMatchingExpandedURL.ForEach(t => {
//         matchingTrackAndActions.TryAdd(t.Item1, t.Item2);
//       });
//       if (tracksMatchingExpandedURL.Count > 0) {
//         onTrackFound();
//       }
//     });
//
//     var displayedUrls = tweet.entities.urls.Select(x => x.DisplayedURL);
//             displayedUrls = displayedUrls.Union(tweet.entities.medias.Select(x => x.DisplayURL));
//             displayedUrls.ForEach(x =>
//             {
//                 var tracksMatchingDisplayedURL = _streamTrackManager.GetMatchingTracksAndActions(x);
//                 tracksMatchingDisplayedURL.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
//                 if (tracksMatchingDisplayedURL.Count > 0)
//                 {
//                     onTrackFound();
//                 }
//             });
//         }
//
//         private  UpdateMatchesBasedOnHashTagEntities(tweet: ITweet, config: FilteredStreamMatcherConfig<string>, result: MatchedTweetReceivedEventArgs): void
//         {
//             if (config.MatchOn.HasFlag(MatchOn.Everything) ||
//                 config.MatchOn.HasFlag(MatchOn.AllEntities) ||
//                 config.MatchOn.HasFlag(MatchOn.HashTagEntities))
//             {
//                 GetMatchingTracksInHashTags(tweet, config.TweetMatchingTrackAndActions, () => result.matchOn |= MatchOn.HashTagEntities);
//
//                 if (tweet.retweetedTweet != null)
//                 {
//                     GetMatchingTracksInHashTags(tweet.retweetedTweet, config.RetweetMatchingTrackAndActions, () => result.retweetMatchOn |= MatchOn.HashTagEntities);
//                 }
//
//                 if (tweet.quotedTweet != null)
//                 {
//                     GetMatchingTracksInHashTags(tweet.quotedTweet, config.QuotedTweetMatchingTrackAndActions, () => result.quotedTweetMatchOn |= MatchOn.HashTagEntities);
//                 }
//             }
//         }
//
//         private  GetMatchingTracksInHashTags(tweet: ITweet, matchingTrackAndActions: Dictionary<string, Action<ITweet>>, onTrackFound: Action): void
//         {
//             var hashTags = tweet.entities.hashtags.Select(x => x.Text);
//
//             hashTags.ForEach(hashtag =>
//             {
//                 var tracksMatchingHashTag = _streamTrackManager.GetMatchingTracksAndActions($"#{hashtag.ToLowerInvariant()}");
//                 tracksMatchingHashTag.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
//                 if (tracksMatchingHashTag.Count > 0)
//                 {
//                     onTrackFound();
//                 }
//             });
//         }
//
//         private  UpdateMatchesBasedOnUserMentions(tweet: ITweet, config: FilteredStreamMatcherConfig<string>, result: MatchedTweetReceivedEventArgs): void
//         {
//             if (config.MatchOn.HasFlag(MatchOn.Everything) ||
//                 config.MatchOn.HasFlag(MatchOn.AllEntities) ||
//                 config.MatchOn.HasFlag(MatchOn.UserMentionEntities))
//             {
//                 GetMatchingTracksInUserMentions(tweet, config.TweetMatchingTrackAndActions, () => result.matchOn |= MatchOn.UserMentionEntities);
//
//                 if (tweet.retweetedTweet != null)
//                 {
//                     GetMatchingTracksInUserMentions(tweet.retweetedTweet, config.RetweetMatchingTrackAndActions, () => result.retweetMatchOn |= MatchOn.UserMentionEntities);
//                 }
//
//                 if (tweet.quotedTweet != null)
//                 {
//                     GetMatchingTracksInUserMentions(tweet.quotedTweet, config.QuotedTweetMatchingTrackAndActions, () => result.quotedTweetMatchOn |= MatchOn.UserMentionEntities);
//                 }
//             }
//         }
//
//         private  GetMatchingTracksInUserMentions(tweet: ITweet, matchingTrackAndActions: Dictionary<string, Action<ITweet>>, onTrackFound: Action): void
//         {
//             var mentionsScreenName = tweet.entities.userMentions.Select(x => x.ScreenName);
//             mentionsScreenName.ForEach(username =>
//             {
//                 var tracksMatchingMentionScreenName = _streamTrackManager.GetMatchingTracksAndActions($"@{username.ToLowerInvariant()}");
//                 tracksMatchingMentionScreenName.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
//                 if (tracksMatchingMentionScreenName.Count > 0)
//                 {
//                     onTrackFound();
//                 }
//             });
//         }
//
//         private  UpdateMatchesBasedOnSymbols(tweet: ITweet, config: FilteredStreamMatcherConfig<string>, result: MatchedTweetReceivedEventArgs): void
//         {
//             if (config.MatchOn.HasFlag(MatchOn.Everything) ||
//                 config.MatchOn.HasFlag(MatchOn.AllEntities) ||
//                 config.MatchOn.HasFlag(MatchOn.SymbolEntities))
//             {
//                 GetMatchingTracksInSymbols(tweet, config.TweetMatchingTrackAndActions, () => result.matchOn |= MatchOn.SymbolEntities);
//
//                 if (tweet.retweetedTweet != null)
//                 {
//                     GetMatchingTracksInSymbols(tweet.retweetedTweet, config.RetweetMatchingTrackAndActions, () => result.retweetMatchOn |= MatchOn.SymbolEntities);
//                 }
//
//                 if (tweet.quotedTweet != null)
//                 {
//                     GetMatchingTracksInSymbols(tweet.quotedTweet, config.QuotedTweetMatchingTrackAndActions, () => result.quotedTweetMatchOn |= MatchOn.SymbolEntities);
//                 }
//             }
//         }
//
//         private  GetMatchingTracksInSymbols(tweet: ITweet, matchingTrackAndActions: Dictionary<string, Action<ITweet>>, onTrackFound: Action): void
//         {
//             var symbols = tweet.entities.symbols.Select(x => x.Text);
//             symbols.ForEach(symbol =>
//             {
//                 var tracksMatchingSymbol = _streamTrackManager.GetMatchingTracksAndActions($"${symbol.ToLowerInvariant()}");
//                 tracksMatchingSymbol.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
//                 if (tracksMatchingSymbol.Count > 0)
//                 {
//                     onTrackFound();
//                 }
//             });
//         }
//
//         private  UpdateMatchesBasedOnTweetLocation(tweet: ITweet, config: FilteredStreamMatcherConfig<ILocation>, result: MatchedTweetReceivedEventArgs): void
//         {
//             if (config.MatchOn.HasFlag(MatchOn.Everything) ||
//                 config.MatchOn.HasFlag(MatchOn.TweetLocation))
//             {
//                 GetMatchingLocations(tweet, config.TweetMatchingTrackAndActions, () => result.matchOn |= MatchOn.TweetLocation);
//
//                 if (tweet.retweetedTweet != null)
//                 {
//                     GetMatchingLocations(tweet.retweetedTweet, config.RetweetMatchingTrackAndActions, () => result.retweetMatchOn |= MatchOn.TweetLocation);
//                 }
//
//                 if (tweet.quotedTweet != null)
//                 {
//                     GetMatchingLocations(tweet.quotedTweet, config.QuotedTweetMatchingTrackAndActions, () => result.quotedTweetMatchOn |= MatchOn.TweetLocation);
//                 }
//             }
//         }
//
//         private  GetMatchingLocations(tweet: ITweet, matchingLocationAndActions: Dictionary<ILocation, Action<ITweet>>, onTrackFound: Action): void
//         {
//             var matchedLocations = GetMatchedLocations(tweet).ToArray();
//             matchedLocations.ForEach(x => { matchingLocationAndActions.TryAdd(x.Key, x.Value); });
//             if (matchedLocations.Length > 0)
//             {
//                 onTrackFound();
//             }
//         }
//
//         private  UpdateMatchesBasedOnTweetCreator(tweet: ITweet, config: FilteredStreamMatcherConfig<number>, result: MatchedTweetReceivedEventArgs):void
//         {
//             if (config.MatchOn.HasFlag(MatchOn.Everything) ||
//                 config.MatchOn.HasFlag(MatchOn.Follower))
//             {
//                 GetMatchingFollowersBasedOnTweetCreator(tweet, config.TweetMatchingTrackAndActions, () => result.matchOn |= MatchOn.Follower);
//
//                 if (tweet.retweetedTweet != null)
//                 {
//                     GetMatchingFollowersBasedOnTweetCreator(tweet.retweetedTweet, config.RetweetMatchingTrackAndActions, () => result.retweetMatchOn |= MatchOn.Follower);
//                 }
//
//                 if (tweet.quotedTweet != null)
//                 {
//                     GetMatchingFollowersBasedOnTweetCreator(tweet.quotedTweet, config.QuotedTweetMatchingTrackAndActions, () => result.quotedTweetMatchOn |= MatchOn.Follower);
//                 }
//             }
//         }
//
//         private  GetMatchingFollowersBasedOnTweetCreator(tweet: ITweet, matchingFollowersAndActions: Dictionary<number, Action<ITweet>>, onTrackFound: Action): void
//         {
//             var userId = tweet.createdBy?.id;
//             Action<ITweet> actionToExecuteWhenMatchingFollower;
//
//             if (userId != null && _followingUserIds.TryGetValue(userId, out actionToExecuteWhenMatchingFollower))
//             {
//                 matchingFollowersAndActions.TryAdd(userId.Value, actionToExecuteWhenMatchingFollower);
//                 onTrackFound();
//             }
//         }
//
//         private  UpdateMatchesBasedOnTweetInReplyToUser(tweet: ITweet, config: FilteredStreamMatcherConfig<number>, result: MatchedTweetReceivedEventArgs): void
//         {
//             if (config.MatchOn.HasFlag(MatchOn.Everything) ||
//                 config.MatchOn.HasFlag(MatchOn.FollowerInReplyTo))
//             {
//                 GetMatchingFollowersBasedOnTweetReply(tweet, config.TweetMatchingTrackAndActions, () => result.matchOn |= MatchOn.FollowerInReplyTo);
//
//                 if (tweet.retweetedTweet != null)
//                 {
//                     GetMatchingFollowersBasedOnTweetReply(tweet.retweetedTweet, config.RetweetMatchingTrackAndActions, () => result.retweetMatchOn |= MatchOn.FollowerInReplyTo);
//                 }
//
//                 if (tweet.quotedTweet != null)
//                 {
//                     GetMatchingFollowersBasedOnTweetReply(tweet.quotedTweet, config.QuotedTweetMatchingTrackAndActions, () => result.quotedTweetMatchOn |= MatchOn.FollowerInReplyTo);
//                 }
//             }
//         }
//
//         private  GetMatchingFollowersBasedOnTweetReply(tweet: ITweet, matchingFollowersAndActions: Dictionary<number, Action<ITweet>>, onFollowersFound: Action): void
//         {
//             var userId = tweet.inReplyToUserId;
//             Action<ITweet> actionToExecuteWhenMatchingFollower;
//
//             if (userId != null && _followingUserIds.TryGetValue(userId, out actionToExecuteWhenMatchingFollower))
//             {
//                 matchingFollowersAndActions.TryAdd(userId.Value, actionToExecuteWhenMatchingFollower);
//                 onFollowersFound();
//             }
//         }
//
//         // Matched Locations
//         private GetMatchedLocations(tweet: ITweet): IEnumerable<KeyValuePair<ILocation, Action<ITweet>>>
// {
//             var tweetCoordinates = tweet.coordinates;
//             if (tweetCoordinates != null)
//             {
//                 return GetMatchedLocations(tweetCoordinates);
//             }
//
//             var place = tweet.place;
//             var boundingBox = place?.boundingBox;
//
//             if (boundingBox != null)
//             {
//                 var placeCoordinates = boundingBox.coordinates;
//                 return GetMatchedLocations(placeCoordinates.ToArray());
//             }
//
//             return new List<KeyValuePair<ILocation, Action<ITweet>>>();
//         }
//
//         private GetMatchedLocations(coordinates: ICoordinates[]): IEnumerable<KeyValuePair<ILocation, Action<ITweet>>>
// {
//             var top = coordinates.Max(x => x.Latitude);
//             var left = coordinates.Min(x => x.Longitude);
//
//             var bottom = coordinates.Min(x => x.Latitude);
//             var right = coordinates.Max(x => x.Longitude);
//
//             var matchingLocations = new List<KeyValuePair<ILocation, Action<ITweet>>>();
//             foreach (var locationAndAction in _locations)
//             {
//                 var location = locationAndAction.Key;
//
//                 var filterTop = Math.Max(location.Coordinate1.Latitude, location.Coordinate2.Latitude);
//                 var filterLeft = Math.Min(location.Coordinate1.Longitude, location.Coordinate2.Longitude);
//
//                 var filterBottom = Math.Min(location.Coordinate1.Latitude, location.Coordinate2.Latitude);
//                 var filterRight = Math.Max(location.Coordinate1.Longitude, location.Coordinate2.Longitude);
//
//                 var isTweetOutsideOfLocationCoordinates = left > filterRight || right < filterLeft || top < filterBottom || bottom > filterTop;
//
//                 if (!isTweetOutsideOfLocationCoordinates)
//                 {
//                     matchingLocations.Add(locationAndAction);
//                 }
//             }
//
//             return matchingLocations;
//         }
//
//         private  GetMatchedLocations(coordinates: ICoordinates): IEnumerable<KeyValuePair<ILocation, Action<ITweet>>>
//         {
//             if (_locations.IsEmpty() || coordinates == null)
//             {
//                 return new List<KeyValuePair<ILocation, Action<ITweet>>>();
//             }
//
//             return _locations.Where(x => Location.CoordinatesLocatedIn(coordinates, x.Key)).ToList();
//         }
//
//
//         // Invoke callback actions
//         private  CallMultipleActions<T>(tweet: T, actions: IEnumerable<Action<T>>): void
//         {
//             if (actions != null)
//             {
//                 actions.ForEach(action =>
//                 {
//                     if (action != null)
//                     {
//                         action(tweet);
//                     }
//                 });
//             }
//         }
//     }
