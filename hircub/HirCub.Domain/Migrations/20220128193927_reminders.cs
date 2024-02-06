using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class reminders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReminderReferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReminderReferences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reminders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ReminderReferenceId = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    Hours = table.Column<int>(type: "int", nullable: false),
                    Minutes = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reminders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reminders_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reminders_ReminderReferences_ReminderReferenceId",
                        column: x => x.ReminderReferenceId,
                        principalTable: "ReminderReferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ReminderReferences",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Calendar" },
                    { 2, "Health Tracker" },
                    { 3, "Expense Tracker" },
                    { 4, "Medication Tracker" },
                    { 5, "Mobility Tracker" },
                    { 6, "Caregiving Needs Questionnaire" },
                    { 7, "Profile Update" },
                    { 8, "Library" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reminders_ReminderReferenceId",
                table: "Reminders",
                column: "ReminderReferenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Reminders_UserId_ReminderReferenceId",
                table: "Reminders",
                columns: new[] { "UserId", "ReminderReferenceId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reminders");

            migrationBuilder.DropTable(
                name: "ReminderReferences");
        }
    }
}
