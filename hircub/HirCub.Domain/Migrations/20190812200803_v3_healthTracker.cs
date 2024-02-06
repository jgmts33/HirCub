using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class v3_healthTracker : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Concerns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    InternalName = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concerns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProblemTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    InternalName = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProblemTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrackedHealthStates",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    Period = table.Column<int>(nullable: true),
                    Happiness = table.Column<int>(nullable: true),
                    Content = table.Column<int>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackedHealthStates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackedHealthStates_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ConcernValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ConcernId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConcernValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConcernValues_Concerns_ConcernId",
                        column: x => x.ConcernId,
                        principalTable: "Concerns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PainProblems",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TrackedHealthStateId = table.Column<long>(nullable: false),
                    DateTracked = table.Column<DateTime>(nullable: false),
                    Intensity = table.Column<int>(nullable: false),
                    Concern = table.Column<int>(nullable: true),
                    PainType = table.Column<int>(nullable: false),
                    IsFront = table.Column<bool>(nullable: false),
                    BodyPart = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PainProblems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PainProblems_TrackedHealthStates_TrackedHealthStateId",
                        column: x => x.TrackedHealthStateId,
                        principalTable: "TrackedHealthStates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Problems",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProblemTypeId = table.Column<int>(nullable: false),
                    TrackedHealthStateId = table.Column<int>(nullable: false),
                    DateTracked = table.Column<DateTime>(nullable: false),
                    Intensity = table.Column<int>(nullable: false),
                    Concern = table.Column<int>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    TrackedHealthStateId1 = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Problems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Problems_ProblemTypes_ProblemTypeId",
                        column: x => x.ProblemTypeId,
                        principalTable: "ProblemTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Problems_TrackedHealthStates_TrackedHealthStateId1",
                        column: x => x.TrackedHealthStateId1,
                        principalTable: "TrackedHealthStates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Problems_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TrackedConcerns",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TrackedHealthStateId = table.Column<long>(nullable: false),
                    ConcernId = table.Column<int>(nullable: false),
                    ConcernValue = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackedConcerns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackedConcerns_Concerns_ConcernId",
                        column: x => x.ConcernId,
                        principalTable: "Concerns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrackedConcerns_TrackedHealthStates_TrackedHealthStateId",
                        column: x => x.TrackedHealthStateId,
                        principalTable: "TrackedHealthStates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConcernValues_ConcernId",
                table: "ConcernValues",
                column: "ConcernId");

            migrationBuilder.CreateIndex(
                name: "IX_PainProblems_TrackedHealthStateId",
                table: "PainProblems",
                column: "TrackedHealthStateId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Problems_ProblemTypeId",
                table: "Problems",
                column: "ProblemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Problems_TrackedHealthStateId1",
                table: "Problems",
                column: "TrackedHealthStateId1");

            migrationBuilder.CreateIndex(
                name: "IX_Problems_UserId",
                table: "Problems",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackedConcerns_ConcernId",
                table: "TrackedConcerns",
                column: "ConcernId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackedConcerns_TrackedHealthStateId",
                table: "TrackedConcerns",
                column: "TrackedHealthStateId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackedHealthStates_UserId",
                table: "TrackedHealthStates",
                column: "UserId");

            migrationBuilder.Sql(@"
                INSERT INTO [ProblemTypes]
                    ([InternalName], [DisplayName])
                VALUES
                    ('tiredness', 'Tiredness'),
                    ('drowsiness', 'Drowsiness'),
                    ('nausea', 'Nausea'),
                    ('lackOfAppetite', 'Lack of appetite'),
                    ('shortnessOfBreath', 'Shortness of breath'),
                    ('depression', 'Depression'),
                    ('anxiety', 'Anxiety'),
                    ('wellBeing', 'Well Being');
            ");

            migrationBuilder.Sql(@"
                INSERT INTO [Concerns]
                    ([InternalName], [DisplayName])
                VALUES
                    ('emotional', 'Emotional'),
                    ('practical', 'Practical'),
                    ('information', 'Information'),
                    ('spiritual', 'Spiritual'),
                    ('socialFamily', 'Social/Family'),
                    ('physical', 'Physical'),
                    ('cultural', 'Cultural');
            ");

            migrationBuilder.Sql(@"
                INSERT INTO [ConcernValues]
                    ([ConcernId], [Value], [Name])
                VALUES
                    (1, 1, 'Fears/worries'),
                    (1, 2, 'Sadness'),
                    (1, 3, 'Frustration/anger'),
                    (1, 4, 'Changes in appearance'),
                    (1, 5, 'Intimacy/sexuality'),
                    (2, 1, 'Work/school'),
                    (2, 2, 'Finances'),
                    (2, 3, 'Getting to and from appointments'),
                    (2, 4, 'Accommodation'),
                    (3, 1, 'Understanding @@NAME@@''s illness and/or treatment'),
                    (3, 2, 'Talking with the health care team'),
                    (3, 3, 'Making treatment decisions'),
                    (3, 4, 'Knowing about available resources'),
                    (4, 1, 'Meaning/purpose of life'),
                    (4, 2, 'Faith'),
                    (5, 1, 'Feeling a burden to others'),
                    (5, 2, 'Worry about family/friends'),
                    (5, 3, 'Feeling alone'),
                    (6, 1, 'Sleep'),
                    (6, 2, 'Weight'),
                    (6, 3, 'Concentration/memory'),
                    (7, 1, 'Traditions, rituals and spirituality'),
                    (7, 2, 'Expectations of care'),
                    (7, 3, 'Care for the patient and family'),
                    (7, 4, 'Emotions and support'),
                    (7, 5, 'Talking about illness'),
                    (7, 6, 'After death and ceremonies');
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConcernValues");

            migrationBuilder.DropTable(
                name: "PainProblems");

            migrationBuilder.DropTable(
                name: "Problems");

            migrationBuilder.DropTable(
                name: "TrackedConcerns");

            migrationBuilder.DropTable(
                name: "ProblemTypes");

            migrationBuilder.DropTable(
                name: "Concerns");

            migrationBuilder.DropTable(
                name: "TrackedHealthStates");
        }
    }
}
