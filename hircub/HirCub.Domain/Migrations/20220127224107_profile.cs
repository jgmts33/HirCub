using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class profile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BackgroundImageCode",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

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

            migrationBuilder.CreateTable(
                name: "ProfileQuestionsCaregiver",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: true),
                    GenderOther = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HaveExperienceProvidingCare = table.Column<bool>(type: "bit", nullable: true),
                    ExperienceLength = table.Column<int>(type: "int", nullable: true),
                    CaregivingFrequency = table.Column<int>(type: "int", nullable: true),
                    CaregivingAmountOfTime = table.Column<int>(type: "int", nullable: true),
                    HaveChildrenOrOthersWhomAlsoCaring = table.Column<bool>(type: "bit", nullable: true),
                    Responsibilities = table.Column<int>(type: "int", nullable: true),
                    CaringFor = table.Column<int>(type: "int", nullable: true),
                    NotesAboutCaregiving = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileQuestionsCaregiver", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfileQuestionsCaregiver_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProfileQuestionsCommon",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    InterestedInInclusiveness = table.Column<bool>(type: "bit", nullable: true),
                    InterestedSupporingChildren = table.Column<bool>(type: "bit", nullable: true),
                    InterestedAboutIndigenousPeople = table.Column<bool>(type: "bit", nullable: true),
                    InterestedAboutGrieving = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileQuestionsCommon", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfileQuestionsCommon_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProfileQuestionsPatient",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: true),
                    GenderOther = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MainHealthIssue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LivingWithMainHealthIssue = table.Column<int>(type: "int", nullable: true),
                    NotesForCaregiver = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileQuestionsPatient", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfileQuestionsPatient_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProfileQuestionsCaregiver_UserId",
                table: "ProfileQuestionsCaregiver",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfileQuestionsCommon_UserId",
                table: "ProfileQuestionsCommon",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfileQuestionsPatient_UserId",
                table: "ProfileQuestionsPatient",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProfileQuestionsCaregiver");

            migrationBuilder.DropTable(
                name: "ProfileQuestionsCommon");

            migrationBuilder.DropTable(
                name: "ProfileQuestionsPatient");

            migrationBuilder.DropColumn(
                name: "BackgroundImageCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileColorB",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileColorG",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileColorR",
                table: "AspNetUsers");
        }
    }
}
