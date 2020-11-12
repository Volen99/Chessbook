// import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
// import {Action} from '../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes';
// import {ITweet} from "../core/Public/Models/Interfaces/ITweet";
// import {MatchOn} from "../core/Public/Streaming/MatchOn";
//
// export class FilteredStreamMatcherConfig<T> {
//   constructor(matchOn: MatchOn) {
//     this.MatchOn = matchOn;
//     this.TweetMatchingTrackAndActions = new Dictionary<T, Action<ITweet>>();
//     this.RetweetMatchingTrackAndActions = new Dictionary<T, Action<ITweet>>();
//     this.QuotedTweetMatchingTrackAndActions = new Dictionary<T, Action<ITweet>>();
//   }
//
//   public MatchOn: MatchOn;
//   public TweetMatchingTrackAndActions: Dictionary<T, Action<ITweet>>;
//   public RetweetMatchingTrackAndActions: Dictionary<T, Action<ITweet>>;
//   public QuotedTweetMatchingTrackAndActions: Dictionary<T, Action<ITweet>>;
//
//   public GetAllMatchingTracks(): Dictionary<T, Action<ITweet>> {
//     return this.TweetMatchingTrackAndActions
//       .MergeWith(this.RetweetMatchingTrackAndActions)
//       .MergeWith(this.QuotedTweetMatchingTrackAndActions);
//   }
// }
