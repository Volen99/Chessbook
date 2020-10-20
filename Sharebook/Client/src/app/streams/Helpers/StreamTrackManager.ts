
    // List of methods to be used to Track keywords
    import {IStreamTrackManager} from "../../core/Core/Streaming/IStreamTrackManager";
    import Regex, {Match, RegexOptions} from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/RegularExpressions";
    import Dictionary from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
    import {Action} from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
    import List from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/List";
    import HashSet from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/HashSet";
    import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
    import {UnicodeHelper} from "../../core/Core/Helpers/UnicodeHelper";

    export class StreamTrackManager<T> implements IStreamTrackManager<T>
    {
        private _refreshTracking: boolean;
        // ReSharper disable once StaticMemberInGenericType
        private static readonly _matchWordRegex: Regex = new Regex(@"\w+", RegexOptions.Compiled);

        // Stores the entire track

        private readonly _tracks: Dictionary<string, Action<T>>;

        get Tracks(): Dictionary<string, Action<T>> {
          return this._tracks;
        }

      // Stores the keywords included in a track
        private readonly _tracksKeywords: List<string[]>;

        get TracksCount(): number {
          return this._tracks.count;
        }

        public MaxTracks: number;

        constructor(maxTrack?: number) {
          if (!maxTrack) {
            maxTrack = Number.MAX_SAFE_INTEGER;
          }
          this.MaxTracks = maxTrack;

          this._tracks = new Dictionary<string, Action<T>>();
          this._tracksKeywords = new List<string[]>();
        }


        // public StreamTrackManager() : this(int.MaxValue)
        // {
        // }
        //
        // public StreamTrackManager(int maxTrack)
        // {
        //     MaxTracks = maxTrack;
        //
        //     _tracks = new Dictionary<string, Action<T>>();
        //     _tracksKeywords = new List<string[]>();
        // }

        // Twitter API Tracking
        public  AddTrack(track: string, trackReceived: Action<T> = null): void
        {
            if (!track) {
                return;
            }

            if (this._tracks.count < this.MaxTracks)
            {
               let lowerTrack = track.toLocaleLowerCase();
               let trackSplit = lowerTrack.split(' ');

                lock (this) // Not allowed to add multiple at the same time
                {
                    if (!this._tracks.Keys.Contains(lowerTrack))
                    {
                        this._tracks.Add(lowerTrack, trackReceived);
                        this._tracksKeywords.Add(trackSplit);
                    }
                }

                this._refreshTracking = true;
            }
        }

        public  RemoveTrack(track: string): void
        {
          let lowerTrack: string = track.toLocaleLowerCase();

            lock (this) // Not allowed to remove multiple at the same time
            {
                if (_tracks.Keys.Contains(lowerTrack))
                {
                    let trackSplit: string[]  = lowerTrack.split(' ');

                    // Do not use .ContainsSameObjectsAs for performances of Array vs IEnumerable
                    this._tracksKeywords.RemoveAll(x => x.Length === trackSplit.length &&
                                                  !x.Except(trackSplit).Any());
                    this._tracks.Remove(lowerTrack);
                }
            }

            this._refreshTracking = true;
        }

        public  ContainsTrack(track: string): boolean
        {
            return this._tracks.Keys.Contains(track.toLocaleLowerCase());
        }

        public  ClearTracks(): void
        {
            lock (this)
            {
                this._tracks.clear();
                this._tracksKeywords.clear();
                this._refreshTracking = true;
            }
        }

        // Manual Tracking
        // private string[] _uniqueKeywordsArray;
        private _uniqueKeywordsHashSet: HashSet<string>;
        private _tracksKeywordsArray: string[][];
        private _matchingRegex: Regex;

        /// Creates Arrays of string that cache information for later comparisons
        /// This is required for performances improvement
        private  RefreshTracking(): void
        {
            // List of keywords associated with a track
            this._tracksKeywordsArray = this._tracksKeywords.toArray();
            this._uniqueKeywordsHashSet = new HashSet<string>();

            for (let i = 0; i < this._tracksKeywordsArray.length; ++i)
            {
                this._uniqueKeywordsHashSet.UnionWith((this._tracksKeywordsArray)[i]);
            }

            let tracksContainsAtSymbol = this._uniqueKeywordsHashSet.Any(x => x.StartsWith("@"));
            let tracksContainsDollarTag = this._uniqueKeywordsHashSet.Any(x => x.StartsWith("$"));

            let regexBuilder = new StringBuilder();

            this._uniqueKeywordsHashSet.ForEach(x =>
            {
              let isUnicode: boolean = UnicodeHelper.AnyUnicode(x);

                if (isUnicode)
                {
                    regexBuilder.append(`${Regex.Escape(x)}|`);
                }
            });

            regexBuilder.append(@"[\#");

            if (tracksContainsAtSymbol)
            {
                regexBuilder.append("@");
            }

            if (tracksContainsDollarTag)
            {
                regexBuilder.append(@"\$");
            }

            regexBuilder.append(@"][\w\.]+|[\w\.]+");

            this._matchingRegex = new Regex(regexBuilder.toString(), RegexOptions.IgnoreCase);
        }

        public  Matches(input: string): boolean
        {
            lock (this)
            {
                return _matchingTracks(input).Any();
            }
        }

        public  MatchesAll(input:string): boolean
        {
            lock (this)
            {
                return _matchingTracks(input).Count === this._tracks.Count;
            }
        }

        private _matchingCharacters(input: string): List<string>
    {
            // This behavior allows live refresh of the tracking
            // But reduces considerably the performances of the first test
            // First attempt ~= 10 x Later Attempts
            if (this._refreshTracking)
            {
                this.RefreshTracking();
                this._refreshTracking = false;
            }

            let matchingKeywords: List<string> = new List<string>();
            for (let i = 0; i < this._uniqueKeywordsHashSet.count; ++i)
            {
                if (input.Contains(this._uniqueKeywordsHashSet.ElementAt(i)))
                {
                    matchingKeywords.Add(this._uniqueKeywordsHashSet.ElementAt(i));
                }
            }

            let result: List<string> = new List<string>();
            for (let i = 0; i < this._tracksKeywordsArray.length; ++i)
            {
                let trackIsMatching: boolean = true;
                for (let j = 0; j < (this._tracksKeywordsArray)[i].length && trackIsMatching; ++j)
                {
                    trackIsMatching = matchingKeywords.Contains(_tracksKeywordsArray[i][j]);
                }

                if (trackIsMatching)
                {
                    result.Add(_tracks.Keys.ElementAt(i));
                }
            }

            return result;
        }

        public  GetMatchingCharacters(input: string): List<string>
        {
            lock (this)
            {
                return this._matchingCharacters(input);
            }
        }

        public GetMatchingTracks(input: string):  List<string>
        {
            lock (this)
            {
                return this._matchingTracks(input).Select(x => x.Item1).ToList();
            }
        }

        private _matchingTracks(input: string): List<Tuple<string, Action<T>>>
    {
            // Missing match of # for simple tracked keywords
            if (!input || this._tracks.count === 0)
            {
                return new List<Tuple<string, Action<T>>>();
            }

            // This behavior allows live refresh of the tracking
            // But reduces considerably the performances of the first test
            if (this._refreshTracking)
            {
                this.RefreshTracking();
                this._refreshTracking = false;
            }

            var matchingKeywords = GetMatchingKeywords(input);

            // var linkParser = new Regex(@"\b(?:https?://|www\.)\S+\b", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            // var rawString = "house home go www.monstermmorpg.com nice hospital http://www.monstermmorpg.com this is incorrect url http://www.monstermmorpg.commerged continue";
            // foreach(Match m in linkParser.Matches(rawString))
            //     MessageBox.Show(m.Value);

            let result = new List<Tuple<string, Action<T>>>();
            for (let i = 0; i < this._tracksKeywordsArray.length; ++i)
            {
                let isMatching: boolean = true;
                for (let j = 0; j < (this._tracksKeywordsArray)[i].length && isMatching; ++j)
                {
                    if ((this._tracksKeywordsArray)[i][j][0] !== '#' && (this._tracksKeywordsArray)[i][j][0] != '$')
                    {
                        isMatching = matchingKeywords.Contains((this._tracksKeywordsArray)[i][j]) ||
                                     matchingKeywords.Contains($"#{_tracksKeywordsArray[i][j]}") ||
                                     matchingKeywords.Contains($"{_tracksKeywordsArray[i][j]}");
                    }
                    else
                    {
                        isMatching = matchingKeywords.Contains((this._tracksKeywordsArray)[i][j]);
                    }
                }

                if (isMatching)
                {
                    let keyword = this._tracks.Keys.ElementAt(i);
                    let action = this._tracks.ElementAt(i).Value;
                    result.Add(new Tuple<string, Action<T>>(keyword, action));
                }
            }

            return result;
        }

        private  GetMatchingKeywords(input: string): string[]
        {
            var matchingWordsWithUrlSupport = _matchingRegex
                .Matches(input.toLocaleLowerCase())
                .OfType<Match>()
                .Where(match =>
                {
                    if (match.Value[0] === '#' || match.Value[0] === '$')
                    {
                        return this._uniqueKeywordsHashSet.Contains(match.Value) ||
                          this._uniqueKeywordsHashSet.Contains(match.Value.Substring(1, match.Value.Length - 1));
                    }

                    return this._uniqueKeywordsHashSet.Contains(match.Value);
                })
                .Select(x => x.Value).ToArray();

            var matchingWords = _matchWordRegex
                .Matches(input.toLocaleLowerCase())
                .OfType<Match>()
                .Where(match => this._uniqueKeywordsHashSet.Contains(match.Value))
                .Select(x => x.Value).ToArray();

            return matchingWordsWithUrlSupport.Union(matchingWords).ToArray();
        }

        public  GetMatchingTracksAndActions(input: string): List<Tuple<string, Action<T>>>
        {
            lock (this)
            {
                return this._matchingTracks(input);
            }
        }
    }
}
