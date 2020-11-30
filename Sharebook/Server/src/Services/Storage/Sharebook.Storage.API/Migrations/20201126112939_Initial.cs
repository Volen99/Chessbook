using Microsoft.EntityFrameworkCore.Migrations;

namespace Sharebook.Storage.API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Geo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Geo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TweetEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TweetEntities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    GeoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Coordinates_Geo_GeoId",
                        column: x => x.GeoId,
                        principalTable: "Geo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Place",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceType = table.Column<int>(type: "int", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BoundingBoxId = table.Column<int>(type: "int", nullable: true),
                    GeometryId = table.Column<int>(type: "int", nullable: true),
                    PlaceId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Place", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Place_Geo_BoundingBoxId",
                        column: x => x.BoundingBoxId,
                        principalTable: "Geo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Place_Geo_GeometryId",
                        column: x => x.GeometryId,
                        principalTable: "Geo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Place_Place_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "Place",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Hashtags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TweetEntitiesId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hashtags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hashtags_TweetEntities_TweetEntitiesId",
                        column: x => x.TweetEntitiesId,
                        principalTable: "TweetEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Medias",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpandedURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MediaURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MediaURLHttps = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MediaType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TweetEntitiesId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medias_TweetEntities_TweetEntitiesId",
                        column: x => x.TweetEntitiesId,
                        principalTable: "TweetEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SymbolEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TweetEntitiesId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SymbolEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SymbolEntity_TweetEntities_TweetEntitiesId",
                        column: x => x.TweetEntitiesId,
                        principalTable: "TweetEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UrlEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayedURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpandedURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TweetEntitiesId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrlEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrlEntity_TweetEntities_TweetEntitiesId",
                        column: x => x.TweetEntitiesId,
                        principalTable: "TweetEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserMentionEntity",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ScreenName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TweetEntitiesId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMentionEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMentionEntity_TweetEntities_TweetEntitiesId",
                        column: x => x.TweetEntitiesId,
                        principalTable: "TweetEntities",
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
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Suffix = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Truncated = table.Column<bool>(type: "bit", nullable: false),
                    EntitiesId = table.Column<int>(type: "int", nullable: true),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InReplyToStatusId = table.Column<int>(type: "int", nullable: false),
                    InReplyToStatusIdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InReplyToUserId = table.Column<int>(type: "int", nullable: false),
                    InReplyToUserIdStr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InReplyToScreenName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GeoId = table.Column<int>(type: "int", nullable: true),
                    CoordinatesId = table.Column<int>(type: "int", nullable: true),
                    PlaceId = table.Column<int>(type: "int", nullable: true),
                    Contributors = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsQuoteStatus = table.Column<bool>(type: "bit", nullable: false),
                    RetweetCount = table.Column<int>(type: "int", nullable: false),
                    FavoriteCount = table.Column<int>(type: "int", nullable: false),
                    ReplyCount = table.Column<int>(type: "int", nullable: false),
                    QuoteCount = table.Column<int>(type: "int", nullable: false),
                    Favorited = table.Column<bool>(type: "bit", nullable: false),
                    Retweeted = table.Column<bool>(type: "bit", nullable: false),
                    PossiblySensitive = table.Column<bool>(type: "bit", nullable: false),
                    PossiblySensitiveEditable = table.Column<bool>(type: "bit", nullable: false),
                    Lang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SupplementalLanguage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Coordinates_CoordinatesId",
                        column: x => x.CoordinatesId,
                        principalTable: "Coordinates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Posts_Geo_GeoId",
                        column: x => x.GeoId,
                        principalTable: "Geo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Posts_Place_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "Place",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Posts_TweetEntities_EntitiesId",
                        column: x => x.EntitiesId,
                        principalTable: "TweetEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coordinates_GeoId",
                table: "Coordinates",
                column: "GeoId");

            migrationBuilder.CreateIndex(
                name: "IX_Hashtags_TweetEntitiesId",
                table: "Hashtags",
                column: "TweetEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_TweetEntitiesId",
                table: "Medias",
                column: "TweetEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_Place_BoundingBoxId",
                table: "Place",
                column: "BoundingBoxId");

            migrationBuilder.CreateIndex(
                name: "IX_Place_GeometryId",
                table: "Place",
                column: "GeometryId");

            migrationBuilder.CreateIndex(
                name: "IX_Place_PlaceId",
                table: "Place",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CoordinatesId",
                table: "Posts",
                column: "CoordinatesId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_EntitiesId",
                table: "Posts",
                column: "EntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_GeoId",
                table: "Posts",
                column: "GeoId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_PlaceId",
                table: "Posts",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_SymbolEntity_TweetEntitiesId",
                table: "SymbolEntity",
                column: "TweetEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_UrlEntity_TweetEntitiesId",
                table: "UrlEntity",
                column: "TweetEntitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMentionEntity_TweetEntitiesId",
                table: "UserMentionEntity",
                column: "TweetEntitiesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hashtags");

            migrationBuilder.DropTable(
                name: "Medias");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "SymbolEntity");

            migrationBuilder.DropTable(
                name: "UrlEntity");

            migrationBuilder.DropTable(
                name: "UserMentionEntity");

            migrationBuilder.DropTable(
                name: "Coordinates");

            migrationBuilder.DropTable(
                name: "Place");

            migrationBuilder.DropTable(
                name: "TweetEntities");

            migrationBuilder.DropTable(
                name: "Geo");
        }
    }
}
