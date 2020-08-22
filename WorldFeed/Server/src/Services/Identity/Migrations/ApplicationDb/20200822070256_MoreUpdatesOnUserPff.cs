using Microsoft.EntityFrameworkCore.Migrations;

namespace WorldFeed.Identity.API.Migrations.ApplicationDb
{
    public partial class MoreUpdatesOnUserPff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "can_media_tag",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<bool>(
                name: "CanMediaTag",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CanMediaTag",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "can_media_tag",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
