namespace Chessbook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;
    using System.Net.Http;
    using System.IO;
    using Microsoft.EntityFrameworkCore;
    using Tweetinvi.Models;
    using Tweetinvi;

    using Chessbook.Services.Security;
    using Chessbook.Core;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Data;
    using Chessbook.Core.Domain.Posts;
    using Chessbook.Services.Entities;
    using Chessbook.Core.Domain.Cards;
    using Chessbook.Services.Data.Services.Media;
    using Chessbook.Core.Infrastructure;
    using Chessbook.Services.Cards;
    using Chessbook.Core.Domain.Polls;
    using Chessbook.Core.Domain.Relationships;
    using Chessbook.Services.Blocklist;
    using Chessbook.Core.Domain.Customers;
    using Chessbook.Services.Helpers;

    public class PostsService : IPostsService
    {
        private readonly IRepository<Post> postsRepository;
        private readonly IRepository<PostPicture> postPictureRepository;
        private readonly IRepository<PostVote> postVoteRepository;
        private readonly IRepository<PostComment> postCommentRepositoy;
        private readonly IRepository<UserBlocklist> userBlocklistRepository;
        private readonly IRepository<Customer> customerRepository;

        private readonly IUserService userService;
        private readonly IPollService pollService;
        private readonly IRepository<Relationship> relationshipRepository;
        private readonly IWorkContext _workContext;
        private readonly IRepository<Tag> tagRepository;
        private readonly IRepository<PostTag> postTagRepository;
        private readonly IPictureService pictureService;
        private readonly INopFileProvider fileProvider;
        private readonly IPreviewCardService previewCardService;
        private readonly IAclService aclService;
        private readonly IBlocklistService blocklistService;
        private readonly IDateTimeHelper dateTimeHelper;
        private readonly IPostTagService postTagService;

        const string TWITTER_URL_REGEX = @"(?<=^|\s+)" +                      // URL can be prefixed by space or start of line
                   @"\b(?<start>http(?<isSecured>s?)://(?:www\.)?|www\.|)" +  // Start of an url
                   @"(?!www\.)" +                                             // The first keyword cannot be www.
                   @"(?<firstPathElement>\w+([\w-]*\w+)?\.)" +                // first keyword required
                   @"(?<secondPathElement>\w+[\w-]*\w+)\w*?" +                // second keyword required
                   @"(?<multiplePathElements>(?:\.\w+[\w-]*\w+)*)" +          // potential sub-sites
                   @"?\.{0}" +                                                // . is forbidden at this stage
                   @"(?<specialChar>[/?])?" +                                 // is there a character specifying the url will be extended
                   @"(?(specialChar)" +                                       // has a specialChar been detected
                   @"(?:" +                                                   // if so
                   @"(?:(?:\w|\d)+)" +                                        // Get all the letters
                   @"(?:(?:\p{P}|=)+)" +                                      // Followed by at least 1 or multiple punctuation (twitter behavior)
                   @")*(?:(?:\w|\d)+))" +                                     // And the end should be a literal char
                   @"(?<lastChar>[/?])?";                                     // Or a '/'

        public PostsService(IRepository<Post> postsRepository, IRepository<PostPicture> postPictureRepository,
            IRepository<PostVote> postVoteRepository, IRepository<PostComment> postCommentRepositoy,
            IRepository<Customer> customerRepository,
            IRepository<UserBlocklist> userBlocklistRepository, IUserService userService,
            IPollService pollService, IRepository<Relationship> relationshipRepository,
            IWorkContext _workContext, IRepository<PostTag> postTagRepository, IRepository<Tag> tagRepository,
            IAclService aclService, IPictureService pictureService, INopFileProvider fileProvider,
            IPreviewCardService previewCardService, IBlocklistService blocklistService,
            IDateTimeHelper dateTimeHelper, IPostTagService postTagService)
        {
            this.postsRepository = postsRepository;
            this.postPictureRepository = postPictureRepository;
            this.postVoteRepository = postVoteRepository;
            this.postCommentRepositoy = postCommentRepositoy;
            this.userBlocklistRepository = userBlocklistRepository;
            this.customerRepository = customerRepository;

            this.userService = userService;
            this.pollService = pollService;
            this.relationshipRepository = relationshipRepository;
            this._workContext = _workContext;
            this.postTagRepository = postTagRepository;
            this.tagRepository = tagRepository;
            this.aclService = aclService;
            this.pictureService = pictureService;
            this.fileProvider = fileProvider;
            this.previewCardService = previewCardService;
            this.blocklistService = blocklistService;
            this.dateTimeHelper = dateTimeHelper;
            this.postTagService = postTagService;
        }

        public async Task<Post> CreateAsync(QueryPostParams query, int userId, int[] mediaIds = null, int? pollId = null)
        {
            var postNew = new Post
            {
                Status = query.Status,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                HasMedia = mediaIds == null ? false : true,
                PollId = pollId,
            };

            await this.postsRepository.InsertAsync(postNew);

            if (postNew.Status != null)
            {
                // card
                var LinkParser = new Regex(TWITTER_URL_REGEX, RegexOptions.IgnoreCase);

                foreach (Match link in LinkParser.Matches(postNew.Status))
                {
                    // If an url ends with . and 2 followed chars twitter does not
                    // consider it as an URL
                    if (link.Groups["start"].Value == string.Empty &&
                        link.Groups["multiplePathElements"].Value == string.Empty &&
                        link.Groups["secondPathElement"].Value.Length < 2 &&
                        link.Groups["specialChar"].Value == string.Empty &&
                        link.Groups["lastChar"].Value != "/")
                    {
                        continue;
                    }

                    // you know what to do..
                    var credentials = new TwitterCredentials("qP3NF5ecdfWPJus1Mka09dd5K", "qP3NF5ecdfWPJus1Mka09dd5K", "AAAAAAAAAAAAAAAAAAAAAKTSTQEAAAAAu593oSKLjmiai4umFcoS1s6na1Q%3Db07h69zG29sN7TZ4GY1mwJ46Qz9qOwTgMtZL0fReGh7gCeDKy5"); // , "ACCESS_TOKEN_SECRET"
                    var client = new TwitterClient(credentials);

                    if (link.Value.Contains("status"))
                    {
                        var arr = link.Value.Split('/');
                        var hasParsed = long.TryParse(arr[arr.Length - 1], out long tweetId);
                        if (hasParsed)
                        {
                            var tweet = await client.Tweets.GetTweetAsync(tweetId);
                            var oEmbedTweet = await client.Tweets.GetOEmbedTweetAsync(tweet);

                            var card = new PreviewCard
                            {
                                Url = oEmbedTweet.URL,
                                Title = oEmbedTweet.AuthorName + " on Twitter",
                                Description = tweet.Text,
                                Type = PreviewCardType.Link,
                                AuthorName = oEmbedTweet.AuthorName,
                                AuthorUrl = oEmbedTweet.AuthorURL,
                                ProviderName = "Twitter",
                                ProviderUrl = oEmbedTweet.ProviderURL,
                                Html = oEmbedTweet.HTML,
                                Width = tweet.Media.Any() ? tweet.Media[0].Sizes["small"].Width.Value : 400,
                                Height = tweet.Media.Any() ? tweet.Media[0].Sizes["small"].Height.Value : 400,
                                // image

                                EmbedUrl = "",
                                Blurhash = "",
                                CreatedAt = DateTime.UtcNow,
                            };

                            var mediaUrl = "";
                            var mediaType = "";
                            if (tweet.Media.Any())
                            {
                                mediaUrl = tweet.Media[0].MediaURLHttps;
                                mediaType = tweet.Media[0].MediaType;
                            }
                            else if (tweet.CreatedBy != null)
                            {
                                mediaUrl = tweet.CreatedBy.ProfileImageUrl400x400;
                                mediaType = "photo";
                            }
                            else
                            {
                                mediaUrl = null;
                                mediaType = null;
                            }

                            if (mediaUrl != null)
                            {
                                using (HttpClient httpClient = new HttpClient())
                                {
                                    using (HttpResponseMessage response = await httpClient.GetAsync(mediaUrl))
                                    using (Stream streamToReadFrom = await response.Content.ReadAsStreamAsync())
                                    {
                                        var binary = StreamToBinary(streamToReadFrom);

                                        var mimeType = mediaType == "photo" ? "image/" : "video/";

                                        var tokens = mediaUrl.Split('/');

                                        var fileName = tokens[tokens.Length - 1];
                                        var ext = fileName.Split('.')[1];
                                        mimeType += ext;

                                        var picture = await this.pictureService.InsertPictureAsync(binary, mimeType, this.fileProvider.GetFileNameWithoutExtension(fileName));

                                        if (picture != null)
                                        {
                                            card.PictureId = picture.Id;
                                            card.Blurhash = picture.Blurhash;
                                            card.ImageFileName = picture.SeoFilename;
                                            card.ImageContentType = picture.MimeType;

                                            // width and height?

                                            await this.previewCardService.Create(card);

                                            var previewCardPost = new PreviewCardPost
                                            {
                                                PostId = postNew.Id,
                                                PreviewCardId = card.Id,
                                            };

                                            await this.previewCardService.CreatePreviewCardPost(previewCardPost);
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }

            if (mediaIds != null)
            {
                var pictures = new List<PostPicture>();
                for (int i = 0; i < mediaIds.Length; i++)
                {
                    pictures.Add(new PostPicture
                    {
                        PostId = postNew.Id,
                        PictureId = mediaIds[i],
                    });
                }

                await this.postPictureRepository.InsertAsync(pictures);
            }

            return postNew;
        }

        /// <summary>
        /// Search products
        /// </summary>
        /// <param name="pageIndex">Page index</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="categoryIds">Category identifiers</param>
        /// <param name="manufacturerIds">Manufacturer identifiers</param>
        /// <param name="storeId">Store identifier; 0 to load all records</param>
        /// <param name="vendorId">Vendor identifier; 0 to load all records</param>
        /// <param name="warehouseId">Warehouse identifier; 0 to load all records</param>
        /// <param name="productType">Product type; 0 to load all records</param>
        /// <param name="visibleIndividuallyOnly">A values indicating whether to load only products marked as "visible individually"; "false" to load all records; "true" to load "visible individually" only</param>
        /// <param name="excludeFeaturedProducts">A value indicating whether loaded products are marked as featured (relates only to categories and manufacturers); "false" (by default) to load all records; "true" to exclude featured products from results</param>
        /// <param name="priceMin">Minimum price; null to load all records</param>
        /// <param name="priceMax">Maximum price; null to load all records</param>
        /// <param name="productTagId">Product tag identifier; 0 to load all records</param>
        /// <param name="keywords">Keywords</param>
        /// <param name="searchDescriptions">A value indicating whether to search by a specified "keyword" in product descriptions</param>
        /// <param name="searchManufacturerPartNumber">A value indicating whether to search by a specified "keyword" in manufacturer part number</param>
        /// <param name="searchSku">A value indicating whether to search by a specified "keyword" in product SKU</param>
        /// <param name="searchProductTags">A value indicating whether to search by a specified "keyword" in product tags</param>
        /// <param name="languageId">Language identifier (search for text searching)</param>
        /// <param name="filteredSpecOptions">Specification options list to filter products; null to load all records</param>
        /// <param name="orderBy">Order by</param>
        /// <param name="showHidden">A value indicating whether to show hidden records</param>
        /// <param name="overridePublished">
        /// null - process "Published" property according to "showHidden" parameter
        /// true - load only "Published" products
        /// false - load only "Unpublished" products
        /// </param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the products
        /// </returns>
        public async Task<IPagedList<Post>> SearchProductsAsync(
            int pageIndex = 0,
            int pageSize = int.MaxValue,
            IList<int> categoryIds = null,
            IList<int> manufacturerIds = null,
            int storeId = 0,
            int vendorId = 0,
            int warehouseId = 0,
            bool visibleIndividuallyOnly = false,
            bool excludeFeaturedProducts = false,
            decimal? priceMin = null,
            decimal? priceMax = null,
            int productTagId = 0,
            int[] postTagsIds = null,
            string keywords = null,
            bool searchDescriptions = false,
            bool searchManufacturerPartNumber = true,
            bool searchSku = true,
            bool searchProductTags = false,
            int languageId = 0,
            ProductSortingEnum orderBy = ProductSortingEnum.Match,
            bool showHidden = false,
            bool? overridePublished = null,
            DateTime? originallyPublishedStartDate = null,
            DateTime? originallyPublishedEndDate = null,
            DateTime? startDate = null)
        {
            // some databases don't support int.MaxValue
            if (pageSize == int.MaxValue)
            {
                pageSize = int.MaxValue - 1;
            }

            // get parameters to filter posts
            var startDateValue = originallyPublishedStartDate == null ? null
                : (DateTime?) this.dateTimeHelper.ConvertToUtcTime(originallyPublishedStartDate.Value, await this.dateTimeHelper.GetCurrentTimeZoneAsync());
            var endDateValue = originallyPublishedEndDate == null ? null
                : (DateTime?)this.dateTimeHelper.ConvertToUtcTime(originallyPublishedEndDate.Value, await this.dateTimeHelper.GetCurrentTimeZoneAsync()).AddDays(1);

            var postsQuery = this.postsRepository.Table;

            postsQuery =
                from p in postsQuery
                where !p.Deleted
                select p;

            // filter by creation date
            if (startDateValue.HasValue)
                postsQuery = postsQuery.Where(post => startDateValue.Value <= post.CreatedAt);
            if (endDateValue.HasValue)
                postsQuery = postsQuery.Where(post => endDateValue.Value >= post.CreatedAt);

            if (startDate.HasValue)
            {
                var sd = this.dateTimeHelper.ConvertToUtcTime(startDate.Value, await this.dateTimeHelper.GetCurrentTimeZoneAsync()).AddDays(1);
                postsQuery = postsQuery.Where(post => post.CreatedAt >= sd.Date);
            }

            if (productTagId > 0)
            {
                postsQuery =
                    from p in postsQuery
                    join ptm in this.postTagRepository.Table on p.Id equals ptm.PostId
                    where ptm.TagId == productTagId
                    select p;
            }

            // postsQuery = postsQuery.Where(p => p.Tags.All(t => postTagsIds.Contains(t.Id)));

            else if (postTagsIds != null)
            {
                // var test = await postsQuery.WhereAwait(async p => (await this.postTagService.GetAllPostTagsByPostIdAsync(p.Id)).All(t => postTagsIds.Contains(t.Id))).ToListAsync();
                postsQuery =
                  from p in postsQuery
                  join ptm in this.postTagRepository.Table on p.Id equals ptm.PostId
                  where postTagsIds.Contains(ptm.TagId)
                  select p;
            }

            return await postsQuery.OrderBy(orderBy).ToPagedListAsync(pageIndex, pageSize);
        }

        private static byte[] StreamToBinary(Stream stream)
        {
            if (stream == null)
            {
                return null;
            }

            byte[] binary;

            using (var tempMemStream = new MemoryStream())
            {
                byte[] buffer = new byte[128];

                while (true)
                {
                    int read = stream.Read(buffer, 0, buffer.Length);

                    if (read <= 0)
                    {
                        binary = tempMemStream.ToArray();
                        break;
                    }

                    tempMemStream.Write(buffer, 0, read);
                }
            }

            return binary;
        }

        /// <summary>
        /// Gets product
        /// </summary>
        /// <param name="productId">Product identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product
        /// </returns>
        public virtual async Task<Post> GetPostByIdAsync(int postId, bool includeDeleted = false)
        {
            return await this.postsRepository.GetByIdAsync(postId, cache => default, includeDeleted: includeDeleted);
        }

        /// <summary>
        /// Get posts by identifiers
        /// </summary>
        /// <param name="productIds">Post identifiers</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the products
        /// </returns>
        public virtual async Task<IList<Post>> GetPostsByIdsAsync(int[] postIds)
        {
            return await this.postsRepository.GetByIdsAsync(postIds, cache => default, false);
        }

        public virtual async Task<IList<Post>> GetHomeTimeline(bool ascSort = false,
            int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var currentUser = await this._workContext.GetCurrentCustomerAsync();
            var blockerIds = new List<int>() { currentUser.Id };

           // no way this works... :D | 11/1/2021, 17:29
           var blocklistQuery = (from table in this.userBlocklistRepository.Table
                                  where blockerIds.Contains(table.UserId)
                                  select table.TargetUserId)
                                   .Union
                                   (from users in this.customerRepository.Table
                                    join pt in this.userBlocklistRepository.Table on users.Id equals pt.TargetUserId
                                    where blockerIds.Contains(pt.UserId)
                                    select users.Id);

            var posts = await this.postsRepository.GetAllPagedAsync(query =>
            {
                //query = ascSort
                //    ? query.OrderBy(fp => fp.CreatedAt).ThenBy(fp => fp.Id)
                //    : query.OrderByDescending(fp => fp.CreatedAt);

                query = query.OrderByDescending(p => p.CreatedAt);

                query = query.Where(p => blocklistQuery.Contains(p.UserId) == false);

                return query;

            }, pageIndex, pageSize);


            return posts;
        }

        public async Task<IPagedList<Post>> GetUserProfileTimeline(int userId, bool ascSort = false, bool onlyMedia = false,
            int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var profilePosts = await this.postsRepository.GetAllPagedAsync(query =>
            {
                query = query.Where(p => p.UserId == userId);

                query = query.Where(p => p.Pinned == false);

                if (onlyMedia)
                {
                    query = query.Where(p => p.HasMedia);
                }

                //query = ascSort
                //    ? query.OrderBy(fp => fp.CreatedAt).ThenBy(fp => fp.Id)
                //    : query.OrderByDescending(fp => fp.CreatedAt).ThenBy(fp => fp.Id);

                query = query.OrderByDescending(p => p.CreatedAt);

                return query;

            }, pageIndex, pageSize);

            return profilePosts;
        }


        public async Task<PostVote> InsertPostVoteAsync(int postId, int userId, PostRateType rateType)
        {
            var accountInstance = await this.userService.GetCustomerByIdAsync(userId);
            var postInstance = await this.GetPostByIdAsync(postId);

            var previousRate = await this.GetPostVoteAsync(postId, accountInstance);

            // Same rate, nothing do to
            if (rateType == PostRateType.None && previousRate == null || previousRate?.Type == rateType)
            {
                return null;
            }

            var likesToIncrement = 0;
            var dislikesToIncrement = 0;

            if (rateType == PostRateType.Like)
            {
                likesToIncrement++;
            }

            else if (rateType == PostRateType.Dislike)
            {
                dislikesToIncrement++;
            }


            // There was a previous rate, update it 
            if (previousRate != null)
            {
                // We will remove the previous rate, so we will need to update the video count attribute
                if (previousRate.Type == PostRateType.Like)
                {
                    likesToIncrement--;
                }
                else if (previousRate.Type == PostRateType.Dislike)
                {
                    dislikesToIncrement--;
                }

                if (rateType == PostRateType.None) // Destroy previous rate
                {
                    await this.postVoteRepository.DeleteAsync(previousRate);
                }
                else // Update previous rate
                {
                    previousRate.Type = rateType;
                    await this.postVoteRepository.UpdateAsync(previousRate);
                }
            }
            else if (rateType != PostRateType.None) // There was not a previous rate, insert a new one if there is a rate
            {
                var rate = new PostVote
                {
                    UserId = accountInstance.Id,
                    PostId = postInstance.Id,
                    Type = rateType,
                    CreatedOnUtc = DateTime.UtcNow,
                };

                await this.postVoteRepository.InsertAsync(rate);

                await this.UpdatePost(postInstance, likesToIncrement, dislikesToIncrement);
                return rate;
            }

            // update post
            await this.UpdatePost(postInstance, likesToIncrement, dislikesToIncrement);

            return null;
        }

        private async Task UpdatePost(Post postInstance, int likesToIncrement, int dislikesToIncrement)
        {
            postInstance.FavoriteCount += likesToIncrement;
            postInstance.DislikeCount += dislikesToIncrement;

            await UpdatePostAsync(postInstance);
        }

        /// <summary>
        /// Get a post vote 
        /// </summary>
        /// <param name="postId">Post identifier</param>
        /// <param name="customer">Customer</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the post vote
        /// </returns>
        public virtual async Task<PostVote> GetPostVoteAsync(int postId, Customer customer)
        {
            if (customer == null)
            {
                return null;
            }

            return await this.postVoteRepository.Table
                .FirstOrDefaultAsyncExt(pv => pv.PostId == postId && pv.UserId == customer.Id);
        }

        /// <summary>
        /// Get post vote made since the parameter date
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="сreatedFromUtc">Date</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the post votes count
        /// </returns>
        public virtual async Task<int> GetNumberOfPostVotesAsync(Customer customer)
        {
            if (customer == null)
            {
                return 0;
            }

            return await this.postVoteRepository.Table
                .CountAsyncExt(p => p.UserId == customer.Id);
        }

        /// <summary>
        /// Delete a post vote
        /// </summary>
        /// <param name="postVote">Post vote</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task DeletePostVoteAsync(PostVote postVote)
        {
            if (postVote == null)
            {
                throw new ArgumentNullException(nameof(postVote));
            }

            //await postVoteRepository.DeleteAsync(postVote);

            //// update post
            //var post = await GetPostByIdAsync(postVote.PostId);
            //post.FavoriteCount = postVote.IsUp ? --post.FavoriteCount : ++post.FavoriteCount;

            //await this.UpdatePostAsync(post);
        }

        public async Task<IList<Customer>> GetLikers(int postId)
        {
            var votes = this.postVoteRepository.Table
                .Where(pv => pv.PostId == postId)
                .ToList();

            var users = await this.userService.GetCustomersByIdsAsync(votes.Select(v => v.UserId).ToArray());

            var userId = (await _workContext.GetCurrentCustomerAsync()).Id;

            var loggedinUserRelationships = await this.relationshipRepository.Table.Where(r => r.SourceId == userId).ToListAsync();

            for (int i = 0; i < users.Count; i++)
            {
                var user = users[i];

                var currentRelationship = loggedinUserRelationships.Where(r => r.TargetId == user.Id).FirstOrDefault();

                if (currentRelationship == null)
                {
                    continue;
                }

                if (currentRelationship.Following)
                {
                    user.Following = true;
                }

                user.Following = currentRelationship.Following;
                user.FollowedBy = currentRelationship.FollowedBy;
                user.FollowRequestSent = currentRelationship.Requested;
            }

            return users;
        }

        public async Task<IList<Customer>> GetReposters(int postId)
        {
            var reposts = await this.postsRepository.GetAllAsync(query =>
            {
                query = query.Where(pv => pv.RepostId == postId);

                return query;

            });

            var users = await this.userService.GetCustomersByIdsAsync(reposts.Select(v => v.UserId).ToArray());

            var userId = (await _workContext.GetCurrentCustomerAsync()).Id;

            var loggedinUserRelationships = await this.relationshipRepository.Table.Where(r => r.SourceId == userId).ToListAsync();

            for (int i = 0; i < users.Count; i++)
            {
                var user = users[i];

                var currentRelationship = loggedinUserRelationships.Where(r => r.TargetId == user.Id).FirstOrDefault();

                if (currentRelationship == null)
                {
                    continue;
                }

                if (currentRelationship.Following)
                {
                    user.Following = true;
                }

                user.Following = currentRelationship.Following;
                user.FollowedBy = currentRelationship.FollowedBy;
                user.FollowRequestSent = currentRelationship.Requested;
            }

            return users;
        }

        public async Task<int> GetPostsCountByUserId(int userId)
        {
            if (userId == 0)
            {
                return 0;
            }

            return await this.postsRepository.Table.CountAsyncExt(p => p.UserId == userId && !p.Deleted);
        }

        /// <summary>
        /// Check whether customer is allowed to delete post
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="post">Topic</param>
        /// <returns>True if allowed, otherwise false</returns>
        public async Task<bool> IsCustomerAllowedToDeletePostAsync(Customer customer, Post post)
        {
            if (post == null)
            {
                return false;
            }

            if (customer == null)
            {
                return false;
            }

            if (await userService.IsGuestAsync(customer))
            {
                return false;
            }

            if (await userService.IsForumModeratorAsync(customer))
            {
                return true;
            }

            var ownPost = customer.Id == post.UserId;

            return ownPost;
        }

        /// <summary>
        /// Gets a forum topic
        /// </summary>
        /// <param name="forumTopicId">The forum topic identifier</param>
        /// <param name="increaseViews">The value indicating whether to increase forum topic views</param>
        /// <returns>Forum Topic</returns>
        protected async Task<Poll> GetTopicByIdAsync(int forumTopicId, bool increaseViews)
        {
            var poll = await this.pollService.GetPollByIdAsync(forumTopicId);

            if (poll == null)
            {
                return null;
            }

            return poll;
        }

        /// <summary>
        /// Gets a product pictures by product identifier
        /// </summary>
        /// <param name="productId">The product identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product pictures
        /// </returns>
        public virtual async Task<IList<PostPicture>> GetProductPicturesByProductIdAsync(int productId)
        {
            var query = from pp in this.postPictureRepository.Table
                        where pp.PostId == productId
                        orderby pp.DisplayOrder, pp.Id
                        select pp;

            var productPictures = await query.ToListAsync();

            return productPictures;
        }

        /// <summary>
        /// Gets a product picture
        /// </summary>
        /// <param name="productPictureId">Product picture identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product picture
        /// </returns>
        public virtual async Task<PostPicture> GetProductPictureByIdAsync(int productPictureId)
        {
            return await this.postPictureRepository.GetByIdAsync(productPictureId, cache => default);
        }

        public async Task DeleteProductAsync(Post product)
        {
            var reposts = this.postsRepository.Table.Where(p => p.RepostId.HasValue && p.RepostId.Value == product.Id)
                .ToList();

            await this.postsRepository.DeleteAsync(product);
            await this.postsRepository.DeleteAsync(reposts);

            //var sharedPostsFromThisPost = this.postReshareRepository.Table
            //    .Where(rs => rs.PostId == product.Id); // && !rs.IsDeleted

            //if (sharedPostsFromThisPost != null)
            //{
            //    foreach (var item in sharedPostsFromThisPost)
            //    {
            //       var current = this.postsRepository.Table.Where(p => p.Id == item.ResharedPostId)
            //            .FirstOrDefault();

            //        if (current == null)
            //        {
            //            continue;
            //        }

            //        await this.postReshareRepository.DeleteAsync(item);
            //        await this.postsRepository.DeleteAsync(current);
            //    }

            //}

            //if (product.Reshared)
            //{
            //    var curr = await this.postReshareRepository.Table
            //        .Where(x => x.ResharedPostId == product.Id)
            //        .FirstOrDefaultAsync();

            //    await this.postReshareRepository.DeleteAsync(curr);
            //}

            //await this.postsRepository.DeleteAsync(product);
        }

        //public async Task Unshare(Post product)
        //{
        //    var curr = await this.postReshareRepository.Table
        //           .Where(x => x.ResharedPostId == product.Id)
        //           .FirstOrDefaultAsync();

        //    if (curr == null)
        //    {
        //        // parent post
        //        var res = await this.postReshareRepository.Table
        //           .Where(x => x.PostId == product.Id)
        //           .FirstOrDefaultAsync();

        //        var theActualSharedPost = await this.postsRepository.Table.Where(p => p.Id == res.ResharedPostId).FirstOrDefaultAsync();

        //        await this.postsRepository.DeleteAsync(theActualSharedPost);
        //        await this.postReshareRepository.DeleteAsync(res);
        //    }
        //    else
        //    {
        //        var theActualSharedPost = await this.postsRepository.Table.Where(p => p.Id == curr.ResharedPostId).FirstOrDefaultAsync();

        //        await this.postReshareRepository.DeleteAsync(curr);
        //        await this.postsRepository.DeleteAsync(theActualSharedPost);
        //    }
        //}

        /// <summary>
        /// Updates the post
        /// </summary>
        /// <param name="post"> post</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdatePostAsync(Post post)
        {
            await this.postsRepository.UpdateAsync(post);
        }

        public async Task<Customer> LoadAccountIdFromVideo(int postId)
        {
            var post = await this.GetPostByIdAsync(postId);

            var user = await this.userService.GetCustomerByIdAsync(post.UserId);

            return user;
        }

        public async Task<PostVote> GetPostVoteByIdAsync(int postVoteId)
        {
            return await this.postVoteRepository.GetByIdAsync(postVoteId, cache => default);
        }

        public async Task<Post> GetPinnedPost(int userId)
        {
            var pinnedPost = await this.postsRepository.Table.Where(p => p.UserId == userId && p.Pinned == true && !p.Deleted)
                .FirstOrDefaultAsyncExt();

            return pinnedPost;
        }

        public async Task<Post> GetRepostStatus(int postId, int userId)
        {
            var res = await this.postsRepository.Table
                .Where(rs => rs.RepostId.Value == postId && userId == rs.UserId && !rs.Deleted)
                .FirstOrDefaultAsyncExt();

            return res;
        }

        /// <summary>
        /// Gets all comments
        /// </summary>
        /// <param name="customerId">Customer identifier; 0 to load all records</param>
        /// <param name="storeId">Store identifier; pass 0 to load all records</param>
        /// <param name="blogPostId">Blog post ID; 0 or null to load all records</param>
        /// <param name="approved">A value indicating whether to content is approved; null to load all records</param> 
        /// <param name="fromUtc">Item creation from; null to load all records</param>
        /// <param name="toUtc">Item creation to; null to load all records</param>
        /// <param name="commentText">Search comment text; null to load all records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the comments
        /// </returns>
        public async Task<IList<PostComment>> GetAllCommentsAsync(int customerId = 0, int storeId = 0, int? blogPostId = null,
            bool? approved = null, DateTime? fromUtc = null, DateTime? toUtc = null, string commentText = null)
        {
            return await this.postCommentRepositoy.GetAllAsync(query =>
            {
                if (blogPostId > 0)
                    query = query.Where(comment => comment.PostId == blogPostId);

                if (customerId > 0)
                    query = query.Where(comment => comment.UserId == customerId);

                if (fromUtc.HasValue)
                    query = query.Where(comment => fromUtc.Value <= comment.CreatedAt);

                if (toUtc.HasValue)
                    query = query.Where(comment => toUtc.Value >= comment.CreatedAt);

                if (!string.IsNullOrEmpty(commentText))
                    query = query.Where(c => c.Text.Contains(commentText));

                query = query.OrderBy(comment => comment.CreatedAt);

                return query;
            });
        }

        /// <summary>
        /// Deletes blog comments
        /// </summary>
        /// <param name="blogComments">Blog comments</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task DeleteBlogCommentsAsync(IList<PostComment> blogComments)
        {
            await this.postCommentRepositoy.DeleteAsync(blogComments);
        }

        public async Task<IList<Post>> GetPostsByUserId(int userId)
        {
            return await this.postsRepository.GetAllAsync(query =>
            {
                if (userId > 0)
                {
                    query = query.Where(comment => comment.UserId == userId);
                }

                return query;
            });
        }

        /// <summary>
        /// Delete posts
        /// </summary>
        /// <param name="posts">Products</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task DeletePostsAsync(IList<Post> posts)
        {
            await this.postsRepository.DeleteAsync(posts);
        }
    }
}
