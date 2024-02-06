using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class welcomequestions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsWelcomeQuestion",
                table: "Concerns",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Concerns",
                columns: new[] { "Id", "DisplayName", "InternalName", "IsWelcomeQuestion" },
                values: new object[] { 8, "Over the past week or so, I have (check all that apply)", "pastweekhave", true });

            migrationBuilder.InsertData(
                table: "Concerns",
                columns: new[] { "Id", "DisplayName", "InternalName", "IsWelcomeQuestion" },
                values: new object[] { 9, "Over the past week or so, I have felt (check all that apply)", "pastweekfelt", true });

            migrationBuilder.InsertData(
                table: "ConcernValues",
                columns: new[] { "Id", "ConcernId", "Name", "Value" },
                values: new object[,]
                {
                    { 28, 8, "been satisfied with the support my family has given me", 1 },
                    { 42, 9, "anxious", 7 },
                    { 41, 9, "depressed", 6 },
                    { 40, 9, "a loss of privacy and/or personal time", 5 },
                    { 39, 9, "lonely", 4 },
                    { 38, 9, "completely overwhelmed", 3 },
                    { 37, 9, "that I couldn't leave the person I am caring for alone", 2 },
                    { 43, 9, "ill (headaches, stomach problems or common cold)", 8 },
                    { 36, 9, "useful and needed", 1 },
                    { 34, 8, "had sleep disturbed because of my caregiving responsibilities", 7 },
                    { 33, 8, "been edgy or irritable", 6 },
                    { 32, 8, "been upset that the person I am caring for has changed so much from their former self", 5 },
                    { 31, 8, "had difficulty making decisions", 4 },
                    { 30, 8, "had trouble keeping my mind on what I was doing", 3 },
                    { 29, 8, "found ways to meet my spiritual needs", 2 },
                    { 35, 8, "found the living situation of the person I am caring for to be inconvenient or a barrier to care", 8 },
                    { 44, 9, "strained between work and family responsibilities", 9 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "ConcernValues",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Concerns",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Concerns",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DropColumn(
                name: "IsWelcomeQuestion",
                table: "Concerns");
        }
    }
}
