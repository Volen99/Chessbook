namespace WorldFeed.Common.Streaming
{
    using System;
    using System.Collections.Generic;

    public interface IStreamTrackManager<T> : ITrackManager<T>, ITrackStringAnalyzer
    {
        /// <summary>
        /// Collection of tracks and their related actions. An action is invoked if 
        /// a track has been matched.
        /// </summary>
        List<Tuple<string, Action<T>>> GetMatchingTracksAndActions(string inputs);
    }
}
