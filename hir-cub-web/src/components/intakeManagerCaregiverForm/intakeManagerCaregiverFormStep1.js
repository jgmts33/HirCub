import React, { useRef, useEffect } from 'react';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';
import { Field } from 'react-final-form';
import { Radio, Input, Checkbox } from '~/components/ui/formControls';
import { postalCodeValidation } from '~/consts/validation';

const formSuggestions = {
  alreadyProvidedCare: {
    title: 'Would you like to learn more about it?',
    options: { false: [1] },
  },
  caredPeople: {
    title: 'Would you like to learn more about it?',
    condition: function condition(value) {
      if (value && (value.includes('3') || value.includes('4'))) {
        return '3';
      }
    },
    options: { '3': [52, 53], '4': [52, 53] },
  },
  caredOthersChildren: {
    title: 'Would you like to learn more about it?',
    condition: function condition(value) {
      if (
        value &&
        (value.includes('1') || value.includes('2') || value.includes('3'))
      ) {
        return '1';
      }
    },
    options: { '1': [52, 53], '2': [52, 53], '3': [52, 53] },
  },
};

function IntakeManagerCaregiverFormStep1(props) {
  const { values } = useFormState();
  const stepRef = useRef();
  useEffect(() => {
    window.scrollTo(0, stepRef.current.offsetTop);
  }, []);
  useAddSuggestion(formSuggestions, values);
  return (
    <div className="page-panel-group-container" ref={stepRef}>
      <h2 className="font-semibold">First, tell us about you</h2>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          What is your name or preferred screen name?
        </div>
        <div className="page-panel-group-body">
          <div className="sm-w-1-2 w-full px-0">
            <div className="form-group">
              <Field
                type="text"
                name="screenName"
                placeholder="Please input your name"
                component={Input}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          What age group do you fit into?
        </div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="age" value="1" component={Radio}>
                Under 12
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="age" value="2" component={Radio}>
                12 - 18
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="age" value="3" component={Radio}>
                19 - 44
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="age" value="4" component={Radio}>
                45 - 64
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mb-10">
              <Field type="radio" name="age" value="5" component={Radio}>
                65 and over
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group ">
        <div className="page-panel-group-title">How do you identify?</div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-20 mt-10">
              <Field type="radio" name="gender" value="1" component={Radio}>
                Male
              </Field>
            </div>
            <div className="form-group mr-20 mt-10">
              <Field type="radio" name="gender" value="2" component={Radio}>
                Female
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="flex flex-wrap items-center row-mx-15">
              <div className="sm-w-1-3 lg-w-1-4 w-full">
                <div className="form-group mb-15">
                  <Field type="radio" name="gender" value="3" component={Radio}>
                    Other
                  </Field>
                </div>
              </div>
              <div className="sm-w-2-3 lg-w-3-4 w-full">
                <div className="w-full px-0 mt-15 sm-mt-0">
                  <div className="form-group">
                    <Field
                      type="text"
                      name="genderOther"
                      placeholder="Please Specify"
                      disabled={values.gender !== '3'}
                      component={Input}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">What pronouns do you use?</div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="pronoun" value="1" component={Radio}>
                She/her
              </Field>
            </div>
            <div className="form-group mr-20">
              <Field type="radio" name="pronoun" value="2" component={Radio}>
                He/him
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="pronoun" value="3" component={Radio}>
                They
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="pronoun" value="4" component={Radio}>
                Ze/zir
              </Field>
            </div>
            <div className="form-group">
              <Field type="radio" name="pronoun" value="5" component={Radio}>
                Ze/zim
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group ">
        <div className="page-panel-group-title">What is your postal code?*</div>
        <div className="page-panel-group-body pb-20 mb-10">
          <div className="sm-w-1-2 w-full px-0">
            <div className="form-group">
              <Field
                type="text"
                name="postalCode"
                placeholder="Please enter postal code"
                component={Input}
                validate={postalCodeValidation}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          Have you provided care to someone before?
        </div>
        <div className="page-panel-group-body display-flex">
          <div className="form-group mr-20">
            <Field
              type="radio"
              name="alreadyProvidedCare"
              value="true"
              component={Radio}
            >
              Yes
            </Field>
          </div>
          <div className="form-group">
            <Field
              type="radio"
              name="alreadyProvidedCare"
              value="false"
              component={Radio}
            >
              No
            </Field>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          How long have you been providing care for?
        </div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-10">
              <Field
                type="radio"
                name="caringPeriod"
                value="1"
                component={Radio}
              >
                Less than a month
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-10">
              <Field
                type="radio"
                name="caringPeriod"
                value="2"
                component={Radio}
              >
                Between one and six months
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-10">
              <Field
                type="radio"
                name="caringPeriod"
                value="3"
                component={Radio}
              >
                Between six months and a year
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group">
              <Field
                type="radio"
                name="caringPeriod"
                value="4"
                component={Radio}
              >
                Over a year
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          How many days a week do you provide some level of care?
        </div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="daysCare" value="1" component={Radio}>
                1-2 days
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="daysCare" value="2" component={Radio}>
                3-4 days
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="daysCare" value="3" component={Radio}>
                4-6 days
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group">
              <Field type="radio" name="daysCare" value="4" component={Radio}>
                7 days
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          On the days you provide care, how much time does caregiving currently
          take?
        </div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="caregivingTime"
                value="1"
                component={Radio}
              >
                Less than 1 hour
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="caregivingTime"
                value="2"
                component={Radio}
              >
                1 to 3 hours
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="caregivingTime"
                value="3"
                component={Radio}
              >
                3 to 6 hours
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group">
              <Field
                type="radio"
                name="caregivingTime"
                value="4"
                component={Radio}
              >
                Over 6 hours
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          Do you have children or other family members who you are also caring
          for?
        </div>
        <div className="page-panel-group-body display-flex">
          <div className="form-group mr-20">
            <Field
              type="radio"
              name="haveOtherCared"
              value="true"
              component={Radio}
            >
              Yes
            </Field>
          </div>
          <div className="form-group">
            <Field
              type="radio"
              name="haveOtherCared"
              value="false"
              component={Radio}
            >
              No
            </Field>
          </div>
        </div>
      </div>
      {values.haveOtherCared === 'true' && (
        <div className="page-panel-group panel-group">
          <div className="page-panel-group-title">
            Who are the other people you are caring for
          </div>
          <div className="page-panel-group-body">
            <div className="display-flex mb-10">
              <div className="form-group mr-20">
                <Field
                  type="checkbox"
                  name="caredPeople"
                  value="1"
                  component={Checkbox}
                >
                  Partner
                </Field>
              </div>
            </div>
            <div className="display-flex mb-10">
              <div className="form-group mr-20">
                <Field
                  type="checkbox"
                  name="caredPeople"
                  value="2"
                  component={Checkbox}
                >
                  Parent/parents
                </Field>
              </div>
            </div>
            <div className="display-flex mb-10">
              <div className="form-group mr-20">
                <Field
                  type="checkbox"
                  name="caredPeople"
                  value="3"
                  component={Checkbox}
                >
                  Child
                </Field>
              </div>
            </div>
            <div className="display-flex mb-10">
              <div className="form-group mr-20">
                <Field
                  type="checkbox"
                  name="caredPeople"
                  value="4"
                  component={Checkbox}
                >
                  Multiple children
                </Field>
              </div>
            </div>
            <div className="display-flex mb-10">
              <div className="form-group">
                <Field
                  type="checkbox"
                  name="caredPeople"
                  value="5"
                  component={Checkbox}
                >
                  Other
                </Field>
              </div>
            </div>
          </div>
        </div>
      )}
      {values.caredPeople &&
        (values.caredPeople.indexOf('3') > -1 ||
          values.caredPeople.indexOf('4') > -1) && (
          <div className="page-panel-group panel-group">
            <div className="page-panel-group-title">
              What age group/groups do they fit into?
            </div>
            <div className="page-panel-group-body">
              <div className="display-flex mb-10">
                <div className="form-group mr-20">
                  <Field
                    type="checkbox"
                    name="caredOthersChildren"
                    value="1"
                    component={Checkbox}
                  >
                    Under 12
                  </Field>
                </div>
                <div className="form-group mr-20">
                  <Field
                    type="checkbox"
                    name="caredOthersChildren"
                    value="2"
                    component={Checkbox}
                  >
                    12-18
                  </Field>
                </div>
              </div>
              <div className="display-flex mb-10">
                <div className="form-group">
                  <Field
                    type="checkbox"
                    name="caredOthersChildren"
                    value="3"
                    component={Checkbox}
                  >
                    19 and older
                  </Field>
                </div>
              </div>
            </div>
          </div>
        )}
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          If you drive, do you have reliable access to a vehicle?
        </div>
        <div className="page-panel-group-body display-flex">
          <div className="form-group mr-20">
            <Field type="radio" name="drive" value="true" component={Radio}>
              Yes
            </Field>
          </div>
          <div className="form-group">
            <Field type="radio" name="drive" value="false" component={Radio}>
              No
            </Field>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">Are you employed?</div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="work" value="1" component={Radio}>
                Yes — Full time
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field type="radio" name="work" value="2" component={Radio}>
                Yes — Part time
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group">
              <Field type="radio" name="work" value="3" component={Radio}>
                No
              </Field>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntakeManagerCaregiverFormStep1;
