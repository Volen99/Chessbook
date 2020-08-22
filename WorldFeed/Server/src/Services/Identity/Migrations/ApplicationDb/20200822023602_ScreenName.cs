using Microsoft.EntityFrameworkCore.Migrations;

namespace WorldFeed.Identity.API.Migrations.ApplicationDb
{
    public partial class ScreenName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ScreenName",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScreenName",
                table: "AspNetUsers");
        }
    }
}
