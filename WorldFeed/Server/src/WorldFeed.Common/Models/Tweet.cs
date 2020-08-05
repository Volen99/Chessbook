namespace WorldFeed.Common.Models
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Threading.Tasks;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models.TwitterEntities;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Entities;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Settings;

    /// <summary>
    /// Class representing a Tweet
    /// https://dev.twitter.com/docs/api/1/get/statuses/show/%3Aid
    /// </summary>
    public class Tweet : ITweet
    {
        private ITweetDTO tweetDTO;

        public ITwitterClient Client { get; set; }

        #region Public Attributes

        private IUser createdBy;
        private ITweetEntities entities;

        private void DTOUpdated()
        {
            this.createdBy = this.tweetDTO == null ? null : Client.Factories.CreateUser(this.tweetDTO.CreatedBy);
            this.entities = this.tweetDTO == null ? null : new TweetEntities(this.tweetDTO, TweetMode);
        }

        public ITweetDTO TweetDTO
        {
            get => this.tweetDTO;
            set
            {
                this.tweetDTO = value;
                DTOUpdated();
            }
        }

        #region Twitter API Attributes

        public long Id
        {
            get => this.tweetDTO.Id;
            set => this.tweetDTO.Id = value;
        }

        public string IdStr
        {
            get => this.tweetDTO.IdStr;
            set => this.tweetDTO.IdStr = value;
        }

        public string Text
        {
            get
            {
                if (this.tweetDTO.Text != null)
                {
                    return this.tweetDTO.Text;
                }

                if (this.tweetDTO.FullText == null)
                {
                    return null;
                }

                if (DisplayTextRange == null)
                {
                    return this.tweetDTO.FullText;
                }

                var contentStartIndex = DisplayTextRange[0];
                var contentEndIndex = DisplayTextRange[1];

                return UnicodeHelper.SubstringByTextElements(this.tweetDTO.FullText, contentStartIndex, contentEndIndex - contentStartIndex);
            }
            set => this.tweetDTO.Text = value;
        }

        public string Prefix
        {
            get
            {
                var text = this.tweetDTO.ExtendedTweet?.FullText ?? this.tweetDTO.FullText;

                if (text != null && DisplayTextRange != null)
                {
                    var prefixEndIndex = DisplayTextRange[0];
                    return text.Substring(0, prefixEndIndex);
                }

                return null;
            }
        }

        public string Suffix
        {
            get
            {
                var text = this.tweetDTO.ExtendedTweet?.FullText ?? this.tweetDTO.FullText;

                if (text != null && DisplayTextRange != null)
                {
                    var suffixStartIndex = DisplayTextRange[1];
                    return UnicodeHelper.SubstringByTextElements(text, suffixStartIndex);
                }

                return null;
            }
        }

        public string FullText
        {
            get => this.tweetDTO.ExtendedTweet?.FullText ?? this.tweetDTO.FullText ?? this.tweetDTO.Text;
            set => this.tweetDTO.FullText = value;
        }

        public int[] DisplayTextRange => this.tweetDTO.ExtendedTweet?.DisplayTextRange ?? this.tweetDTO.DisplayTextRange;

        public int[] SafeDisplayTextRange => DisplayTextRange ?? new[] { 0, FullText.Length };

        public IExtendedTweet ExtendedTweet
        {
            get => this.tweetDTO.ExtendedTweet;
            set => this.tweetDTO.ExtendedTweet = value;
        }

        public bool Favorited => this.tweetDTO.Favorited;

        public int FavoriteCount => this.tweetDTO.FavoriteCount ?? 0;

        public ICoordinates Coordinates
        {
            get => this.tweetDTO.Coordinates;
            set => this.tweetDTO.Coordinates = value;
        }

        public ITweetEntities Entities => this.entities;

        public IUser CreatedBy => this.createdBy;

        public ITweetIdentifier CurrentUserRetweetIdentifier => this.tweetDTO.CurrentUserRetweetIdentifier;

        public DateTime CreatedAt => this.tweetDTO.CreatedAt;

        public string Source
        {
            get => this.tweetDTO.Source;
            set => this.tweetDTO.Source = value;
        }

        public bool Truncated => this.tweetDTO.Truncated;

        public int? ReplyCount
        {
            get => this.tweetDTO.ReplyCount;
            set => this.tweetDTO.QuoteCount = value;
        }

        public long? InReplyToStatusId
        {
            get => this.tweetDTO.InReplyToStatusId;
            set => this.tweetDTO.InReplyToStatusId = value;
        }

        public string InReplyToStatusIdStr
        {
            get => this.tweetDTO.InReplyToStatusIdStr;
            set => this.tweetDTO.InReplyToStatusIdStr = value;
        }

        public long? InReplyToUserId
        {
            get => this.tweetDTO.InReplyToUserId;
            set => this.tweetDTO.InReplyToUserId = value;
        }

        public string InReplyToUserIdStr
        {
            get => this.tweetDTO.InReplyToUserIdStr;
            set => this.tweetDTO.InReplyToUserIdStr = value;
        }

        public string InReplyToScreenName
        {
            get => this.tweetDTO.InReplyToScreenName;
            set => this.tweetDTO.InReplyToScreenName = value;
        }

        public int[] ContributorsIds => this.tweetDTO.ContributorsIds;

        public IEnumerable<long> Contributors => this.tweetDTO.Contributors;

        public int RetweetCount => this.tweetDTO.RetweetCount;

        public bool Retweeted => this.tweetDTO.Retweeted;

        public bool IsRetweet => this.tweetDTO.RetweetedTweetDTO != null;

        private ITweet retweetedTweet;

        public ITweet RetweetedTweet
        {
            get
            {
                if (this.retweetedTweet == null)
                {
                    this.retweetedTweet = Client.Factories.CreateTweet(this.tweetDTO.RetweetedTweetDTO);
                }

                return this.retweetedTweet;
            }
        }

        public int? QuoteCount
        {
            get => this.tweetDTO.QuoteCount;
            set => this.tweetDTO.QuoteCount = value;
        }

        public long? QuotedStatusId => this.tweetDTO.QuotedStatusId;

        public string QuotedStatusIdStr => this.tweetDTO.QuotedStatusIdStr;

        private ITweet quotedTweet;
        private TweetMode? tweetMode;
        private ITwitterClient client;

        public ITweet QuotedTweet
        {
            get
            {
                if (this.quotedTweet == null)
                {
                    this.quotedTweet = Client.Factories.CreateTweet(this.tweetDTO.QuotedTweetDTO);
                }

                return this.quotedTweet;
            }
        }

        public bool PossiblySensitive => this.tweetDTO.PossiblySensitive;

        public Language? Language => this.tweetDTO.Language;

        public IPlace Place => this.tweetDTO.Place;

        public Dictionary<string, object> Scopes => this.tweetDTO.Scopes;

        public string FilterLevel => this.tweetDTO.FilterLevel;

        public bool WithheldCopyright => this.tweetDTO.WithheldCopyright;

        public IEnumerable<string> WithheldInCountries => this.tweetDTO.WithheldInCountries;

        public string WithheldScope => this.tweetDTO.WithheldScope;

        #endregion

        #region Tweetinvi API Accessors

        public List<IHashtagEntity> Hashtags
        {
            get
            {
                if (Entities != null)
                {
                    return Entities.Hashtags;
                }

                return null;
            }
        }

        public List<IUrlEntity> Urls
        {
            get
            {
                if (Entities != null)
                {
                    return Entities.Urls;
                }

                return null;
            }
        }

        public List<IMediaEntity> Media
        {
            get
            {
                if (Entities != null)
                {
                    return Entities.Medias;
                }

                return null;
            }
        }

        public List<IUserMentionEntity> UserMentions
        {
            get
            {
                if (Entities != null)
                {
                    return Entities.UserMentions;
                }

                return null;
            }
        }

        #endregion

        #region Tweetinvi API Attributes

        public string Url => $"https://twitter.com/{CreatedBy?.ScreenName}/status/{Id.ToString(CultureInfo.InvariantCulture).ToLowerInvariant()}"; // TODO: change to WorldFeed

        public TweetMode TweetMode { get; }

        #endregion

        #endregion

        public Tweet(ITweetDTO tweetDTO, TweetMode? tweetMode, ITwitterClient client)
        {
            Client = client;

            // IMPORTANT: POSITION MATTERS! Look line below!
            TweetMode = tweetMode ?? TweetMode.Extended;

            // IMPORTANT: Make sure that the TweetDTO is set up after the TweetMode because it uses the TweetMode to initialize the Entities
            TweetDTO = tweetDTO;
        }

        public Tweet(ITweetWithSearchMetadataDTO tweetDTO, TweetMode? tweetMode, ITwitterClient client)
        {
            TweetDTO = tweetDTO;
            this.tweetMode = tweetMode;
            this.client = client;
        }

        public Task<ITweet> PublishRetweetAsync()
        {
            return Client.Tweets.PublishRetweetAsync(this);
        }

        public Task<ITweet[]> GetRetweetsAsync()
        {
            return Client.Tweets.GetRetweetsAsync(this);
        }

        public Task DestroyRetweetAsync()
        {
            return Client.Tweets.DestroyTweetAsync(this);
        }

        public Task<IOEmbedTweet> GenerateOEmbedTweetAsync()
        {
            return Client.Tweets.GetOEmbedTweetAsync(this);
        }

        public Task DestroyAsync()
        {
            return Client.Tweets.DestroyTweetAsync(this);
        }

        public Task FavoriteAsync()
        {
            return Client.Tweets.FavoriteTweetAsync(this);
        }

        public Task UnfavoriteAsync()
        {
            return Client.Tweets.UnfavoriteTweetAsync(this);
        }

        public override string ToString()
        {
            return FullText;
        }

        public bool Equals(ITweet other)
        {
            if (other == null)
            {
                return false;
            }

            // Equals is currently used to compare only if 2 tweets are the same
            // We do not look for the tweet version (DateTime)

            return this.tweetDTO.Equals(other.TweetDTO);
        }
    }
}
