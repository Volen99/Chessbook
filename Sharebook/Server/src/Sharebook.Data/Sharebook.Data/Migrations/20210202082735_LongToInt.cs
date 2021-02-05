using Microsoft.EntityFrameworkCore.Migrations;

namespace Sharebook.Data.Migrations
{
    public partial class LongToInt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant");

            migrationBuilder.AlterColumn<int>(
                name: "FollowersCount",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "FavouritesCount",
                table: "Users",
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
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant");

            migrationBuilder.AlterColumn<long>(
                name: "FollowersCount",
                table: "Users",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "FavouritesCount",
                table: "Users",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

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
