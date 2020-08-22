using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WorldFeed.Identity.API.Migrations.ApplicationDb
{
    public partial class Birthdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Description_Entities_DescriptionId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Url_Entities_UrlId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Url");

            migrationBuilder.DropTable(
                name: "Description");

            migrationBuilder.DropTable(
                name: "Indices");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_Entities_DescriptionId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_Entities_UrlId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Entities_DescriptionId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Entities_UrlId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Year",
                table: "AspNetUsers",
                newName: "Birthdate_Year");

            migrationBuilder.RenameColumn(
                name: "Month",
                table: "AspNetUsers",
                newName: "Birthdate_Month");

            migrationBuilder.RenameColumn(
                name: "Day",
                table: "AspNetUsers",
                newName: "Birthdate_Day");

            migrationBuilder.RenameColumn(
                name: "Age",
                table: "AspNetUsers",
                newName: "Birthdate_Age");

            migrationBuilder.AlterColumn<int>(
                name: "Birthdate_Year",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Birthdate_Month",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Birthdate_Day",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Birthdate_Age",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Birthdate_Visibility",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Birthdate_YearVisibility",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Entities_Url_Indices_IndexFirst",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Entities_Url_Indices_IndexSecond",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Entities_Url_DisplayUrl",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Entities_Url_ExpandedUrl",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Entities_Url_UrlPath",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AspNetUsers_Urls",
                columns: table => new
                {
                    DescriptionEntityApplicationUserId = table.Column<string>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UrlPath = table.Column<string>(nullable: true),
                    ExpandedUrl = table.Column<string>(nullable: true),
                    DisplayUrl = table.Column<string>(nullable: true),
                    Indices_IndexFirst = table.Column<int>(nullable: true),
                    Indices_IndexSecond = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers_Urls", x => new { x.DescriptionEntityApplicationUserId, x.Id });
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Urls_AspNetUsers_DescriptionEntityApplicationUserId",
                        column: x => x.DescriptionEntityApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetUsers_Urls");

            migrationBuilder.DropColumn(
                name: "Birthdate_Visibility",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Birthdate_YearVisibility",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Entities_Url_Indices_IndexFirst",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Entities_Url_Indices_IndexSecond",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Entities_Url_DisplayUrl",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Entities_Url_ExpandedUrl",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Entities_Url_UrlPath",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Birthdate_Year",
                table: "AspNetUsers",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "Birthdate_Month",
                table: "AspNetUsers",
                newName: "Month");

            migrationBuilder.RenameColumn(
                name: "Birthdate_Day",
                table: "AspNetUsers",
                newName: "Day");

            migrationBuilder.RenameColumn(
                name: "Birthdate_Age",
                table: "AspNetUsers",
                newName: "Age");

            migrationBuilder.AlterColumn<int>(
                name: "Year",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Month",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Day",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Entities_DescriptionId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Entities_UrlId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Birthday",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Description",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Description", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Indices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IndexFirst = table.Column<int>(type: "int", nullable: false),
                    IndexSecond = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Indices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Url",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DescriptionId = table.Column<int>(type: "int", nullable: true),
                    DisplayUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpandedUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IndicesId = table.Column<int>(type: "int", nullable: false),
                    UrlPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Url", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Url_Description_DescriptionId",
                        column: x => x.DescriptionId,
                        principalTable: "Description",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Url_Indices_IndicesId",
                        column: x => x.IndicesId,
                        principalTable: "Indices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_Entities_DescriptionId",
                table: "AspNetUsers",
                column: "Entities_DescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_Entities_UrlId",
                table: "AspNetUsers",
                column: "Entities_UrlId");

            migrationBuilder.CreateIndex(
                name: "IX_Url_DescriptionId",
                table: "Url",
                column: "DescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Url_IndicesId",
                table: "Url",
                column: "IndicesId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Description_Entities_DescriptionId",
                table: "AspNetUsers",
                column: "Entities_DescriptionId",
                principalTable: "Description",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Url_Entities_UrlId",
                table: "AspNetUsers",
                column: "Entities_UrlId",
                principalTable: "Url",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
