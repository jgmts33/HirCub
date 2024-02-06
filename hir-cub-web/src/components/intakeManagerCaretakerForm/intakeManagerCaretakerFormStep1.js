import React from 'react';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Radio, Input, Checkbox, Textarea } from '~/components/ui/formControls';
import './styles.scss';
import { postalCodeValidation } from '~/consts/validation';

const formSuggestions = {
  mainIssues: {
    title: 'Would you like to learn more about it?',
    // eslint-disable-next-line
    condition: function condition(value) {
      if (
        value &&
        value.filter((mi) => mi && mi.toLowerCase().includes('lung')).length > 0
      ) {
        return 'value';
      }
    },
    options: { value: [3] },
  },
  minorIssues: {
    title: 'Would you like to learn more about it?',
    // eslint-disable-next-line
    condition: function condition(value) {
      if (
        value &&
        value.filter((mi) => mi && mi.toLowerCase().includes('insomnia'))
          .length > 0
      ) {
        return 'value';
      }
    },
    options: { value: [44, 54] },
  },
  haveChildren: {
    title: 'Would you like to learn more about it?',
    options: { '1': [52] },
  },
  childrenAge: {
    title: 'Would you like to learn more about it?',
    // eslint-disable-next-line
    condition: function condition(value) {
      if (
        value &&
        (value.includes('1') || value.includes('2') || value.includes('3'))
      ) {
        return '1';
      }
    },
    options: { '1': [52], '2': [52], '3': [52] },
  },
};

