using Microsoft.EntityFrameworkCore.Migrations;

namespace CareHub.Domain.Migrations
{
    public partial class v6_suggestions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO
	                [dbo].[Suggestions] ([Title], [Link], [Type])
                VALUES
	                (
		                'Caregiving Matters',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Resources/Books_+Links_+and+More/Caregiver+and+caregiving/Online+Resources/Caregiving+Matters.aspx',
		                1
	                ),
	                (
		                'Hospital-based Group Education Program for Caregivers',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/For+Professionals/For+Professionals/Tools+for+Practice/Dying+at+home/Hospital_based+Group+Education+Program+for+Family+Caregivers.aspx',
		                1
	                ),
	                (
		                'Lung Cancer Canada',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Resources/Books_+Links_+and+More/Diseases/Cancer/Online+Resources/Lung+Cancer+Canada.aspx',
		                1
	                ),
	                (
		                'What can be expected as lung cancer progresses?',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/Asked+and+Answered/What+to+Expect+with+Various+Illnesses/Cancer/What+can+be+expected+as+lung+cancer+progresses_.aspx',
		                1
	                ),
	                (
		                'All in this Together',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Emotional+Health/All+In+This+Together_+Coping+With+Advanced+Illness+and+Dying+as+a+Family.aspx',
		                1
	                ),
	                (
		                'Caring for yourself',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Caring+for+Yourself.aspx',
		                1
	                ),
	                (
		                'Discussion Forum: Going from ME to WE',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/Discussion+Forums/I+am+living+with+loss+and+grief/2012_06_26_14_01_04_Going+from+WE+TO+ME________.aspx',
		                1
	                ),
	                (
		                'Administering Medications',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Administering+medications+_+Giving+medications+by+mouth.aspx#video_content_details',
		                3
	                ),
	                (
		                'Help with medications',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Help+with+Medications.aspx',
		                1
	                ),
	                (
		                'Caregiver Benefits',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Financial+Assistance/Caregiver+and+Survivor+Benefits.aspx',
		                1
	                ),
	                (
		                'Caring for yourself',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Caring+for+Yourself.aspx',
		                1
	                ),
	                (
		                'CancerChatCanada',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/For+Professionals/For+Professionals/The+Exchange/Current/CancerChatCanada_+Online+support+for+family+and+friends+of+cancer+patients.aspx',
		                1
	                ),
	                (
		                'Stress and Distress',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Emotional+Health/Stress+and+Distress.aspx',
		                1
	                ),

