import React, { useEffect, useState } from 'react';
import { FormContextProvider } from '~/utils/formState';
import CaregivingFormStep1 from './caregivingFormStep1';
import CaregivingFormStep2 from './caregivingFormStep2';
import { Form } from 'react-final-form';
import { Button } from '../ui';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';

import './styles.scss';
import useAppState, { useAppDispatch } from '~/appState';
import { showAddedPrompt } from '~/actions/global';
import { GetName, GetValuesFromLocal, SetValuesToLocal } from '~/consts/global';
import HelpBox from '../HelpBox';

const focusOnError = createDecorator();
const decorators = [focusOnError];

function IntakeManagerForm(props) {
  const appState = useAppState();
  const dispatch = useAppDispatch();

  const [values, setValues] = useState({});

  const [collapse1, setCollapse1] = useState(true);
  const [collapse2, setCollapse2] = useState(false);

  const myName = GetName();

  function validate(values) {
    return {};
  }

  const getValuesFromLocal = () => {
    let value = GetValuesFromLocal(appState, 'caregiving');
    if (value) {
      setValues(value);
    }
  };

  const handleSubmit = (formData) => {
    SetValuesToLocal(appState, 'caregiving', formData);

    dispatch(showAddedPrompt(true));
  };

  function handlePrint(values) {
    window.print();
  }

  useEffect(() => {
    getValuesFromLocal();
  }, []);

  return (
    <React.Fragment>
      <div className={`caregiving-style ${props.option ? '' : 'radius-style'}`}>
        <div className="form-title">
          My Caregiving Needs {props.option ? 'Questions' : ''}
        </div>
        <HelpBox
          firstLine="HOW TO USE THIS TOOL? WHY ANSWER THESE QUESTIONS?"
          secondLine="FIND ANSWERS IN OUR HELP SECTION"
          hash="/help"
        />

        <div className="form-description">
          The following questionnaire will assess your caregiving needs.
          Resources will be populated in your library based on your responses.
          You may download or print your responses to share with friends,
          family, or healthcare providers. Your most recent set of answers will
          be saved and you are encouraged update your responses when your
          caregiving needs change and as {myName}’s illness progresses.
        </div>

        <hr />

        <Form
          mutators={{
            ...arrayMutators,
          }}
          initialValues={values}
          validate={validate}
          onSubmit={handleSubmit}
          decorators={decorators}
        >
          {({ handleSubmit, submitting, values, touched, errors }) => {
            return (
              <FormContextProvider
                values={values}
                errors={errors}
                touched={touched}
              >
                <form onSubmit={handleSubmit}>
                  <CaregivingFormStep1
                    collapsed={collapse1}
                    setCollapsed={(flag) => {
                      if (flag != collapse1) {
                        setCollapse1(flag);
                      }
                    }}
                  />
                  <CaregivingFormStep2
                    collapsed={collapse2}
                    setCollapsed={(flag) => setCollapse2(flag)}
                  />
                  <div className="care-giving-feedback">
                    <div className="feedback-text">
                      {' '}
                      Do you need resources or information for a caregiving task
                      that isn't listed here? Let us know! Reach out to &zwnj;
                      <a href="mailto:carehub@virtualhospice.ca">
                        carehub@virtualhospice.ca
                      </a>{' '}
                      to give us your suggestion or feedback for future
                      development.
                    </div>
                    <a
                      href="mailto:carehub@virtualhospice.ca?subject=CareHub Feedback"
                      className="btn -blue-btn"
                      type="button"
                    >
                      <i class="far fa-comment-alt"></i> Provide feedback
                    </a>
                  </div>

                  <div className="btn-care-giving">
                    <Button
                      type="button"
                      kind="full-blue"
                      onClick={() => handlePrint(values)}
                    >
                      <i className="fas fa-print" />
                      Print/Download PDF
                    </Button>

                    <Button type="submit" kind="purpure" disabled={submitting}>
                      <i className="fas fa-lock" />
                      {props.option ? 'Update/' : ''}Save
                    </Button>
                  </div>
                </form>
              </FormContextProvider>
            );
          }}
        </Form>
      </div>
    </React.Fragment>
  );
}

export default IntakeManagerForm;
