﻿namespace WorldFeed.Streams
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Streaming.Enums;
    using WorldFeed.Common.Streaming;

    public interface IFilterStreamTweetMatcher
    {
        MatchedTweetReceivedEventArgs GetMatchingTweetEventArgsAndRaiseMatchingElements(ITweet tweet, string json, MatchOn matchOn);
    }

    public class FilterStreamTweetMatcher : IFilterStreamTweetMatcher
    {
        private readonly IStreamTrackManager<ITweet> streamTrackManager;
        private readonly Dictionary<ILocation, Action<ITweet>> locations;
        private readonly Dictionary<long?, Action<ITweet>> followingUserIds;

        public FilterStreamTweetMatcher(IStreamTrackManager<ITweet> streamTrackManager, Dictionary<ILocation, Action<ITweet>> locations,
            Dictionary<long?, Action<ITweet>> followingUserIds)
        {
            this.streamTrackManager = streamTrackManager;
            this.locations = locations;
            this.followingUserIds = followingUserIds;
        }

        public MatchedTweetReceivedEventArgs GetMatchingTweetEventArgsAndRaiseMatchingElements(ITweet tweet, string json, MatchOn matchOn)
        {
            var matchingTracksEventArgs = new MatchedTweetReceivedEventArgs(tweet, json);

            var matchingTrackAndActions = new Dictionary<string, Action<ITweet>>();
            var matchingLocationsAndActions = new Dictionary<ILocation, Action<ITweet>>();
            var matchingFollowersAndActions = new Dictionary<long, Action<ITweet>>();

            var matchingQuotedTrackAndActions = new Dictionary<string, Action<ITweet>>();
            var matchingQuotedLocationsAndActions = new Dictionary<ILocation, Action<ITweet>>();
            var matchingQuotedFollowersAndActions = new Dictionary<long, Action<ITweet>>();

            UpdateMatchesBasedOnTweetText(tweet, matchOn, matchingTrackAndActions, matchingTracksEventArgs, matchingQuotedTrackAndActions);
            UpdateMatchesBasedOnUrlEntities(tweet, matchOn, matchingTrackAndActions, matchingTracksEventArgs, matchingQuotedTrackAndActions);
            UpdateMatchesBasedOnHashTagEntities(tweet, matchOn, matchingTrackAndActions, matchingTracksEventArgs, matchingQuotedTrackAndActions);
            UpdateMatchesBasedOnUserMentions(tweet, matchOn, matchingTrackAndActions, matchingTracksEventArgs, matchingQuotedTrackAndActions);
            UpdateMatchesBasedOnSymbols(tweet, matchOn, matchingTrackAndActions, matchingTracksEventArgs, matchingQuotedTrackAndActions);
            UpdateMatchesBasedOnTweetLocation(tweet, matchOn, matchingLocationsAndActions, matchingTracksEventArgs, matchingQuotedLocationsAndActions);
            UpdateMatchesBasedOnTweetCreator(tweet, matchOn, matchingFollowersAndActions, matchingTracksEventArgs, matchingQuotedFollowersAndActions);
            UpdateMatchesBasedOnTweetInReplyToUser(tweet, matchOn, matchingFollowersAndActions, matchingTracksEventArgs, matchingQuotedFollowersAndActions);

            var matchingTracks = matchingTrackAndActions.Select(x => x.Key).ToArray();
            var matchingLocations = matchingLocationsAndActions.Select(x => x.Key).ToArray();
            var matchingFollowers = matchingFollowersAndActions.Select(x => x.Key).ToArray();

            matchingTracksEventArgs.MatchingTracks = matchingTracks;
            matchingTracksEventArgs.MatchingLocations = matchingLocations;
            matchingTracksEventArgs.MatchingFollowers = matchingFollowers;

            var matchingQuotedTracks = matchingQuotedTrackAndActions.Select(x => x.Key).ToArray();
            var matchingQuotedLocations = matchingQuotedLocationsAndActions.Select(x => x.Key).ToArray();
            var matchingQuotedFollowers = matchingQuotedFollowersAndActions.Select(x => x.Key).ToArray();

            matchingTracksEventArgs.QuotedTweetMatchingTracks = matchingQuotedTracks;
            matchingTracksEventArgs.QuotedTweetMatchingLocations = matchingQuotedLocations;
            matchingTracksEventArgs.QuotedTweetMatchingFollowers = matchingQuotedFollowers;

            var allMatchingTracks = matchingTrackAndActions.MergeWith(matchingQuotedTrackAndActions);
            var allMatchingLocations = matchingLocationsAndActions.MergeWith(matchingQuotedLocationsAndActions);
            var allMatchingFollowers = matchingFollowersAndActions.MergeWith(matchingQuotedFollowersAndActions);

            CallMultipleActions(tweet, allMatchingTracks.Select(x => x.Value));
            CallMultipleActions(tweet, allMatchingLocations.Select(x => x.Value));
            CallMultipleActions(tweet, allMatchingFollowers.Select(x => x.Value));

            return matchingTracksEventArgs;
        }

        // Update Event Args
        private void UpdateMatchesBasedOnTweetText(ITweet tweet, MatchOn matchOn, Dictionary<string, Action<ITweet>> matchingTrackAndActions,
            MatchedTweetReceivedEventArgs matchingTracksEventArgs, Dictionary<string, Action<ITweet>> matchingQuotedTrackAndActions)
        {
            if (matchOn.HasFlag(MatchOn.Everything) ||
                matchOn.HasFlag(MatchOn.TweetText))
            {
                var tracksMatchingTweetText = this.streamTrackManager.GetMatchingTracksAndActions(tweet.FullText);
                tracksMatchingTweetText.ForEach(x => { matchingTrackAndActions.TryAdd(x.Item1, x.Item2); });
                if (tracksMatchingTweetText.Count > 0)
                {
                    matchingTracksEventArgs.MatchOn |= MatchOn.TweetText;
                }

                if (tweet.QuotedTweet != null)
                {
                    var tracksMatchingQuotedTweetText = this.streamTrackManager.GetMatchingTracksAndActions(tweet.QuotedTweet.FullText);
                    tracksMatchingQuotedTweetText.ForEach(x => { matchingQuotedTrackAndActions.TryAdd(x.Item1, x.Item2); });
                    if (tracksMatchingQuotedTweetText.Count > 0)
                    {
                        matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.TweetText;
                    }
                }
            }
        }

        private void UpdateMatchesBasedOnUrlEntities(
            ITweet tweet,
            MatchOn matchOn,
            Dictionary<string, Action<ITweet>> matchingTrackAndActions,
            MatchedTweetReceivedEventArgs matchingTracksEventArgs,
            Dictionary<string, Action<ITweet>> matchingQuotedTrackAndActions)
        {
            if (matchOn.HasFlag(MatchOn.Everything) ||
                matchOn.HasFlag(MatchOn.AllEntities) ||
                matchOn.HasFlag(MatchOn.URLEntities))
            {
                var expandedUrls = tweet.Entities.Urls.Select(x => x.ExpandedURL);
                expandedUrls = expandedUrls.Union(tweet.Entities.Medias.Select(x => x.ExpandedURL));
                expandedUrls.ForEach(x =>
                {
                    var tracksMatchingExpandedURL = this.streamTrackManager.GetMatchingTracksAndActions(x);
                    tracksMatchingExpandedURL.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
                    if (tracksMatchingExpandedURL.Count > 0)
                    {
                        matchingTracksEventArgs.MatchOn |= MatchOn.URLEntities;
                    }
                });

                var displayedUrls = tweet.Entities.Urls.Select(x => x.DisplayedURL);
                displayedUrls = displayedUrls.Union(tweet.Entities.Medias.Select(x => x.DisplayURL));
                displayedUrls.ForEach(x =>
                {
                    var tracksMatchingDisplayedURL = this.streamTrackManager.GetMatchingTracksAndActions(x);
                    tracksMatchingDisplayedURL.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
                    if (tracksMatchingDisplayedURL.Count > 0)
                    {
                        matchingTracksEventArgs.MatchOn |= MatchOn.URLEntities;
                    }
                });

                if (tweet.QuotedTweet != null)
                {
                    var quotedTweetExpandedUrls = tweet.QuotedTweet.Entities.Urls.Select(x => x.ExpandedURL);
                    quotedTweetExpandedUrls = quotedTweetExpandedUrls.Union(tweet.QuotedTweet.Entities.Medias.Select(x => x.ExpandedURL));
                    quotedTweetExpandedUrls.ForEach(x =>
                    {
                        var tracksMatchingExpandedURL = this.streamTrackManager.GetMatchingTracksAndActions(x);
                        tracksMatchingExpandedURL.ForEach(t => { matchingQuotedTrackAndActions.TryAdd(t.Item1, t.Item2); });
                        if (tracksMatchingExpandedURL.Count > 0)
                        {
                            matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.URLEntities;
                        }
                    });

                    var quotedTweetDisplayedUrls = tweet.QuotedTweet.Entities.Urls.Select(x => x.DisplayedURL);
                    quotedTweetDisplayedUrls = quotedTweetDisplayedUrls.Union(tweet.QuotedTweet.Entities.Medias.Select(x => x.DisplayURL));
                    quotedTweetDisplayedUrls.ForEach(x =>
                    {
                        var tracksMatchingDisplayedURL = this.streamTrackManager.GetMatchingTracksAndActions(x);
                        tracksMatchingDisplayedURL.ForEach(t => { matchingQuotedTrackAndActions.TryAdd(t.Item1, t.Item2); });
                        if (tracksMatchingDisplayedURL.Count > 0)
                        {
                            matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.URLEntities;
                        }
                    });
                }
            }
        }

        private void UpdateMatchesBasedOnHashTagEntities(ITweet tweet, MatchOn matchOn, Dictionary<string, Action<ITweet>> matchingTrackAndActions,
           MatchedTweetReceivedEventArgs matchingTracksEventArgs, Dictionary<string, Action<ITweet>> matchingQuotedTrackAndActions)
        {
            if (matchOn.HasFlag(MatchOn.Everything) ||
                matchOn.HasFlag(MatchOn.AllEntities) ||
                matchOn.HasFlag(MatchOn.HashTagEntities))
            {
                var hashTags = tweet.Entities.Hashtags.Select(x => x.Text);

                hashTags.ForEach(hashtag =>
                {
                    var tracksMatchingHashTag = this.streamTrackManager.GetMatchingTracksAndActions($"#{hashtag}");
                    tracksMatchingHashTag.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
                    if (tracksMatchingHashTag.Count > 0)
                    {
                        matchingTracksEventArgs.MatchOn |= MatchOn.HashTagEntities;
                    }
                });

                if (tweet.QuotedTweet != null)
                {
                    var quotedHashTags = tweet.QuotedTweet.Entities.Hashtags.Select(x => x.Text);

                    quotedHashTags.ForEach(hashtag =>
                    {
                        var tracksMatchingHashTag = this.streamTrackManager.GetMatchingTracksAndActions($"#{hashtag}");
                        tracksMatchingHashTag.ForEach(t => { matchingQuotedTrackAndActions.TryAdd(t.Item1, t.Item2); });
                        if (tracksMatchingHashTag.Count > 0)
                        {
                            matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.HashTagEntities;
                        }
                    });
                }
            }
        }

        private void UpdateMatchesBasedOnUserMentions(ITweet tweet, MatchOn matchOn, Dictionary<string, Action<ITweet>> matchingTrackAndActions,
           MatchedTweetReceivedEventArgs matchingTracksEventArgs, Dictionary<string, Action<ITweet>> matchingQuotedTrackAndActions)
        {
            if (matchOn.HasFlag(MatchOn.Everything) ||
                matchOn.HasFlag(MatchOn.AllEntities) ||
                matchOn.HasFlag(MatchOn.UserMentionEntities))
            {
                var mentionsScreenName = tweet.Entities.UserMentions.Select(x => x.ScreenName);
                mentionsScreenName.ForEach(username =>
                {
                    var tracksMatchingMentionScreenName = this.streamTrackManager.GetMatchingTracksAndActions($"@{username}");
                    tracksMatchingMentionScreenName.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
                    if (tracksMatchingMentionScreenName.Count > 0)
                    {
                        matchingTracksEventArgs.MatchOn |= MatchOn.UserMentionEntities;
                    }
                });

                if (tweet.QuotedTweet != null)
                {
                    var quotedMentionsScreenName = tweet.QuotedTweet.Entities.UserMentions.Select(x => x.ScreenName);
                    quotedMentionsScreenName.ForEach(username =>
                    {
                        var tracksMatchingMentionScreenName = this.streamTrackManager.GetMatchingTracksAndActions($"@{username}");
                        tracksMatchingMentionScreenName.ForEach(t => { matchingQuotedTrackAndActions.TryAdd(t.Item1, t.Item2); });
                        if (tracksMatchingMentionScreenName.Count > 0)
                        {
                            matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.UserMentionEntities;
                        }
                    });
                }
            }
        }

        private void UpdateMatchesBasedOnSymbols(ITweet tweet, MatchOn matchOn, Dictionary<string, Action<ITweet>> matchingTrackAndActions,
            MatchedTweetReceivedEventArgs matchingTracksEventArgs, Dictionary<string, Action<ITweet>> matchingQuotedTrackAndActions)
        {
            if (matchOn.HasFlag(MatchOn.Everything) ||  matchOn.HasFlag(MatchOn.AllEntities) || matchOn.HasFlag(MatchOn.SymbolEntities))
            {
                var symbols = tweet.Entities.Symbols.Select(x => x.Text);
                symbols.ForEach(symbol =>
                {
                    var tracksMatchingSymbol = this.streamTrackManager.GetMatchingTracksAndActions($"${symbol}");
                    tracksMatchingSymbol.ForEach(t => { matchingTrackAndActions.TryAdd(t.Item1, t.Item2); });
                    if (tracksMatchingSymbol.Count > 0)
                    {
                        matchingTracksEventArgs.MatchOn |= MatchOn.SymbolEntities;
                    }
                });

                if (tweet.QuotedTweet != null)
                {
                    var quotedSymbols = tweet.QuotedTweet.Entities.Symbols.Select(x => x.Text);
                    quotedSymbols.ForEach(symbol =>
                    {
                        var tracksMatchingSymbol = this.streamTrackManager.GetMatchingTracksAndActions($"${symbol}");
                        tracksMatchingSymbol.ForEach(t => { matchingQuotedTrackAndActions.TryAdd(t.Item1, t.Item2); });
                        if (tracksMatchingSymbol.Count > 0)
                        {
                            matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.SymbolEntities;
                        }
                    });
                }
            }
        }

        private void UpdateMatchesBasedOnTweetLocation(ITweet tweet, MatchOn matchOn, Dictionary<ILocation, Action<ITweet>> matchingLocationAndActions,
            MatchedTweetReceivedEventArgs matchingTracksEventArgs, Dictionary<ILocation, Action<ITweet>> matchingQuotedLocationAndActions)
        {
            if (matchOn.HasFlag(MatchOn.Everything) ||
                matchOn.HasFlag(MatchOn.TweetLocation))
            {
                var matchedLocations = GetMatchedLocations(tweet).ToArray();
                matchedLocations.ForEach(x => { matchingLocationAndActions.TryAdd(x.Key, x.Value); });
                if (matchedLocations.Length > 0)
                {
                    matchingTracksEventArgs.MatchOn |= MatchOn.TweetLocation;
                }

                if (tweet.QuotedTweet != null)
                {
                    var quotedMatchedLocations = GetMatchedLocations(tweet.QuotedTweet).ToArray();
                    quotedMatchedLocations.ForEach(x => { matchingQuotedLocationAndActions.TryAdd(x.Key, x.Value); });
                    if (quotedMatchedLocations.Length > 0)
                    {
                        matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.TweetLocation;
                    }
                }
            }
        }

        private void UpdateMatchesBasedOnTweetCreator(ITweet tweet, MatchOn matchOn, Dictionary<long, Action<ITweet>> matchingFollowersAndActions,
           MatchedTweetReceivedEventArgs matchingTracksEventArgs, Dictionary<long, Action<ITweet>> matchingQuotedFollowersAndActions)
        {
            if (matchOn.HasFlag(MatchOn.Everything) ||
                matchOn.HasFlag(MatchOn.Follower))
            {
                var userId = tweet.CreatedBy?.Id;
                Action<ITweet> actionToExecuteWhenMatchingFollower;

                if (userId != null && this.followingUserIds.TryGetValue(userId, out actionToExecuteWhenMatchingFollower))
                {
                    matchingFollowersAndActions.TryAdd(userId.Value, actionToExecuteWhenMatchingFollower);
                    matchingTracksEventArgs.MatchOn |= MatchOn.Follower;
                }

                if (tweet.QuotedTweet != null)
                {
                    var quotedTweetCreatorId = tweet.QuotedTweet.CreatedBy?.Id;
                    Action<ITweet> actionToExecuteWhenMatchingFollowerFromQuotedTweet;

                    if (quotedTweetCreatorId != null && this.followingUserIds.TryGetValue(quotedTweetCreatorId, out actionToExecuteWhenMatchingFollowerFromQuotedTweet))
                    {
                        matchingQuotedFollowersAndActions.TryAdd(quotedTweetCreatorId.Value, actionToExecuteWhenMatchingFollowerFromQuotedTweet);
                        matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.Follower;
                    }
                }
            }
        }

        private void UpdateMatchesBasedOnTweetInReplyToUser(ITweet tweet, MatchOn matchOn,
           Dictionary<long, Action<ITweet>> matchingFollowersAndActions, MatchedTweetReceivedEventArgs matchingTracksEventArgs,
           Dictionary<long, Action<ITweet>> matchingQuotedFollowersAndActions)
        {
            if (matchOn.HasFlag(MatchOn.Everything) ||
                matchOn.HasFlag(MatchOn.FollowerInReplyTo))
            {
                var userId = tweet.InReplyToUserId;
                Action<ITweet> actionToExecuteWhenMatchingFollower;

                if (userId != null && this.followingUserIds.TryGetValue(userId, out actionToExecuteWhenMatchingFollower))
                {
                    matchingFollowersAndActions.TryAdd(userId.Value, actionToExecuteWhenMatchingFollower);
                    matchingTracksEventArgs.MatchOn |= MatchOn.FollowerInReplyTo;
                }

                if (tweet.QuotedTweet != null)
                {
                    var quotedTweetCreatorId = tweet.QuotedTweet.InReplyToUserId;
                    Action<ITweet> actionToExecuteWhenMatchingFollowerFromQuotedTweet;

                    if (quotedTweetCreatorId != null && this.followingUserIds.TryGetValue(quotedTweetCreatorId, out actionToExecuteWhenMatchingFollowerFromQuotedTweet))
                    {
                        matchingQuotedFollowersAndActions.TryAdd(quotedTweetCreatorId.Value, actionToExecuteWhenMatchingFollowerFromQuotedTweet);
                        matchingTracksEventArgs.QuotedTweetMatchOn |= MatchOn.FollowerInReplyTo;
                    }
                }
            }
        }

        // Matched Locations
        private IEnumerable<KeyValuePair<ILocation, Action<ITweet>>> GetMatchedLocations(ITweet tweet)
        {
            var tweetCoordinates = tweet.Coordinates;
            if (tweetCoordinates != null)
            {
                return GetMatchedLocations(tweetCoordinates);
            }

            var place = tweet.Place;
            var boundingBox = place?.BoundingBox;

            if (boundingBox != null)
            {
                var placeCoordinates = boundingBox.Coordinates;
                return GetMatchedLocations(placeCoordinates.ToArray());
            }

            return new List<KeyValuePair<ILocation, Action<ITweet>>>();
        }

        private IEnumerable<KeyValuePair<ILocation, Action<ITweet>>> GetMatchedLocations(ICoordinates[] coordinates)
        {
            var top = coordinates.Max(x => x.Latitude);
            var left = coordinates.Min(x => x.Longitude);

            var bottom = coordinates.Min(x => x.Latitude);
            var right = coordinates.Max(x => x.Longitude);

            var matchingLocations = new List<KeyValuePair<ILocation, Action<ITweet>>>();
            foreach (var locationAndAction in this.locations)
            {
                var location = locationAndAction.Key;

                var filterTop = Math.Max(location.Coordinate1.Latitude, location.Coordinate2.Latitude);
                var filterLeft = Math.Min(location.Coordinate1.Longitude, location.Coordinate2.Longitude);

                var filterBottom = Math.Min(location.Coordinate1.Latitude, location.Coordinate2.Latitude);
                var filterRight = Math.Max(location.Coordinate1.Longitude, location.Coordinate2.Longitude);

                var isTweetOutsideOfLocationCoordinates = left > filterRight || right < filterLeft || top < filterBottom || bottom > filterTop;

                if (!isTweetOutsideOfLocationCoordinates)
                {
                    matchingLocations.Add(locationAndAction);
                }
            }

            return matchingLocations;
        }

        private IEnumerable<KeyValuePair<ILocation, Action<ITweet>>> GetMatchedLocations(ICoordinates coordinates)
        {
            if (this.locations.IsEmpty() || coordinates == null)
            {
                return new List<KeyValuePair<ILocation, Action<ITweet>>>();
            }

            return this.locations.Where(x => Location.CoordinatesLocatedIn(coordinates, x.Key)).ToList();
        }


        // Invoke callback actions
        private void CallMultipleActions<T>(T tweet, IEnumerable<Action<T>> actions)
        {
            if (actions != null)
            {
                actions.ForEach(action =>
                {
                    if (action != null)
                    {
                        action(tweet);
                    }
                });
            }
        }
    }
}
