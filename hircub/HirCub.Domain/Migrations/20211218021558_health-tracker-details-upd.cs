using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class healthtrackerdetailsupd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdditionalDetails",
                table: "Problems");

            migrationBuilder.DropColumn(
                name: "AdditionalDetails",
                table: "PainProblems");

            migrationBuilder.AddColumn<string>(
                name: "AdditionalDetails",
                table: "TrackedHealthStates",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdditionalDetails",
                table: "TrackedHealthStates");

            migrationBuilder.AddColumn<string>(
                name: "AdditionalDetails",
                table: "Problems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdditionalDetails",
                table: "PainProblems",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
