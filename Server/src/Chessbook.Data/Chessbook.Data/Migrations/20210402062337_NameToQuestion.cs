using Microsoft.EntityFrameworkCore.Migrations;

namespace Chessbook.Data.Migrations
{
    public partial class NameToQuestion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Polls",
                newName: "Question");

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

            migrationBuilder.RenameColumn(
                name: "Question",
                table: "Polls",
                newName: "Name");

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
