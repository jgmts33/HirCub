using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class profilecolor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileColorB",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileColorG",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileColorR",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ProfileColor",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileColor",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "ProfileColorB",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProfileColorG",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProfileColorR",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }
    }
}
