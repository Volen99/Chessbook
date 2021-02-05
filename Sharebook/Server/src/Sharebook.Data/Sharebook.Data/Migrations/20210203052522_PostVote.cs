using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sharebook.Data.Migrations
{
    public partial class PostVote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant");

            migrationBuilder.AlterColumn<long>(
                name: "FavoriteCount",
                table: "Posts",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<long>(
                name: "DislikeCount",
                table: "Posts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "PostVotes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IsUp = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostVotes_Posts_PostId",
                        column: x => x.PostId,
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

            migrationBuilder.CreateIndex(
                name: "IX_PostVotes_IsDeleted",
                table: "PostVotes",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_PostVotes_PostId",
                table: "PostVotes",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostVotes_UserId",
                table: "PostVotes",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant",
                column: "VideoInformationEntityMediaEntityId",
                principalTable: "MediaEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant");

            migrationBuilder.DropTable(
                name: "PostVotes");

            migrationBuilder.DropColumn(
                name: "DislikeCount",
                table: "Posts");

            migrationBuilder.AlterColumn<int>(
                name: "FavoriteCount",
                table: "Posts",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant",
                column: "VideoInformationEntityMediaEntityId",
                principalTable: "MediaEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
