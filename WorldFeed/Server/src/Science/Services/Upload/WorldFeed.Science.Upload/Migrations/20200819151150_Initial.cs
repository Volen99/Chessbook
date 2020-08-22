using Microsoft.EntityFrameworkCore.Migrations;

namespace WorldFeed.Science.Upload.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Feeds",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<string>(nullable: true),
                    FullText = table.Column<string>(nullable: true),
                    Truncated = table.Column<bool>(nullable: false),
                    Source = table.Column<string>(nullable: true),
                    InReplyToStatusId = table.Column<int>(nullable: false),
                    InReplyToStatusIdStr = table.Column<string>(nullable: true),
                    InReplyToUserId = table.Column<int>(nullable: false),
                    InReplyToUserIdStr = table.Column<string>(nullable: true),
                    InReplyToScreenName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    Geo_Type = table.Column<string>(nullable: true),
                    Coordinates_Longitude = table.Column<double>(nullable: true),
                    Coordinates_Latitude = table.Column<double>(nullable: true),
                    Place_Name = table.Column<string>(nullable: true),
                    Place_FullName = table.Column<string>(nullable: true),
                    Place_Url = table.Column<string>(nullable: true),
                    Place_PlaceType = table.Column<int>(nullable: true),
                    Place_Country = table.Column<string>(nullable: true),
                    Place_CountryCode = table.Column<string>(nullable: true),
                    Place_BoundingBox_Type = table.Column<string>(nullable: true),
                    Place_Geometry_Type = table.Column<string>(nullable: true),
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
                });

            migrationBuilder.CreateTable(
                name: "Feeds_Coordinates",
                columns: table => new
                {
                    GeoPlaceFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Longitude = table.Column<double>(nullable: false),
                    Latitude = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feeds_Coordinates", x => new { x.GeoPlaceFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_Feeds_Coordinates_Feeds_GeoPlaceFeedId",
                        column: x => x.GeoPlaceFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feeds_Coordinates1",
                columns: table => new
                {
                    GeoFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Longitude = table.Column<double>(nullable: false),
                    Latitude = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feeds_Coordinates1", x => new { x.GeoFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_Feeds_Coordinates1_Feeds_GeoFeedId",
                        column: x => x.GeoFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feeds_Coordinates2",
                columns: table => new
                {
                    GeoPlaceFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Longitude = table.Column<double>(nullable: false),
                    Latitude = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feeds_Coordinates2", x => new { x.GeoPlaceFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_Feeds_Coordinates2_Feeds_GeoPlaceFeedId",
                        column: x => x.GeoPlaceFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feeds_Media",
                columns: table => new
                {
                    ExtendedEntitiesFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MediaURL = table.Column<string>(nullable: true),
                    MediaURLHttps = table.Column<string>(nullable: true),
                    URL = table.Column<string>(nullable: true),
                    DisplayURL = table.Column<string>(nullable: true),
                    ExpandedURL = table.Column<string>(nullable: true),
                    MediaType = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    Sizes_Thumb_Width = table.Column<int>(nullable: true),
                    Sizes_Thumb_Height = table.Column<int>(nullable: true),
                    Sizes_Thumb_Resize = table.Column<string>(nullable: true),
                    Sizes_Large_Width = table.Column<int>(nullable: true),
                    Sizes_Large_Height = table.Column<int>(nullable: true),
                    Sizes_Large_Resize = table.Column<string>(nullable: true),
                    Sizes_Medium_Width = table.Column<int>(nullable: true),
                    Sizes_Medium_Height = table.Column<int>(nullable: true),
                    Sizes_Medium_Resize = table.Column<string>(nullable: true),
                    Sizes_Small_Width = table.Column<int>(nullable: true),
                    Sizes_Small_Height = table.Column<int>(nullable: true),
                    Sizes_Small_Resize = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feeds_Media", x => new { x.ExtendedEntitiesFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_Feeds_Media_Feeds_ExtendedEntitiesFeedId",
                        column: x => x.ExtendedEntitiesFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feeds_Medias",
                columns: table => new
                {
                    EntitiesFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MediaURL = table.Column<string>(nullable: true),
                    MediaURLHttps = table.Column<string>(nullable: true),
                    URL = table.Column<string>(nullable: true),
                    DisplayURL = table.Column<string>(nullable: true),
                    ExpandedURL = table.Column<string>(nullable: true),
                    MediaType = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    Sizes_Thumb_Width = table.Column<int>(nullable: true),
                    Sizes_Thumb_Height = table.Column<int>(nullable: true),
                    Sizes_Thumb_Resize = table.Column<string>(nullable: true),
                    Sizes_Large_Width = table.Column<int>(nullable: true),
                    Sizes_Large_Height = table.Column<int>(nullable: true),
                    Sizes_Large_Resize = table.Column<string>(nullable: true),
                    Sizes_Medium_Width = table.Column<int>(nullable: true),
                    Sizes_Medium_Height = table.Column<int>(nullable: true),
                    Sizes_Medium_Resize = table.Column<string>(nullable: true),
                    Sizes_Small_Width = table.Column<int>(nullable: true),
                    Sizes_Small_Height = table.Column<int>(nullable: true),
                    Sizes_Small_Resize = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feeds_Medias", x => new { x.EntitiesFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_Feeds_Medias_Feeds_EntitiesFeedId",
                        column: x => x.EntitiesFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HashtagEntity",
                columns: table => new
                {
                    EntitiesFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    FeedEntitiesId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HashtagEntity", x => new { x.EntitiesFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_HashtagEntity_Feeds_EntitiesFeedId",
                        column: x => x.EntitiesFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SymbolEntity",
                columns: table => new
                {
                    EntitiesFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SymbolEntity", x => new { x.EntitiesFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_SymbolEntity_Feeds_EntitiesFeedId",
                        column: x => x.EntitiesFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UrlEntity",
                columns: table => new
                {
                    EntitiesFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    URL = table.Column<string>(nullable: true),
                    DisplayedURL = table.Column<string>(nullable: true),
                    ExpandedURL = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrlEntity", x => new { x.EntitiesFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_UrlEntity_Feeds_EntitiesFeedId",
                        column: x => x.EntitiesFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserMentionEntity",
                columns: table => new
                {
                    EntitiesFeedId = table.Column<long>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScreenName = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMentionEntity", x => new { x.EntitiesFeedId, x.Id });
                    table.ForeignKey(
                        name: "FK_UserMentionEntity_Feeds_EntitiesFeedId",
                        column: x => x.EntitiesFeedId,
                        principalTable: "Feeds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feeds_Coordinates");

            migrationBuilder.DropTable(
                name: "Feeds_Coordinates1");

            migrationBuilder.DropTable(
                name: "Feeds_Coordinates2");

            migrationBuilder.DropTable(
                name: "Feeds_Media");

            migrationBuilder.DropTable(
                name: "Feeds_Medias");

            migrationBuilder.DropTable(
                name: "HashtagEntity");

            migrationBuilder.DropTable(
                name: "SymbolEntity");

            migrationBuilder.DropTable(
                name: "UrlEntity");

            migrationBuilder.DropTable(
                name: "UserMentionEntity");

            migrationBuilder.DropTable(
                name: "Feeds");
        }
    }
}
