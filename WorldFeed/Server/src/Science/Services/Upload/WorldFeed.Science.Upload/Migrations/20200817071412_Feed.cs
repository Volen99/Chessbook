using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WorldFeed.Science.Upload.Migrations
{
    public partial class Feed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Feed_FeedId",
                table: "Media");

            migrationBuilder.DropForeignKey(
                name: "FK_Media_Post_PostId",
                table: "Media");

            migrationBuilder.DropTable(
                name: "Feed");

            migrationBuilder.DropTable(
                name: "Text");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Media_PostId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Media");

            migrationBuilder.CreateTable(
                name: "ExtendedEntities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtendedEntities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FeedEntities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedEntities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GeoFeed",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeoFeed", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VideoFeedInformationEntity",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    AspectRatio = table.Column<string>(nullable: true),
                    DurationInMilliseconds = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoFeedInformationEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HashtagFeedEntity",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Text = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    FeedEntitiesId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HashtagFeedEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HashtagFeedEntity_FeedEntities_FeedEntitiesId",
                        column: x => x.FeedEntitiesId,
                        principalTable: "FeedEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SymbolFeedEntity",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Text = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    FeedEntitiesId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SymbolFeedEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SymbolFeedEntity_FeedEntities_FeedEntitiesId",
                        column: x => x.FeedEntitiesId,
                        principalTable: "FeedEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserMentionFeedEntity",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdStr = table.Column<string>(nullable: true),
                    ScreenName = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    FeedEntitiesId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMentionFeedEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMentionFeedEntity_FeedEntities_FeedEntitiesId",
                        column: x => x.FeedEntitiesId,
                        principalTable: "FeedEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Longitude = table.Column<double>(nullable: false),
                    Latitude = table.Column<double>(nullable: false),
                    GeoFeedId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Coordinates_GeoFeed_GeoFeedId",
                        column: x => x.GeoFeedId,
                        principalTable: "GeoFeed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlaceFeed",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    PlaceType = table.Column<int>(nullable: false),
                    Country = table.Column<string>(nullable: true),
                    CountryCode = table.Column<string>(nullable: true),
                    BoundingBoxId = table.Column<long>(nullable: true),
                    GeometryId = table.Column<long>(nullable: true),
                    PlaceFeedId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceFeed", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaceFeed_GeoFeed_BoundingBoxId",
                        column: x => x.BoundingBoxId,
                        principalTable: "GeoFeed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlaceFeed_GeoFeed_GeometryId",
                        column: x => x.GeometryId,
                        principalTable: "GeoFeed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlaceFeed_PlaceFeed_PlaceFeedId",
                        column: x => x.PlaceFeedId,
                        principalTable: "PlaceFeed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MediaFeedEntity",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdStr = table.Column<string>(nullable: true),
                    MediaURL = table.Column<string>(nullable: true),
                    MediaURLHttps = table.Column<string>(nullable: true),
                    URL = table.Column<string>(nullable: true),
                    DisplayURL = table.Column<string>(nullable: true),
                    ExpandedURL = table.Column<string>(nullable: true),
                    MediaType = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    VideoFeedInformationEntityId = table.Column<long>(nullable: false),
                    ExtendedEntitiesId = table.Column<long>(nullable: true),
                    FeedEntitiesId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaFeedEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MediaFeedEntity_ExtendedEntities_ExtendedEntitiesId",
                        column: x => x.ExtendedEntitiesId,
                        principalTable: "ExtendedEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MediaFeedEntity_FeedEntities_FeedEntitiesId",
                        column: x => x.FeedEntitiesId,
                        principalTable: "FeedEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MediaFeedEntity_VideoFeedInformationEntity_VideoFeedInformationEntityId",
                        column: x => x.VideoFeedInformationEntityId,
                        principalTable: "VideoFeedInformationEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VideoFeedEntityVariant",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Bitrate = table.Column<int>(nullable: false),
                    ContentType = table.Column<string>(nullable: true),
                    URL = table.Column<string>(nullable: true),
                    VideoFeedInformationEntityId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoFeedEntityVariant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoFeedEntityVariant_VideoFeedInformationEntity_VideoFeedInformationEntityId",
                        column: x => x.VideoFeedInformationEntityId,
                        principalTable: "VideoFeedInformationEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Feeds",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    CreatedAt = table.Column<string>(nullable: true),
                    FullText = table.Column<string>(nullable: true),
                    Truncated = table.Column<bool>(nullable: false),
                    EntitiesId = table.Column<long>(nullable: false),
                    ExtendedEntitiesId = table.Column<long>(nullable: false),
                    Source = table.Column<string>(nullable: true),
                    InReplyToStatusId = table.Column<int>(nullable: false),
                    InReplyToStatusIdStr = table.Column<string>(nullable: true),
                    InReplyToUserId = table.Column<int>(nullable: false),
                    InReplyToUserIdStr = table.Column<string>(nullable: true),
                    InReplyToScreenName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    GeoId = table.Column<long>(nullable: false),
                    CoordinatesId = table.Column<long>(nullable: false),
                    PlaceId = table.Column<long>(nullable: false),
                    Contributors = table.Column<string>(nullable: true),
                    IsQuoteStatus = table.Column<bool>(nullable: false),
                    RetweetCount = table.Column<int>(nullable: false),
                    FavoriteCount = table.Column<int>(nullable: false),
                    ReplyCount = table.Column<int>(nullable: false),
                    QuoteCount = table.Column<int>(nullable: false),
                    Favorited = table.Column<bool>(nullable: false),
                    Retweeted = table.Column<bool>(nullable: false),
                    PossiblySensitive = table.Column<bool>(nullable: false),
                    PossiblySensitiveEditable = table.Column<bool>(nullable: false),
                    Lang = table.Column<string>(nullable: true),
                    SupplementalLanguage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feeds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Feeds_Coordinates_CoordinatesId",
                        column: x => x.CoordinatesId,
                        principalTable: "Coordinates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feeds_FeedEntities_EntitiesId",
                        column: x => x.EntitiesId,
                        principalTable: "FeedEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feeds_ExtendedEntities_ExtendedEntitiesId",
                        column: x => x.ExtendedEntitiesId,
                        principalTable: "ExtendedEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feeds_GeoFeed_GeoId",
                        column: x => x.GeoId,
                        principalTable: "GeoFeed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feeds_PlaceFeed_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "PlaceFeed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UrlFeedEntity",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    URL = table.Column<string>(nullable: true),
                    DisplayedURL = table.Column<string>(nullable: true),
                    ExpandedURL = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    FeedId = table.Column<long>(nullable: false),
                    FeedEntitiesId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrlFeedEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrlFeedEntity_FeedEntities_FeedEntitiesId",
                        column: x => x.FeedEntitiesId,
                        principalTable: "FeedEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UrlFeedEntity_Feeds_FeedId",
                        column: x => x.FeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coordinates_GeoFeedId",
                table: "Coordinates",
                column: "GeoFeedId");

            migrationBuilder.CreateIndex(
                name: "IX_Feeds_CoordinatesId",
                table: "Feeds",
                column: "CoordinatesId");

            migrationBuilder.CreateIndex(
                name: "IX_Feeds_EntitiesId",
                table: "Feeds",
                column: "EntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_Feeds_ExtendedEntitiesId",
                table: "Feeds",
                column: "ExtendedEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_Feeds_GeoId",
                table: "Feeds",
                column: "GeoId");

            migrationBuilder.CreateIndex(
                name: "IX_Feeds_PlaceId",
                table: "Feeds",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_HashtagFeedEntity_FeedEntitiesId",
                table: "HashtagFeedEntity",
                column: "FeedEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaFeedEntity_ExtendedEntitiesId",
                table: "MediaFeedEntity",
                column: "ExtendedEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaFeedEntity_FeedEntitiesId",
                table: "MediaFeedEntity",
                column: "FeedEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaFeedEntity_VideoFeedInformationEntityId",
                table: "MediaFeedEntity",
                column: "VideoFeedInformationEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceFeed_BoundingBoxId",
                table: "PlaceFeed",
                column: "BoundingBoxId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceFeed_GeometryId",
                table: "PlaceFeed",
                column: "GeometryId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceFeed_PlaceFeedId",
                table: "PlaceFeed",
                column: "PlaceFeedId");

            migrationBuilder.CreateIndex(
                name: "IX_SymbolFeedEntity_FeedEntitiesId",
                table: "SymbolFeedEntity",
                column: "FeedEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_UrlFeedEntity_FeedEntitiesId",
                table: "UrlFeedEntity",
                column: "FeedEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_UrlFeedEntity_FeedId",
                table: "UrlFeedEntity",
                column: "FeedId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMentionFeedEntity_FeedEntitiesId",
                table: "UserMentionFeedEntity",
                column: "FeedEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoFeedEntityVariant_VideoFeedInformationEntityId",
                table: "VideoFeedEntityVariant",
                column: "VideoFeedInformationEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Feeds_FeedId",
                table: "Media",
                column: "FeedId",
                principalTable: "Feeds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Feeds_FeedId",
                table: "Media");

            migrationBuilder.DropTable(
                name: "HashtagFeedEntity");

            migrationBuilder.DropTable(
                name: "MediaFeedEntity");

            migrationBuilder.DropTable(
                name: "SymbolFeedEntity");

            migrationBuilder.DropTable(
                name: "UrlFeedEntity");

            migrationBuilder.DropTable(
                name: "UserMentionFeedEntity");

            migrationBuilder.DropTable(
                name: "VideoFeedEntityVariant");

            migrationBuilder.DropTable(
                name: "Feeds");

            migrationBuilder.DropTable(
                name: "VideoFeedInformationEntity");

            migrationBuilder.DropTable(
                name: "Coordinates");

            migrationBuilder.DropTable(
                name: "FeedEntities");

            migrationBuilder.DropTable(
                name: "ExtendedEntities");

            migrationBuilder.DropTable(
                name: "PlaceFeed");

            migrationBuilder.DropTable(
                name: "GeoFeed");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Media",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Feed",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feed", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TextId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Text",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Text", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Text_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Media_PostId",
                table: "Media",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Text_PostId",
                table: "Text",
                column: "PostId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Feed_FeedId",
                table: "Media",
                column: "FeedId",
                principalTable: "Feed",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Post_PostId",
                table: "Media",
                column: "PostId",
                principalTable: "Post",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