function IntakeManagerCaretakerFormStep1(props) {
  const { values } = useFormState();

  useAddSuggestion(formSuggestions, values);
  // useEffect(() => {
  //   window.scrollTo(0, stepRef.current.offsetTop);
  // }, []);
  return (
    <div className="intake-caretaker-form">
      <div className="page-panel-group-container">
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
          <div className="page-panel-group-title">What is your age?</div>
          <div className="page-panel-group-body">
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="age" value="1" component={Radio}>
                  Under 12
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="age" value="2" component={Radio}>
                  12 - 18
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="age" value="3" component={Radio}>
                  19 - 44
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="age" value="4" component={Radio}>
                  45 - 64
                </Field>
              </div>
            </div>
            <div className="display-field">
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
            <div className="display-field">
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
            <div className="display-field">
              <div className="flex flex-wrap items-center row-mx-15">
                <div className="sm-w-1-3 lg-w-1-4 w-full">
                  <div className="form-group mb-15">
                    <Field
                      type="radio"
                      name="gender"
                      value="3"
                      component={Radio}
                    >
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
          <div className="page-panel-group-title">
            What pronouns do you use?
          </div>
          <div className="page-panel-group-body">
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="pronoun" value="1" component={Radio}>
                  She/her
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="pronoun" value="2" component={Radio}>
                  He/him
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="pronoun" value="3" component={Radio}>
                  They
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="pronoun" value="4" component={Radio}>
                  Ze/zir
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group">
                <Field type="radio" name="pronoun" value="5" component={Radio}>
                  Ze/zim
                </Field>
              </div>
            </div>
          </div>
        </div>
        <div className="page-panel-group panel-group">
          <div className="page-panel-group-title">
            What is your postal code?*
          </div>
          <div className="page-panel-group-body mb-10">
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
            What is the main health issue you are dealing with?
          </div>
          <div className="page-panel-group-body">
            <FieldArray name="mainIssues">
              {({ fields }) => (
                <div className="fields-list clearfix">
                  {fields.map((name, index) => (
                    <div
                      key={name}
                      className="form-group flex justify-between items-center"
                    >
                      <Field
                        type="text"
                        name={name}
                        placeholder="Please Specify"
                        component={Input}
                      />
                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => fields.remove(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add-item uppercase"
                    onClick={() => fields.push('')}
                  >
                    + Add another health issue
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
        </div>
        <div className="page-panel-group panel-group">
          <div className="page-panel-group-title">
            How long have you been living with this health issue?
          </div>
          <div className="page-panel-group-body">
            <div className="display-field">
              <div className="form-group">
                <Field
                  type="radio"
                  name="timeLivingWithMainIssues"
                  value="1"
                  component={Radio}
                >
                  Less than a month
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group">
                <Field
                  type="radio"
                  name="timeLivingWithMainIssues"
                  value="2"
                  component={Radio}
                >
                  Between one and six months
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group">
                <Field
                  type="radio"
                  name="timeLivingWithMainIssues"
                  value="3"
                  component={Radio}
                >
                  Between six months and a year
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group">
                <Field
                  type="radio"
                  name="timeLivingWithMainIssues"
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
            Do you have other health issues you are concerned about?
          </div>
          <div className="page-panel-group-body">
            <FieldArray name="minorIssues">
              {({ fields }) => (
                <div className="fields-list clearfix">
                  {fields.map((name, index) => (
                    <div
                      key={name}
                      className="form-group flex justify-between items-center"
                    >
                      <Field
                        type="text"
                        name={name}
                        placeholder="Please Specify"
                        component={Input}
                      />
                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => fields.remove(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add-item uppercase"
                    onClick={() => fields.push('')}
                  >
                    + Add another health issue
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
        </div>
        <div className="page-panel-group panel-group">
          <div className="page-panel-group-title">
            How long have you been living with these health issues?
          </div>
          <div className="page-panel-group-body">
            <div className="display-field">
              <div className="form-group">
                <Field
                  type="radio"
                  name="timeLivingWithMinorIssues"
                  value="1"
                  component={Radio}
                >
                  Less than a month
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group">
                <Field
                  type="radio"
                  name="timeLivingWithMinorIssues"
                  value="2"
                  component={Radio}
                >
                  Between one and six months
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group">
                <Field
                  type="radio"
                  name="timeLivingWithMinorIssues"
                  value="3"
                  component={Radio}
                >
                  Between six months and a year
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group">
                <Field
                  type="radio"
                  name="timeLivingWithMinorIssues"
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
          <div className="page-panel-group-title">Do you have children?</div>
          <div className="page-panel-group-body display-flex">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="haveChildren"
                value="1"
                component={Radio}
              >
                Yes
              </Field>
            </div>
            <div className="form-group">
              <Field
                type="radio"
                name="haveChildren"
                value="2"
                component={Radio}
              >
                No
              </Field>
            </div>
          </div>
        </div>
        {values.haveChildren === '1' && (
          <div className="page-panel-group panel-group">
            <div className="page-panel-group-title">
              What age group/groups do they fit into?
            </div>
            <div className="page-panel-group-body">
              <div className="display-field">
                <div className="form-group mr-20">
                  <Field
                    type="checkbox"
                    name="childrenAge"
                    value="1"
                    component={Checkbox}
                  >
                    Child (under 12)
                  </Field>
                </div>
              </div>
              <div className="display-field">
                <div className="form-group mr-20">
                  <Field
                    type="checkbox"
                    name="childrenAge"
                    value="2"
                    component={Checkbox}
                  >
                    Child (12-18)
                  </Field>
                </div>
              </div>
              <div className="display-field">
                <div className="form-group">
                  <Field
                    type="checkbox"
                    name="childrenAge"
                    value="3"
                    component={Checkbox}
                  >
                    Adult (over 18)
                  </Field>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="page-panel-group panel-group">
          <div className="page-panel-group-title">Are you employed?</div>
          <div className="page-panel-group-body">
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="work" value="1" component={Radio}>
                  Yes — Full time
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group mr-20">
                <Field type="radio" name="work" value="2" component={Radio}>
                  Yes — Part time
                </Field>
              </div>
            </div>
            <div className="display-field">
              <div className="form-group">
                <Field type="radio" name="work" value="3" component={Radio}>
                  No
                </Field>
              </div>
            </div>
          </div>
        </div>
        <div className="page-panel-group panel-group">
          <div className="page-panel-group-title">Do you have a dependant?</div>
          <div className="page-panel-group-body display-flex">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="haveDependants"
                value="1"
                component={Radio}
              >
                Yes
              </Field>
            </div>
            <div className="form-group">
              <Field
                type="radio"
                name="haveDependants"
                value="2"
                component={Radio}
              >
                No
              </Field>
            </div>
          </div>
        </div>
        {values.haveDependants === '1' && (
          <div className="page-panel-group panel-group">
            <div className="page-panel-group-title">
              How old are your dependants
            </div>
            <div className="page-panel-group-body">
              <div className="display-field">
                <div className="form-group mr-20">
                  <Field
                    type="checkbox"
                    name="dependantsAge"
                    value="1"
                    component={Checkbox}
                  >
                    Child (under 12)
                  </Field>
                </div>
              </div>
              <div className="display-field">
                <div className="form-group mr-20">
                  <Field
                    type="checkbox"
                    name="dependantsAge"
                    value="2"
                    component={Checkbox}
                  >
                    Child (12-18)
                  </Field>
                </div>
              </div>
              <div className="display-field">
                <div className="form-group">
                  <Field
                    type="checkbox"
                    name="dependantsAge"
                    value="3"
                    component={Checkbox}
                  >
                    Adult (over 18)
                  </Field>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="page-panel-group panel-group">
          <div
            className="page-panel-group-title"
            title="This might include key roles or qualities you feel define you as a person, people and things that are important to you, core values, things you are afraid of, care preferences / personal care needs, etc."
          >
            What does the person providing care to you need to know to give you
            the best care possible?
          </div>
          <div className="page-panel-group-body">
            <div className="form-group">
              <Field name="additionalInfo" component={Textarea} rows="5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntakeManagerCaretakerFormStep1;
