namespace WorldFeed.Streams.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Text.RegularExpressions;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Streaming;

    /// <summary>
    /// List of methods to be used to Track keywords
    /// </summary>
    public class StreamTrackManager<T> : IStreamTrackManager<T>
    {
        private bool refreshTracking;

        // Stores the entire track
        private readonly Dictionary<string, Action<T>> tracks;
        // Stores the keywords included in a track
        private readonly List<string[]> tracksKeywords;

        public StreamTrackManager() : this(int.MaxValue)
        {
        }

        public int MaxTracks { get; }

        public Dictionary<string, Action<T>> Tracks => this.tracks;

        public int TracksCount => this.tracks.Count;

        public StreamTrackManager(int maxTrack)
        {
            MaxTracks = maxTrack;

            this.tracks = new Dictionary<string, Action<T>>();
            this.tracksKeywords = new List<string[]>();
        }

        // Twitter API Tracking
        public void AddTrack(string track, Action<T> trackReceived = null)
        {
            if (string.IsNullOrEmpty(track))
            {
                return;
            }

            if (this.tracks.Count < MaxTracks)
            {
                string lowerTrack = track.ToLower();
                string[] trackSplit = lowerTrack.Split(' ');

                lock (this) // Not allowed to add multiple at the same time
                {
                    if (!this.tracks.Keys.Contains(lowerTrack))
                    {
                        this.tracks.Add(lowerTrack, trackReceived);
                        this.tracksKeywords.Add(trackSplit);
                    }
                }

                this.refreshTracking = true;
            }
        }

        public void RemoveTrack(string track)
        {
            string lowerTrack = track.ToLower();

            lock (this) // Not allowed to remove multiple at the same time
            {
                if (this.tracks.Keys.Contains(lowerTrack))
                {
                    string[] trackSplit = lowerTrack.Split(' ');

                    // Do not use .ContainsSameObjectsAs for performances of Array vs IEnumerable
                    this.tracksKeywords.RemoveAll(x => x.Length == trackSplit.Length &&
                                                  !x.Except(trackSplit).Any());
                    this.tracks.Remove(lowerTrack);
                }
            }

            this.refreshTracking = true;
        }

        public bool ContainsTrack(string track)
        {
            return this.tracks.Keys.Contains(track.ToLower());
        }

        public void ClearTracks()
        {
            lock (this)
            {
                this.tracks.Clear();
                this.tracksKeywords.Clear();
                this.refreshTracking = true;
            }
        }

        // Manual Tracking
        // private string[] _uniqueKeywordsArray;
        private HashSet<string> uniqueKeywordsHashSet;
        private string[][] tracksKeywordsArray;
        private Regex matchingRegex;

        /// <summary>
        /// Creates Arrays of string that cache information for later comparisons
        /// This is required for performances improvement
        /// </summary>
        private void RefreshTracking()
        {
            // List of keywords associated with a track
            this.tracksKeywordsArray = this.tracksKeywords.ToArray();
            this.uniqueKeywordsHashSet = new HashSet<string>();

            for (int i = 0; i < this.tracksKeywordsArray.Length; ++i)
            {
                this.uniqueKeywordsHashSet.UnionWith(this.tracksKeywordsArray[i]);
            }

            var tracksContainsAtSymbol = this.uniqueKeywordsHashSet.Any(x => x.StartsWith("@"));
            var tracksContainsDollarTag = this.uniqueKeywordsHashSet.Any(x => x.StartsWith("$"));

            var regexBuilder = new StringBuilder();

            this.uniqueKeywordsHashSet.ForEach(x =>
            {
                bool isUnicode = UnicodeHelper.AnyUnicode(x);

                if (isUnicode)
                {
                    regexBuilder.Append($"{Regex.Escape(x)}|");
                }
            });

            regexBuilder.Append(@"[\#");

            if (tracksContainsAtSymbol)
            {
                regexBuilder.Append("@");
            }

            if (tracksContainsDollarTag)
            {
                regexBuilder.Append(@"\$");
            }

            regexBuilder.Append(@"][\w\.]+|[\w\.]+");

            this.matchingRegex = new Regex(regexBuilder.ToString(), RegexOptions.IgnoreCase);
        }

        public bool Matches(string input)
        {
            lock (this)
            {
                return this.matchingTracks(input).Any();
            }
        }

        public bool MatchesAll(string input)
        {
            lock (this)
            {
                return this.matchingTracks(input).Count == this.tracks.Count;
            }
        }

        private List<string> _matchingCharacters(string input)
        {
            // This behavior allows live refresh of the tracking
            // But reduces considerably the performances of the first test
            // First attempt ~= 10 x Later Attempts
            if (this.refreshTracking)
            {
                RefreshTracking();
                this.refreshTracking = false;
            }

            List<string> matchingKeywords = new List<string>();
            for (int i = 0; i < this.uniqueKeywordsHashSet.Count; ++i)
            {
                if (input.Contains(this.uniqueKeywordsHashSet.ElementAt(i)))
                {
                    matchingKeywords.Add(this.uniqueKeywordsHashSet.ElementAt(i));
                }
            }

            List<string> result = new List<string>();
            for (int i = 0; i < this.tracksKeywordsArray.Length; ++i)
            {
                bool trackIsMatching = true;
                for (int j = 0; j < this.tracksKeywordsArray[i].Length && trackIsMatching; ++j)
                {
                    trackIsMatching = matchingKeywords.Contains(this.tracksKeywordsArray[i][j]);
                }

                if (trackIsMatching)
                {
                    result.Add(this.tracks.Keys.ElementAt(i));
                }
            }

            return result;
        }

        public List<string> GetMatchingCharacters(string input)
        {
            lock (this)
            {
                return _matchingCharacters(input);
            }
        }

        public List<string> GetMatchingTracks(string input)
        {
            lock (this)
            {
                return this.matchingTracks(input).Select(x => x.Item1).ToList();
            }
        }

        private List<Tuple<string, Action<T>>> matchingTracks(string input)
        {
            // Missing match of # for simple tracked keywords
            if (string.IsNullOrEmpty(input) || this.tracks.Count == 0)
            {
                return new List<Tuple<string, Action<T>>>();
            }

            // This behavior allows live refresh of the tracking
            // But reduces considerably the performances of the first test
            if (this.refreshTracking)
            {
                RefreshTracking();
                this.refreshTracking = false;
            }

            var matchingKeywords = GetMatchingKeywords(input);

            var result = new List<Tuple<string, Action<T>>>();
            for (int i = 0; i < this.tracksKeywordsArray.Length; ++i)
            {
                var isMatching = true;
                for (int j = 0; j < this.tracksKeywordsArray[i].Length && isMatching; ++j)
                {
                    if (this.tracksKeywordsArray[i][j][0] != '#' && this.tracksKeywordsArray[i][j][0] != '$')
                    {
                        isMatching = matchingKeywords.Contains(this.tracksKeywordsArray[i][j]) ||
                                     matchingKeywords.Contains(string.Format("#{0}", this.tracksKeywordsArray[i][j])) ||
                                     matchingKeywords.Contains(string.Format("{0}", this.tracksKeywordsArray[i][j]));
                    }
                    else
                    {
                        isMatching = matchingKeywords.Contains(this.tracksKeywordsArray[i][j]);
                    }
                }

                if (isMatching)
                {
                    var keyword = this.tracks.Keys.ElementAt(i);
                    var action = this.tracks.ElementAt(i).Value;
                    result.Add(new Tuple<string, Action<T>>(keyword, action));
                }
            }

            return result;
        }

        private string[] GetMatchingKeywords(string input)
        {
            return this.matchingRegex
                .Matches(input.ToLower())
                .OfType<Match>()
                .Where(match =>
                {
                    if (match.Value[0] == '#' || match.Value[0] == '$')
                    {
                        return this.uniqueKeywordsHashSet.Contains(match.Value) ||
                               this.uniqueKeywordsHashSet.Contains(match.Value.Substring(1, match.Value.Length - 1));
                    }

                    return this.uniqueKeywordsHashSet.Contains(match.Value);
                })
                .Select(x => x.Value).ToArray();
        }

        public List<Tuple<string, Action<T>>> GetMatchingTracksAndActions(string input)
        {
            lock (this)
            {
                return this.matchingTracks(input);
            }
        }
    }
}
