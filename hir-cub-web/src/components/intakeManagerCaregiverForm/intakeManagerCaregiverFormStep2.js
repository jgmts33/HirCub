import React, { useRef, useEffect } from 'react';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Input, Radio, Checkbox } from '~/components/ui/formControls';
import { caredNameValidation, caredPostalCodeValidation } from '~/consts/validation';

const formSuggestions = {
  mainIssues: {
    title: 'Would you like to learn more about it?',
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
};

function IntakeManagerCaregiverFormStep2(props) {
  const { values } = useFormState();
  const stepRef = useRef();
  useEffect(() => {
    window.scrollTo(0, stepRef.current.offsetTop);
  }, []);
  useAddSuggestion(formSuggestions, values);
  return (
    <div className="page-panel-group-container" ref={stepRef}>
      <h2 className="font-semibold">
        Tell us about the person you are caring for
      </h2>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          What is your relationship to the person you are caring for?
        </div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="1"
                component={Radio}
              >
                Partner or Spouse
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="2"
                component={Radio}
              >
                Parent
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="3"
                component={Radio}
              >
                Child
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="4"
                component={Radio}
              >
                Friend
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="5"
                component={Radio}
              >
                Grandchild
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="6"
                component={Radio}
              >
                Sibling
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="7"
                component={Radio}
              >
                Mother In-law
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="8"
                component={Radio}
              >
                Father In-law
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="9"
                component={Radio}
              >
                Aunt
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="10"
                component={Radio}
              >
                Uncle
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="relationship"
                value="11"
                component={Radio}
              >
                Other In-law
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group">
              <Field
                type="radio"
                name="relationship"
                value="12"
                component={Radio}
              >
                Cousin
              </Field>
            </div>
          </div>
          <div className="display-flex">
            <div className="flex flex-wrap items-center row-mx-15">
              <div className="sm-w-1-3 lg-w-1-4 w-full">
                <div className="form-group">
                  <Field
                    type="radio"
                    name="relationship"
                    value="13"
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
                      name="relationshipOther"
                      placeholder="Please Specify"
                      disabled={values.relationship !== '13'}
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
          Is the person you are caring for living in the same postal code as
          you?
        </div>
        <div className="page-panel-group-body display-flex">
          <div className="form-group mr-20">
            <Field
              type="radio"
              name="liveTogether"
              value="true"
              component={Radio}
            >
              Yes
            </Field>
          </div>
          <div className="form-group">
            <Field
              type="radio"
              name="liveTogether"
              value="false"
              component={Radio}
            >
              No
            </Field>
          </div>
        </div>
      </div>
      {values.liveTogether === 'false' && (
        <div className="page-panel-group panel-group">
          <div className="page-panel-group-title">
            Postal code of the person you are caring for*
          </div>
          <div className="page-panel-group-body">
            <div className="form-group">
              <Field
                type="text"
                name="caredPostalCode"
                placeholder=""
                validate={caredPostalCodeValidation}
                component={Input}
              />
            </div>
          </div>
        </div>
      )}
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          Who else lives in their home?
        </div>
        <div className="page-panel-group-body">
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="checkbox"
                name="othersLiveInTheHouse"
                value="1"
                component={Checkbox}
              >
                Children
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="checkbox"
                name="othersLiveInTheHouse"
                value="2"
                component={Checkbox}
              >
                Spouse
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="checkbox"
                name="othersLiveInTheHouse"
                value="3"
                component={Checkbox}
              >
                Foster children
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="checkbox"
                name="othersLiveInTheHouse"
                value="4"
                component={Checkbox}
              >
                Parents
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="checkbox"
                name="othersLiveInTheHouse"
                value="5"
                component={Checkbox}
              >
                Aunts/uncles
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="checkbox"
                name="othersLiveInTheHouse"
                value="6"
                component={Checkbox}
              >
                Friends
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="form-group">
              <Field
                type="checkbox"
                name="othersLiveInTheHouse"
                value="7"
                component={Checkbox}
              >
                Other
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          What is the main health issue of the person you are caring for?
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
          Does the person you are caring for have any other health issues you
          are concerned about?
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
          To make the app more personalised, please enter the first name or
          nickname of the person that you are caring for*
        </div>
        <div className="page-panel-group-body mb-10">
          <div className="sm-w-1-2 w-full px-0">
            <div className="form-group">
              <Field
                type="text"
                name="caredName"
                placeholder="Please Specify"
                validate={caredNameValidation}
                component={Input}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">How do they identify?</div>
        <div className="page-panel-group-body items-center">
          <div className="display-flex mb-10">
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="caredGender"
                value="2"
                component={Radio}
              >
                Female
              </Field>
            </div>
            <div className="form-group mr-20">
              <Field
                type="radio"
                name="caredGender"
                value="1"
                component={Radio}
              >
                Male
              </Field>
            </div>
          </div>
          <div className="display-flex mb-10">
            <div className="flex flex-wrap items-center row-mx-15">
              <div className="sm-w-1-3 lg-w-1-4 w-full">
                <div className="form-group">
                  <Field
                    type="radio"
                    name="caredGender"
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
                      name="caredGenderOther"
                      placeholder="Please Specify"
                      disabled={values.caredGender !== '3'}
                      component={Input}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntakeManagerCaregiverFormStep2;
