using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Sharebook.Data;

namespace Chessbook.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumberType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GenericAttributes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntityId = table.Column<int>(type: "int", nullable: false),
                    KeyGroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    CreatedOrUpdatedDateUTC = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenericAttributes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Indices",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IndexFirst = table.Column<int>(type: "int", nullable: false),
                    IndexSecond = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Indices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MediaEntitySizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MediaId = table.Column<int>(type: "int", nullable: false),
                    Variant = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Width = table.Column<int>(type: "int", nullable: true),
                    Height = table.Column<int>(type: "int", nullable: true),
                    Resize = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaEntitySizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pictures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MimeType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SeoFilename = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AltAttribute = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TitleAttribute = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsNew = table.Column<bool>(type: "bit", nullable: false),
                    VirtualPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Polls",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LanguageId = table.Column<int>(type: "int", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SystemKeyword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Published = table.Column<bool>(type: "bit", nullable: false),
                    ShowOnHomepage = table.Column<bool>(type: "bit", nullable: false),
                    AllowGuestsToVote = table.Column<bool>(type: "bit", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    LimitedToStores = table.Column<bool>(type: "bit", nullable: false),
                    StartDateUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDateUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsSurvey = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polls", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PollVotingRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PollAnswerId = table.Column<int>(type: "int", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PollVotingRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PostsPictures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    PictureId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostsPictures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: true),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MyProperty = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ScreenName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Protected = table.Column<bool>(type: "bit", nullable: false),
                    FollowersCount = table.Column<int>(type: "int", nullable: false),
                    FriendsCount = table.Column<int>(type: "int", nullable: false),
                    ListedCount = table.Column<int>(type: "int", nullable: false),
                    FavouritesCount = table.Column<int>(type: "int", nullable: false),
                    UtcOffset = table.Column<int>(type: "int", nullable: false),
                    TimeZone = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GeoEnabled = table.Column<bool>(type: "bit", nullable: false),
                    Verified = table.Column<bool>(type: "bit", nullable: false),
                    StatusesCount = table.Column<int>(type: "int", nullable: false),
                    MediaCount = table.Column<int>(type: "int", nullable: false),
                    Lang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContributorsEnabled = table.Column<bool>(type: "bit", nullable: false),
                    IsTranslator = table.Column<bool>(type: "bit", nullable: false),
                    IsTranslationEnabled = table.Column<bool>(type: "bit", nullable: false),
                    ProfileBackgroundColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileBackgroundImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileBackgroundImageUrlHttps = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileBackgroundTile = table.Column<bool>(type: "bit", nullable: false),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfilePictureId = table.Column<int>(type: "int", nullable: false),
                    ProfileBannerUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileLinkColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileSidebarBorderColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileSidebarFillColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileTextColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileUseBackgroundImage = table.Column<bool>(type: "bit", nullable: false),
                    DefaultProfile = table.Column<bool>(type: "bit", nullable: false),
                    DefaultProfileImage = table.Column<bool>(type: "bit", nullable: false),
                    FavoritesCount = table.Column<int>(type: "int", nullable: false),
                    PinnedTweetIds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HasCustomTimelines = table.Column<bool>(type: "bit", nullable: false),
                    CanMediaTag = table.Column<bool>(type: "bit", nullable: false),
                    FollowedBy = table.Column<bool>(type: "bit", nullable: false),
                    Following = table.Column<bool>(type: "bit", nullable: false),
                    FollowRequestSent = table.Column<bool>(type: "bit", nullable: false),
                    Notifications = table.Column<bool>(type: "bit", nullable: false),
                    Blocking = table.Column<bool>(type: "bit", nullable: false),
                    BusinessProfileState = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TranslatorType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequireSomeConsent = table.Column<bool>(type: "bit", nullable: false),
                    Day = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Visibility = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VisibilityYear = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AlwaysUseHttps = table.Column<bool>(type: "bit", nullable: false),
                    DiscoverableByEmail = table.Column<bool>(type: "bit", nullable: false),
                    DiscoverableByMobilePhone = table.Column<bool>(type: "bit", nullable: false),
                    UseCookiePersonalization = table.Column<bool>(type: "bit", nullable: false),
                    DisplaySensitiveMedia = table.Column<bool>(type: "bit", nullable: false),
                    SmartMute = table.Column<bool>(type: "bit", nullable: false),
                    SleepTimeEnabled = table.Column<bool>(type: "bit", nullable: false),
                    StartSleepHour = table.Column<int>(type: "int", nullable: false),
                    EndSleepHour = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactPhotos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContactPhotos_Contacts_Id",
                        column: x => x.Id,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PhoneCalls",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateOfCall = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ContactId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneCalls", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhoneCalls_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PollAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PollId = table.Column<int>(type: "int", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Votes = table.Column<int>(type: "int", nullable: false),
                    Position = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PollAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PollAnswers_Polls_PollId",
                        column: x => x.PollId,
                        principalTable: "Polls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Suffix = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Truncated = table.Column<bool>(type: "bit", nullable: false),
                    UrlsIds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserMentionsIds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HashtagsIds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SymbolsIds = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PollId = table.Column<int>(type: "int", nullable: true),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InReplyToStatusId = table.Column<int>(type: "int", nullable: false),
                    InReplyToStatusIdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InReplyToUserId = table.Column<int>(type: "int", nullable: false),
                    InReplyToUserIdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InReplyToScreenName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Geo_Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Coordinates_Longitude = table.Column<double>(type: "float", nullable: true),
                    Coordinates_Latitude = table.Column<double>(type: "float", nullable: true),
                    Place_Id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Place_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Place_FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Place_Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Place_PlaceType = table.Column<int>(type: "int", nullable: true),
                    Place_Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Place_CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Place_BoundingBox_Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Place_Geometry_Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contributors = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsQuoteStatus = table.Column<bool>(type: "bit", nullable: false),
                    RetweetCount = table.Column<int>(type: "int", nullable: false),
                    FavoriteCount = table.Column<long>(type: "bigint", nullable: false),
                    DislikeCount = table.Column<long>(type: "bigint", nullable: false),
                    ReplyCount = table.Column<int>(type: "int", nullable: false),
                    QuoteCount = table.Column<int>(type: "int", nullable: false),
                    Favorited = table.Column<bool>(type: "bit", nullable: false),
                    Retweeted = table.Column<bool>(type: "bit", nullable: false),
                    PossiblySensitive = table.Column<bool>(type: "bit", nullable: false),
                    PossiblySensitiveEditable = table.Column<bool>(type: "bit", nullable: false),
                    Lang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SupplementalLanguage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Polls_PollId",
                        column: x => x.PollId,
                        principalTable: "Polls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Posts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ThemeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Settings_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaims_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserPhotos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPhotos_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    UserId1 = table.Column<int>(type: "int", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CommenterName = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    EntityTypeId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    EntityId = table.Column<long>(type: "bigint", nullable: false),
                    ParentId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Comments_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HashtagEntities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IndicesId = table.Column<int>(type: "int", nullable: false),
                    IndicesId1 = table.Column<long>(type: "bigint", nullable: true),
                    PostId = table.Column<int>(type: "int", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HashtagEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HashtagEntities_Indices_IndicesId1",
                        column: x => x.IndicesId1,
                        principalTable: "Indices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HashtagEntities_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MediaEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Directory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Size = table.Column<long>(type: "bigint", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpandedURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MediaURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MediaURLHttps = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IndicesId = table.Column<int>(type: "int", nullable: false),
                    IndicesId1 = table.Column<long>(type: "bigint", nullable: true),
                    PostId = table.Column<int>(type: "int", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MediaEntities_Indices_IndicesId1",
                        column: x => x.IndicesId1,
                        principalTable: "Indices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MediaEntities_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PostVotes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostId = table.Column<long>(type: "bigint", nullable: false),
                    PostId1 = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostVotes_Posts_PostId1",
                        column: x => x.PostId1,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PostVotes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SymbolEntities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IndicesId = table.Column<int>(type: "int", nullable: false),
                    IndicesId1 = table.Column<long>(type: "bigint", nullable: true),
                    PostId = table.Column<int>(type: "int", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SymbolEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SymbolEntities_Indices_IndicesId1",
                        column: x => x.IndicesId1,
                        principalTable: "Indices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SymbolEntities_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UrlEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayedURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpandedURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IndicesId = table.Column<int>(type: "int", nullable: false),
                    IndicesId1 = table.Column<long>(type: "bigint", nullable: true),
                    PostId = table.Column<int>(type: "int", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrlEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrlEntities_Indices_IndicesId1",
                        column: x => x.IndicesId1,
                        principalTable: "Indices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UrlEntities_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserMentionEntities",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ScreenName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IndicesId = table.Column<int>(type: "int", nullable: false),
                    IndicesId1 = table.Column<long>(type: "bigint", nullable: true),
                    PostId = table.Column<int>(type: "int", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMentionEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMentionEntities_Indices_IndicesId1",
                        column: x => x.IndicesId1,
                        principalTable: "Indices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserMentionEntities_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_IsDeleted",
                table: "Comments",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ParentId",
                table: "Comments",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId1",
                table: "Comments",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_HashtagEntities_IndicesId1",
                table: "HashtagEntities",
                column: "IndicesId1");

            migrationBuilder.CreateIndex(
                name: "IX_HashtagEntities_IsDeleted",
                table: "HashtagEntities",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_HashtagEntities_PostId",
                table: "HashtagEntities",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Indices_IsDeleted",
                table: "Indices",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_MediaEntities_IndicesId1",
                table: "MediaEntities",
                column: "IndicesId1");

            migrationBuilder.CreateIndex(
                name: "IX_MediaEntities_IsDeleted",
                table: "MediaEntities",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_MediaEntities_PostId",
                table: "MediaEntities",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneCalls_ContactId",
                table: "PhoneCalls",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_PollAnswers_PollId",
                table: "PollAnswers",
                column: "PollId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_IsDeleted",
                table: "Posts",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_PollId",
                table: "Posts",
                column: "PollId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PostVotes_IsDeleted",
                table: "PostVotes",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_PostVotes_PostId1",
                table: "PostVotes",
                column: "PostId1");

            migrationBuilder.CreateIndex(
                name: "IX_PostVotes_UserId",
                table: "PostVotes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SymbolEntities_IndicesId1",
                table: "SymbolEntities",
                column: "IndicesId1");

            migrationBuilder.CreateIndex(
                name: "IX_SymbolEntities_IsDeleted",
                table: "SymbolEntities",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_SymbolEntities_PostId",
                table: "SymbolEntities",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_UrlEntities_IndicesId1",
                table: "UrlEntities",
                column: "IndicesId1");

            migrationBuilder.CreateIndex(
                name: "IX_UrlEntities_IsDeleted",
                table: "UrlEntities",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_UrlEntities_PostId",
                table: "UrlEntities",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_UserClaims_UserId",
                table: "UserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMentionEntities_IndicesId1",
                table: "UserMentionEntities",
                column: "IndicesId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserMentionEntities_IsDeleted",
                table: "UserMentionEntities",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_UserMentionEntities_PostId",
                table: "UserMentionEntities",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            // Seed initial data
            migrationBuilder.Sql(SeedData.Initial("dbo"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "ContactPhotos");

            migrationBuilder.DropTable(
                name: "GenericAttributes");

            migrationBuilder.DropTable(
                name: "HashtagEntities");

            migrationBuilder.DropTable(
                name: "MediaEntities");

            migrationBuilder.DropTable(
                name: "MediaEntitySizes");

            migrationBuilder.DropTable(
                name: "PhoneCalls");

            migrationBuilder.DropTable(
                name: "Pictures");

            migrationBuilder.DropTable(
                name: "PollAnswers");

            migrationBuilder.DropTable(
                name: "PollVotingRecords");

            migrationBuilder.DropTable(
                name: "PostsPictures");

            migrationBuilder.DropTable(
                name: "PostVotes");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "SymbolEntities");

            migrationBuilder.DropTable(
                name: "UrlEntities");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserMentionEntities");

            migrationBuilder.DropTable(
                name: "UserPhotos");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Indices");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Polls");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
