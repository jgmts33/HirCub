import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { FormContextProvider } from '~/utils/formState';
import { Button } from '~/components/ui';
import FinanceTrackerTabs from './FinanceTrackerTabs';
import HelpBox from '../HelpBox';

function FinanceTrackerForm(props) {
  const {
    handleSubmitFinance,
  } = props;
  const [currentCard, setCurrentCard] = useState(null);

  return (
    <div className="w-full finance-container">
      <HelpBox
        title="&nbsp;"
        firstLine="How to use this tool? Examples of using this tool? Find answers in our help section"
        hash="/help#health"
      />

      <Form onSubmit={handleSubmitFinance}>
        {({ handleSubmit, values }) => (
          <FormContextProvider values={values}>
            <form
              onSubmit={handleSubmit}
              className="finance-tracker-problem-form"
            >
              <div className="clearfix row-mx-15">
                <FinanceTrackerTabs
                  setCurrentCard={setCurrentCard}
                />
              </div>
              {currentCard && (
                <div className="text-center pt-10 pb-10">
                  {/* {financeErrors && <div>{financeErrors[0]}</div>} */}
                  <Button type="submit" kind="purpure">
                    Submit
                  </Button>
                </div>
              )}
            </form>
            {/* {isProcessingFinance && <Loader />} */}
          </FormContextProvider>
        )}
      </Form>
    </div>
  );
}

export default FinanceTrackerForm;
