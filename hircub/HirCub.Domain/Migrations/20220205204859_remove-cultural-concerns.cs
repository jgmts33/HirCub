using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class removeculturalconcerns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Concerns",
                keyColumn: "Id",
                keyValue: 7);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Concerns",
                columns: new[] { "Id", "DisplayName", "InternalName", "IsWelcomeQuestion" },
                values: new object[] { 7, "Cultural", "cultural", false });

            migrationBuilder.InsertData(
                table: "ConcernValues",
                columns: new[] { "Id", "ConcernId", "Name", "Value" },
                values: new object[,]
                {
                    { 22, 7, "Traditions, rituals and spirituality", 1 },
                    { 23, 7, "Expectations of care", 2 },
                    { 24, 7, "Care for the patient and family", 3 },
                    { 25, 7, "Emotions and support", 4 },
                    { 26, 7, "Talking about illness", 5 },
                    { 27, 7, "After death and ceremonies", 6 }
                });
        }
    }
}
