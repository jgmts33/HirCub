import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTrackFinanceRequest } from '~/hooks/requests';
import HeroTitle from '~/components/shared/heroTitle';
import FinanceTrackerForm from '~/components/financeTrackerForm';

function FinanceTracker() {

  const financeTypes = {
    notRelated: 1,
    related: 2,
    other: 3,
    attendant: 4,
  };

  const [isSubmittingFinance, setSubmittingFinances] = useState(false);
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(0);

  const {
    errors: financeErrors,
    sendRequest: sendRequestFinance,
  } = useTrackFinanceRequest(handleSubmitFinanceSuccess);

  function handleSubmitFinanceSuccess(response, formData) {
    // trackGTM(TRACK_GTM.CREATE_FINENCE, {
    //   ...formData,
    //   userId,
    // });
    toast.success('All the data has been succesfully submitted.');
    const finences = formData.finences
      .filter((p) => p.intensity)
      .map((p) => ({ [p.financeTypeId]: true }));
    let res = {};
    for (let i = 0; i < finences.length; i++) {
      res = { ...res, ...finences[i] };
    }
    if (formData.painFinences.intensity) {
      res = { ...res, ...{ pain: true } };
    }
    setSubmittingFinances(false);
    setShouldShowSuggestions(res);
  }

  function handleSubmitFinance(formData) {
    if (isSubmittingFinance) {
      return;
    }
    setSubmittingFinances(true);
    const finances = [];
    Object.keys(financeTypes).forEach((idx) => {
      const item = formData[idx];
      if (!item) {
        return;
      }
      finances.push({
        ...item,
        financeTypeId: financeTypes[idx],
      });
    });
    sendRequestFinance(finances);
  }

  useEffect(() => {
    setSubmittingFinances(false);
  }, [financeErrors]);


  return (
    <div className="finance-tracker-page md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="container">
        <HeroTitle imageUrl="/img/icons/exp-white.svg">
          <h1>Finance Tracker</h1>
          <div className="hero-description">
            This tool can be used to track your finances
          </div>
        </HeroTitle>
        <FinanceTrackerForm
          handleSubmitFinance={handleSubmitFinance}
          // financeErrors={financeErrors}
          isProcessingFinance={isSubmittingFinance}
        // shouldShowSuggestions={shouldShowSuggestions}
        />
      </div>
    </div>
  );
}

export default FinanceTracker;
