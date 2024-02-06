using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class financecategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "FinanceRecords");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "FinanceRecords");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "FinanceRecords",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "FinanceCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinanceCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinanceCategories_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FinanceRecordCategories",
                columns: table => new
                {
                    CategoriesId = table.Column<long>(type: "bigint", nullable: false),
                    FinanceRecordsId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinanceRecordCategories", x => new { x.CategoriesId, x.FinanceRecordsId });
                    table.ForeignKey(
                        name: "FK_FinanceRecordCategories_FinanceCategories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "FinanceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinanceRecordCategories_FinanceRecords_FinanceRecordsId",
                        column: x => x.FinanceRecordsId,
                        principalTable: "FinanceRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FinanceCategories_UserId",
                table: "FinanceCategories",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FinanceRecordCategories_FinanceRecordsId",
                table: "FinanceRecordCategories",
                column: "FinanceRecordsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinanceRecordCategories");

            migrationBuilder.DropTable(
                name: "FinanceCategories");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "FinanceRecords");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "FinanceRecords",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "FinanceRecords",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
