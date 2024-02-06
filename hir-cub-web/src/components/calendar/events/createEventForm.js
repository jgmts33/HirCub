import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from '~/components/ui';
import {
  Input,
  Textarea,
  Checkbox,
  DayPicker,
  TimePicker,
} from '~/components/ui/formControls';
import ErrorsBlock from '~/components/shared/errorsBlock';
import { formatDateNormal } from '~/consts';
import { requiredValidation } from '~/consts/validation';

const titleValidation = requiredValidation;
const descriptionValidation = requiredValidation;
const startDateValidation = requiredValidation;
const startTimeValidation = requiredValidation;
const endDateValidation = requiredValidation;
const endTimeValidation = requiredValidation;

function CreateEventForm(props) {
  const { errors: serverErrors, handleSubmit, cancelEvent, startDate } = props;
  const [formValues] = useState({ startDate: formatDateNormal(startDate) });
  return (
    <div>
      <div className="text-center">Create Event:</div>
      <Form onSubmit={handleSubmit} initialValues={formValues}>
        {({ handleSubmit, submitting, values, touched, errors }) => (
          <form onSubmit={handleSubmit} className="template-form">
            <div className="form-group">
              <div className="flex items-center">
                <div className="w-full">
                  <Field
                    type="text"
                    name="title"
                    placeholder="Title"
                    validate={titleValidation}
                    component={Input}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="flex items-center">
                <div className="w-full">
                  <Field
                    type="text"
                    name="description"
                    placeholder="Description"
                    validate={descriptionValidation}
                    component={Textarea}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="w-full">
                <Field type="checkbox" name="fullDay" component={Checkbox}>
                  Full day
                </Field>
              </div>
            </div>
            <div className="w-full">
              <label>Start Date:</label>
            </div>
            <div className="form-group">
              <div className="w-full">
                <div className="input-datapicker-group relative">
                  <Field
                    name="startDate"
                    className="input-datapicker date"
                    validate={startDateValidation}
                    placeholder=""
                    component={DayPicker}
                    dayPickerProps={{
                      disabledDays: {
                        before: new Date(),
                      },
                    }}
                  />
                  {touched.startDate && errors.startDate && (
                    <div style={{ color: 'red', fontSize: '14px' }}>
                      {errors.startDate}
                    </div>
                  )}
                </div>
              </div>
              {!values.fullDay && (
                <>
                  <div className="w-full">
                    <label>Time:</label>
                  </div>
                  <div className="form-group">
                    <div className="w-full">
                      <div className="input-datapicker-group relative">
                        <Field
                          name="startTime"
                          use12Hours
                          showSecond={false}
                          autoComplete="off"
                          validate={startTimeValidation}
                          component={TimePicker}
                        />
                        {/* {touched.startTime && errors.startTime && (
                  <div className="absolute error-msg">{errors.startTime}</div>
                )} */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="w-full">
              <label>End Date:</label>
            </div>
            <div className="form-group">
              <div className="w-full">
                <div className="input-datapicker-group relative">
                  <Field
                    name="endDate"
                    className="input-datapicker date"
                    validate={endDateValidation}
                    placeholder=""
                    component={DayPicker}
                    dayPickerProps={{
                      disabledDays: {
                        before: new Date(),
                      },
                    }}
                  />
                  {touched.endDate && errors.endDate && (
                    <div style={{ color: 'red', fontSize: '14px' }}>
                      {errors.endDate}
                    </div>
                  )}
                </div>
              </div>
              {!values.fullDay && (
                <>
                  <div className="w-full">
                    <label>Time:</label>
                  </div>
                  <div className="w-full">
                    <div className="input-datapicker-group relative">
                      <Field
                        name="endTime"
                        use12Hours
                        showSecond={false}
                        autoComplete="off"
                        validate={endTimeValidation}
                        component={TimePicker}
                      />
                      {/* {touched.startTime && errors.startTime && (
                  <div className="absolute error-msg">{errors.startTime}</div>
                )} */}
                    </div>
                  </div>
                </>
              )}
            </div>
            <ErrorsBlock errors={serverErrors} />
            <div className="text-center pt-10 flex justify-around">
              <Button type="submit" kind="purpure" disabled={submitting}>
                Create
              </Button>
              <Button kind="full-blue" onClick={cancelEvent}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}

export default CreateEventForm;
