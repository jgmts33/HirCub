using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class impersonation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ImpersonationRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrusterEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrusterName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GuestEmail = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImpersonationRecords", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImpersonationRecords_GuestEmail",
                table: "ImpersonationRecords",
                column: "GuestEmail");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImpersonationRecords");
        }
    }
}
