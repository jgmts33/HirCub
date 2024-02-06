import React from 'react';
import { Form } from 'react-final-form';
import { FormContextProvider } from '~/utils/formState';
import Concerns from './concerns';
import Questions from './questions';
import Problems from './problems';
import { Button } from '~/components/ui';
import { useState } from 'react';
import Loader from '../Loader';
import HelpBox from '../HelpBox';

import { usePermission } from '~/hooks';
import { formatDateNormal, PermissionType } from '~/consts';

function HealthTrackerForm(props) {
  const { isImpersonationMode, isWriteAllowed } = usePermission(
    PermissionType.HealthTracker
  );
  const [currentCard, setCurrentCard] = useState(null);

  const isSubmitAllowed = !isImpersonationMode || isWriteAllowed;

  const {
    handleSubmitConcern,
    handleSubmitQuestion,
    handleSubmitProblem,
    concernErrors,
    questionErrors,
    problemErrors,
    isProcessingConcern,
    isProcessingQuestion,
    isProcessingProblem,
    shouldShowSuggestions,
  } = props;

  const stringNow = formatDateNormal();
  const initialValues = {
    pain: { isFront: 'true', date: stringNow, bodyPart: '1' },
    tiredness: { date: stringNow },
    drowsiness: { date: stringNow },
    nausea: { date: stringNow },
    lackOfAppetite: { date: stringNow },
    shortnessOfBreath: { date: stringNow },
    depression: { date: stringNow },
    anxiety: { date: stringNow },
    wellBeing: { date: stringNow },
  };

  return (
    <div className="w-full health-container">
      <HelpBox
        title="&nbsp;"
        firstLine="How to use this tool? Examples of using this tool? Find answers in our help section"
        hash="/help#health"
      />

      <Form onSubmit={handleSubmitProblem} initialValues={initialValues}>
        {({ handleSubmit, values }) => (
          <FormContextProvider values={values}>
            <form
              onSubmit={handleSubmit}
              className="health-tracker-problem-form"
            >
              <div className="clearfix row-mx-15">
                <Problems
                  shouldShowSuggestions={shouldShowSuggestions}
                  setCurrentCard={setCurrentCard}
                />
              </div>
              {currentCard && (
                <div className="text-center pt-10 pb-10">
                  {problemErrors && <div>{problemErrors[0]}</div>}
                  <Button type="submit" kind="purpure">
                    Submit
                  </Button>
                </div>
              )}
            </form>
            {isProcessingProblem && <Loader />}
          </FormContextProvider>
        )}
      </Form>
      <Form onSubmit={handleSubmitConcern} initialValues={{}}>
        {({ handleSubmit, values }) => (
          <FormContextProvider values={values}>
            <form
              onSubmit={handleSubmit}
              className="health-tracker-concern-form"
            >
              <div className="clearfix row-mx-15">
                <Concerns />
              </div>
              {isSubmitAllowed && (
                <div className="text-center pt-10 pb-10">
                  {concernErrors && <div>{concernErrors[0]}</div>}
                  <Button type="submit" kind="purpure">
                    Submit
                  </Button>
                </div>
              )}
            </form>
            {isProcessingConcern && <Loader />}
          </FormContextProvider>
        )}
      </Form>

      <Form onSubmit={handleSubmitQuestion} initialValues={{}}>
        {({ handleSubmit, values }) => (
          <FormContextProvider values={values}>
            <form
              onSubmit={handleSubmit}
              className="health-tracker-question-form"
            >
              <div className="clearfix row-mx-15">
                <Questions />
              </div>
              {isSubmitAllowed && (
                <div className="text-center pt-10 pb-10">
                  {questionErrors && <div>{questionErrors[0]}</div>}
                  <Button type="submit" kind="purpure">
                    Submit
                  </Button>
                </div>
              )}
            </form>
            {isProcessingQuestion && <Loader />}
          </FormContextProvider>
        )}
      </Form>
    </div>
  );
}

export default HealthTrackerForm;
