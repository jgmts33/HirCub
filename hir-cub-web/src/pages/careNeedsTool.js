import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-final-form';
import CareNeedsToolQuestion from '~/components/CareNeedsToolQuestion';
import CareNeedsToolPage from '~/components/CareNeedsToolPage';
import HeroTitle from '~/components/shared/heroTitle';
import { FormContextProvider } from '~/utils/formState';
import { Button } from '../components/ui';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';
import useAppState, { useAppDispatch } from '~/appState';
import { GetValuesFromLocal, SetValuesToLocal } from '~/consts/global';
import { showAddedPrompt } from '~/actions/global';
import { formatDateYMD } from '~/consts';


const focusOnError = createDecorator();
const decorators = [focusOnError];

function CareNeedsTool(props) {
  const appState = useAppState();
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({});

  function validate(values) {
    return {};
  }

  const getValuesFromLocal = () => {
    const nowDate = formatDateYMD();
    let values = GetValuesFromLocal(appState, 'care-needs-tool') || {};
    let formValue = values[nowDate];
    if (formValue) {
      setValues(formValue);
    }
  };

  const handleSubmit = (formData) => {
    const nowDate = formatDateYMD();
    console.log('careNeedTools', nowDate);

    let values = GetValuesFromLocal(appState, 'care-needs-tool') || {};

    values[`'${nowDate}'`] = formData;
    
    SetValuesToLocal(appState, 'care-needs-tool', values);

    dispatch(showAddedPrompt(true));
  };

  useEffect(() => {
    getValuesFromLocal();
  }, []);

  return (
    <React.Fragment>
      <div className="mobility-tracker-page md-pb-50 lg-pb-30 sm-pb-20 relative">
        <div className="container">
          <HeroTitle imageUrl="/img/medication.svg">
            <h1>Care Needs Tool</h1>
            <div className="hero-description">
              Tracking any changes that may occur in everyday living can help to
              sort out care needs. Your answers will be used to make a report so
              you can see changes over time. Helpful items will be sent to The
              Library based on your answers. You may wish to share any changes
              with healthcare providers so they can better meet any care needs.
              You can also view your answers in{' '}
              <Link className="" to="/reports">
                Health Reports
              </Link>
            </div>
          </HeroTitle>

          <CareNeedsToolPage />
          <div className='mobility-question-style'>
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
                      <CareNeedsToolQuestion />
                      <div className='btn-mobility'>
                        <Button type="submit" kind="purpure" disabled={submitting}>
                          Submit
                        </Button>
                      </div>
                    </form>
                  </FormContextProvider>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CareNeedsTool;
