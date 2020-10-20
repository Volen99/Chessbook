import {ITwitterStream} from "../../Core/Streaming/ITwitterStream";
import {ITweet} from "../Models/Interfaces/ITweet";
import {ITrackableStream} from "../../Core/Streaming/ITrackableStream";
import {IUserIdentifier} from "../Models/Interfaces/IUserIdentifier";
import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {MatchOn} from './MatchOn';
import {ILocation} from '../Models/Interfaces/ILocation';
import {Action} from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
import {ICoordinates} from '../Models/Interfaces/ICoordinates';

export interface IFilteredStream extends ITwitterStream, ITrackableStream<ITweet> {
  /// Tweet matching the specified filter criteria has been received.
  event EventHandler<MatchedTweetReceivedEventArgs> MatchingTweetReceived;

  /// Tweet not matching the specified filters has been received.
  event EventHandler<TweetEventArgs> NonMatchingTweetReceived;

  /// Specify the fields that need to be used to filter the stream.
  MatchOn: MatchOn;

  /// A tweet will match if ANY of the global parameters are successfully been matched.
  /// { 'Track' OR 'Location' OR 'Follower' }.
  StartMatchingAnyConditionAsync(): Task<void>;

  /// A tweet will match if ALL of the global parameters are successfully been matched.
  /// { 'Track' AND 'Location' AND 'Follower' }.
  StartMatchingAllConditionsAsync(): Task<void>;

  // #region Follow
  /// List of UserId followed by the stream
  FollowingUserIds: Dictionary<number, Action<ITweet>>; // long?

  /// Follow a specific userId
  AddFollow(userId: number, userPublishedTweet: Action<ITweet> = null): void;

  /// Follow a specific user
  AddFollow(user: IUserIdentifier, userPublishedTweet: Action<ITweet> = null): void;

  /// Unfollow a specific userId
  RemoveFollow(userId: number): void;

  /// Unfollow a specific user
  RemoveFollow(user: IUserIdentifier): void;

  /// Tells you whether you are following a userId
  ContainsFollow(userId: number): boolean;

  /// Tells you whether you are following a user
  ContainsFollow(user: IUserIdentifier): boolean;

  /// Unfollow all the currently followed users
  ClearFollows(): void;

  // #endregion

  //#region Location

  /// List of locations analyzed by the stream
  Locations: Dictionary<ILocation, Action<ITweet>>;

/// Add a location for the stream to analyze
  AddLocation(location: ILocation, locationDetected: Action<ITweet> = null): void;

  /// Add a location for the stream to analyze
  AddLocation(coordinate1: ICoordinates, coordinate2: ICoordinates, locationDetected: Action<ITweet> = null): ILocation;

  /// Remove a location for the stream to analyze
  RemoveLocation(location: ILocation): void;

  /// Remove a location for the stream to analyze
  RemoveLocation(coordinate1: ICoordinates, coordinate2: ICoordinates): void;

  /// Tells you whether you are analyzing a specific location
  ContainsLocation(location: ILocation): boolean;

  /// Tells you whether you are analyzing a specific location
  ContainsLocation(coordinate1: ICoordinates, coordinate2: ICoordinates): boolean;

  /// Remove all the currently analyzed locations
  ClearLocations(): void;

  // #endregion

  /// For any tweet you have this method allow you to know if it would be matched by the Stream
  CheckIfTweetMatchesStreamFilters(tweet: ITweet): MatchOn;
}
