import React from 'react';
import HeroTitle from '~/components/shared/heroTitle';
import MedicationList from '~/components/MedicationList';

function MedicationTracker() {
  const handleSubmit = () => {
    // console.log('submit');
  };

  return (
    <div className="health-tracker-page md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="container">
        <HeroTitle imageUrl="/img/icons/medication-white.svg">
          <h1>Medication Tracker</h1>
          <div className="hero-description">
            This tool can be used to track your medications. Keep your list up
            to date by entering your current medications and editing your list
            as things change. You can discontinue, pause or restart a medication
            by changing its active status. Sort your list by date, medication
            name, or the reason for taking the medication. You may print or
            download a copy of your list, or export it to create a weekly dosage
            tracking sheet. Think about using this tool with the "Notes about
            medications" category in your journal to document the effects, side
            effects and other details about medications.
          </div>
        </HeroTitle>

        <MedicationList handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default MedicationTracker;
