using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WorldFeed.Science.Upload.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Feed",
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
                    table.PrimaryKey("PK_Feed", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MediaEntitySize",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Width = table.Column<int>(nullable: true),
                    Height = table.Column<int>(nullable: true),
                    Resize = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaEntitySize", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: false),
                    Published = table.Column<bool>(nullable: false),
                    serializedData = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    TextId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MediaSizeObject",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ThumbId = table.Column<int>(nullable: true),
                    LargeId = table.Column<int>(nullable: true),
                    MediumId = table.Column<int>(nullable: true),
                    SmallId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaSizeObject", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MediaSizeObject_MediaEntitySize_LargeId",
                        column: x => x.LargeId,
                        principalTable: "MediaEntitySize",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MediaSizeObject_MediaEntitySize_MediumId",
                        column: x => x.MediumId,
                        principalTable: "MediaEntitySize",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MediaSizeObject_MediaEntitySize_SmallId",
                        column: x => x.SmallId,
                        principalTable: "MediaEntitySize",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MediaSizeObject_MediaEntitySize_ThumbId",
                        column: x => x.ThumbId,
                        principalTable: "MediaEntitySize",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Text",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    PostId = table.Column<int>(nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    IdStr = table.Column<string>(nullable: true),
                    MediaKey = table.Column<string>(nullable: true),
                    Data = table.Column<byte[]>(nullable: true),
                    ContentType = table.Column<string>(nullable: true),
                    MediaUrl = table.Column<string>(nullable: true),
                    MediaUrlHttps = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    DisplayUrl = table.Column<string>(nullable: true),
                    ExpandedUrl = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    OriginalInfo = table.Column<string>(nullable: true),
                    Size = table.Column<long>(nullable: false),
                    Directory = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true),
                    FileExtension = table.Column<string>(nullable: true),
                    Indices = table.Column<string>(nullable: true),
                    ExtMediaAvailability = table.Column<int>(nullable: false),
                    ExtAltText = table.Column<string>(nullable: true),
                    ExtMediaColor = table.Column<string>(nullable: true),
                    MediaSizeObjectId = table.Column<int>(nullable: false),
                    FeedId = table.Column<long>(nullable: false),
                    PostId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Media_Feed_FeedId",
                        column: x => x.FeedId,
                        principalTable: "Feed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Media_MediaSizeObject_MediaSizeObjectId",
                        column: x => x.MediaSizeObjectId,
                        principalTable: "MediaSizeObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Media_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Media_FeedId",
                table: "Media",
                column: "FeedId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_MediaSizeObjectId",
                table: "Media",
                column: "MediaSizeObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Media_PostId",
                table: "Media",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaSizeObject_LargeId",
                table: "MediaSizeObject",
                column: "LargeId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaSizeObject_MediumId",
                table: "MediaSizeObject",
                column: "MediumId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaSizeObject_SmallId",
                table: "MediaSizeObject",
                column: "SmallId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaSizeObject_ThumbId",
                table: "MediaSizeObject",
                column: "ThumbId");

            migrationBuilder.CreateIndex(
                name: "IX_Text_PostId",
                table: "Text",
                column: "PostId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Media");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Text");

            migrationBuilder.DropTable(
                name: "Feed");

            migrationBuilder.DropTable(
                name: "MediaSizeObject");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "MediaEntitySize");
        }
    }
}
