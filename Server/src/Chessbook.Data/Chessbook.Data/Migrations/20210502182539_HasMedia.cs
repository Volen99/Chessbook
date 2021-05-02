using Microsoft.EntityFrameworkCore.Migrations;

namespace Chessbook.Data.Migrations
{
    public partial class HasMedia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasMedia",
                table: "Posts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasMedia",
                table: "Posts");
        }
    }
}