	                (
		                'What Do I Say?',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Communication/What+Do+I+Say_.aspx',
		                1
	                ),
	                (
		                'Communicating with the Family: Asked and Answered',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/Asked+and+Answered/Communication/Communicating+with+the+Family.aspx',
		                1
	                ),
	                (
		                'Communicating with Children: Asked and Answered',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/Asked+and+Answered/Communication/Communicating+with+Children.aspx',
		                1
	                ),
	                (
		                'Communicating with the Friends and Colleagues: Asked and Answered',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/Asked+and+Answered/Communication/Communicating+with+Friends+and+Colleagues.aspx',
		                1
	                ),
	                (
		                'Tips for talking with your health care providers',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Communication/Tips+for+Talking+with+Your+Health+Care+Providers.aspx',
		                1
	                ),
	                (
		                'Communication: Asked and Answered',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/Asked+and+Answered/Communication.aspx',
		                1
	                ),
                    (
		                'Giving a bed bath',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Personal+hygiene+_+Giving+a+bed+bath.aspx#video_content_details',
		                3
	                ),
	                (
		                'Helping with Bathing',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Help+with+Bathing.aspx',
		                3
	                ),
	                (
		                'Help with Eating',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Help+with+Eating.aspx',
		                1
	                ),
	                (
		                'Helping with mouth care',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Personal+hygiene+_+Helping+with+mouth+care.aspx#video_content_details',
		                3
	                ),
	                (
		                'Caring for the skin',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Personal+hygiene+_+Caring+for+the+skin.aspx#video_content_details',
		                3
	                ),
	                (
		                'Caring for Hair and Face',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Caring+for+Hair+and+Face.aspx',
		                1
	                ),
	                (
		                'Help with toileting',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Help+with+Toileting.aspx',
		                1
	                ),
	                (
		                'Moving from bed to wheelchair',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Helping+with+movement+_+Moving+from+bed+to+wheelchair.aspx#video_content_details',
		                3
	                ),
	                (
		                'Providing help with walking',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Helping+with+movement+_+Providing+help+with+walking.aspx#video_content_details',
		                3
	                ),
	                (
		                'Help with medication',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Help+with+Medications.aspx',
		                3
	                ),
	                (
		                'Applying a medicated patch',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Administering+medications+_+Applying+a+medicated+patch.aspx#video_content_details',
		                3
	                ),
	                (
		                'Giving medication by suppository',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Administering+medications+_+Giving+medications+by+suppository.aspx#video_content_details',
		                3
	                ),
	                (
		                'Giving medications through the nose',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Administering+medications+_+Giving+medications+through+the+nose.aspx#video_content_details',
		                3
	                ),
	                (
		                'Giving medications under the tongue',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Administering+medications+_+Giving+medications+under+the+tongue.aspx#video_content_details',
		                3
	                ),
	                (
		                'Giving medication by mouth',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Administering+medications+_+Giving+medications+by+mouth.aspx#video_content_details',
		                3
	                ),
	                (
		                'Pain',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Symptoms+_+Health+Concerns/Pain.aspx',
		                1
	                ),
	                (
		                'Methodone for pain',
		                'http://www.methadone4pain.ca/',
		                1
	                ),
	                (
		                'Nausea and Vomiting',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Symptoms+_+Health+Concerns/Nausea+and+Vomiting.aspx',
		                1
	                ),
	                (
		                'Applying oxygen',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Administering+medications+_+Applying+oxygen.aspx#video_content_details',
		                3
	                ),
	                (
		                'Tips for talking with your health care providers',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Communication/Tips+for+Talking+with+Your+Health+Care+Providers.aspx',
		                1
	                ),
	                (
		                'Caregiver Benefits',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Financial+Assistance/Caregiver+and+Survivor+Benefits.aspx',
		                1
	                ),
	                (
		                'Discussion Forum: Caregiving and Finances',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/Discussion+Forums/I+care+about+someone/2012_12_07_21_55_44_Caregiving+and+Finances.aspx',
		                1
	                ),
	                (
		                'Making a bed with someone in it',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/The+Gallery/Caregiving+Demonstrations/Helping+with+movement+_+Making+a+bed+with+someone+in+it.aspx#video_content_details',
		                3
	                ),
                    (
		                'Sleep and caregivers',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Providing+Care/Sleep+and+Caregivers.aspx',
		                1
	                ),
	                (
		                'Sleep Disturbance',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Symptoms+_+Health+Concerns/Sleep+Disturbance.aspx',
		                1
	                ),
                    (
		                'Fatigue',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Symptoms+_+Health+Concerns/Fatigue.aspx',
		                3
	                ),
	                (
		                'What causes drowsiness in patients with lung cancer?',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Support/Asked+and+Answered/Symptoms+of+Illness/Drowsiness/What+causes+drowsiness+in+patients+with+lung+cancer_.aspx',
		                3
	                ),
	                (
		                'Nausea and Vomiting',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Symptoms+_+Health+Concerns/Nausea+and+Vomiting.aspx',
		                3
	                ),
	                (
		                'Lack of Appetite and Loss of Weight',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Symptoms+_+Health+Concerns/Lack+of+Appetite+and+Loss+of+Weight.aspx',
		                3
	                ),
	                (
		                'Shortness of breath',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Symptoms+_+Health+Concerns/Shortness+of+Breath.aspx',
		                3
	                ),
	                (
		                'Depression',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Symptoms+_+Health+Concerns/Depression.aspx',
		                3
	                ),
	                (
		                'Anxiety',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Topics/Topics/Emotional+Health/Anxiety.aspx',
		                3
	                ),
                    (
		                'Supporting a Child when a Parent is Seriously Ill',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Resources/Books_+Links_+and+More/Children+_+About/Books/As+Big+as+it+Gets_+Supporting+a+Child+when+a+Parent+is+Seriously+Ill.aspx',
		                1
	                ),
                    (
		                'Kids Grief',
		                'https://kidsgrief.ca/',
		                1
	                ),
                    (
		                'Sleeping Problems & Cancer',
		                'http://www.virtualhospice.ca/en_US/Main+Site+Navigation/Home/Support/Resources/Books_+Links_+and+More/Diseases/Cancer/Online+Resources/Sleeping+Problems+_+Cancer.aspx',
		                1
	                );
                GO
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
