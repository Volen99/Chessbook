using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WorldFeed.Statistics.Migrations
{
    public partial class Change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarAdViews");

            migrationBuilder.DropColumn(
                name: "TotalCarAds",
                table: "Statistics");

            migrationBuilder.DropColumn(
                name: "TotalRentedCars",
                table: "Statistics");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Statistics",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Statistics",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Statistics",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "Statistics",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalUploads",
                table: "Statistics",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Statistics");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Statistics");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Statistics");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "Statistics");

            migrationBuilder.DropColumn(
                name: "TotalUploads",
                table: "Statistics");

            migrationBuilder.AddColumn<int>(
                name: "TotalCarAds",
                table: "Statistics",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalRentedCars",
                table: "Statistics",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CarAdViews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarAdId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarAdViews", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarAdViews_CarAdId",
                table: "CarAdViews",
                column: "CarAdId");
        }
    }
}
