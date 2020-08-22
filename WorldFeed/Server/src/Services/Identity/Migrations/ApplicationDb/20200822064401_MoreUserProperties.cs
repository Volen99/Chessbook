using Microsoft.EntityFrameworkCore.Migrations;

namespace WorldFeed.Identity.API.Migrations.ApplicationDb
{
    public partial class MoreUserProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Birthdate_YearVisibility",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<bool>(
                name: "Notifications",
                table: "AspNetUsers",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "FollowRequestSent",
                table: "AspNetUsers",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BusinessProfileState",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasCustomTimelines",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MediaCount",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PinnedTweetIds",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileLocation",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequireSomeConsent",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "can_media_tag",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Birthdate_VisibilityYear",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessProfileState",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "HasCustomTimelines",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "MediaCount",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PinnedTweetIds",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileLocation",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RequireSomeConsent",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "can_media_tag",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Birthdate_VisibilityYear",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Notifications",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<string>(
                name: "FollowRequestSent",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<int>(
                name: "Birthdate_YearVisibility",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }
    }
}
