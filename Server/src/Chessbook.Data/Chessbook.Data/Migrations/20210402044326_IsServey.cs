using Microsoft.EntityFrameworkCore.Migrations;

namespace Chessbook.Data.Migrations
{
    public partial class IsServey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant");

            migrationBuilder.AddColumn<bool>(
                name: "IsSurvey",
                table: "Polls",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

            migrationBuilder.DropColumn(
                name: "IsSurvey",
                table: "Polls");

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
