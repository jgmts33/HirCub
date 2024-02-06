using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class problemFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("update   [dbo].[Problems] set TrackedHealthStateId = TrackedHealthStateId1 ");

            migrationBuilder.DropForeignKey(
                name: "FK_Problems_TrackedHealthStates_TrackedHealthStateId1",
                table: "Problems");

            migrationBuilder.DropIndex(
                name: "IX_Problems_TrackedHealthStateId1",
                table: "Problems");

            migrationBuilder.DropColumn(
                name: "TrackedHealthStateId1",
                table: "Problems");

            migrationBuilder.AlterColumn<long>(
                name: "TrackedHealthStateId",
                table: "Problems",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Problems_TrackedHealthStateId",
                table: "Problems",
                column: "TrackedHealthStateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Problems_TrackedHealthStates_TrackedHealthStateId",
                table: "Problems",
                column: "TrackedHealthStateId",
                principalTable: "TrackedHealthStates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Problems_TrackedHealthStates_TrackedHealthStateId",
                table: "Problems");

            migrationBuilder.DropIndex(
                name: "IX_Problems_TrackedHealthStateId",
                table: "Problems");

            migrationBuilder.AlterColumn<int>(
                name: "TrackedHealthStateId",
                table: "Problems",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "TrackedHealthStateId1",
                table: "Problems",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Problems_TrackedHealthStateId1",
                table: "Problems",
                column: "TrackedHealthStateId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Problems_TrackedHealthStates_TrackedHealthStateId1",
                table: "Problems",
                column: "TrackedHealthStateId1",
                principalTable: "TrackedHealthStates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
