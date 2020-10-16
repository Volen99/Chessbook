import {Action} from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";

export interface ITrackableStream<T> {
  // Gets the current number of Tracks
  TracksCount: number;

  // Get the maximum number of Tracks you can add
  MaxTracks: number;

  // List of tracks currently analyzed
  Tracks: Dictionary<string, Action<T>>;

  /// <summary>
  /// Add a keyword/sentence to Track
  /// </summary>
  /// <param name="track">Keyword to track</param>
  /// <param name="trackReceived">Event to call when this track keyword</param>
  AddTrack(track: string, trackReceived: Action<T> = null): void

  // Remove a keyword/sentence that was tracked
  RemoveTrack(track: string): void;

  // Tells whether a track is already existing (case insensitive)
  ContainsTrack(track: string): boolean;

  // Remove all tracked keywords
  ClearTracks(): void;
}
