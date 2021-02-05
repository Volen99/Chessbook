using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sharebook.Data.Migrations
{
    public partial class PostDateTimeCreatedAtPropTypeNew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoEntityVariant_MediaEntities_VideoInformationEntityMediaEntityId",
                table: "VideoEntityVariant");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Posts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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

            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

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
