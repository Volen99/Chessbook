
    /// For more information regarding how Twitter matches the FilteredStream filters please visit
    /// https://dev.twitter.com/streaming/overview/request-parameters.
    [Flags]
    export enum MatchOn
    {
        /// Nothing to match.
        None,

        /// Match on all the fields used by Twitter filter stream.
        Everything = 1,

        /// The tweet text matches a track you follow.
        TweetText = 2,

        /// The follower is the person who sent the tweet.
        Follower = 4,

        /// The tweet location has matched a location you follow.
        TweetLocation = 8,

        /// When a tweet is sent directly to a follower of your list.
        FollowerInReplyTo = 16,

        /// The tweet entities matches a track you follow.
        AllEntities = 32,

        /// The track matches the text contained within a URL of a link or a media.
        URLEntities = 64,

        /// The track matches the text contained within a Hashtag.
        HashTagEntities = 128,

        /// The track matches the text contained within a user mention.
        UserMentionEntities = 256,

        /// The track matches the text contained within a symbol.
        SymbolEntities = 512,
    }
