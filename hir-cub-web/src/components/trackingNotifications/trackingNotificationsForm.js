import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from '~/components/ui';
import { Radio, DayPicker, TimePicker } from '~/components/ui/formControls';
import { requiredValidation } from '~/consts/validation';

const now = new Date();
const disabledDays = [
  {
    before: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  },
];

function validate(values) {
  let errors = {};
  const periodError = requiredValidation(values.period);
  if (periodError) {
    errors.period = periodError;
  }
  return errors;
}

function TrackingNotificationsForm(props) {
  const { handleSubmit } = props;
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{ startTime: null }}
      validate={validate}
    >
      {({ handleSubmit, submitting, touched, errors }) => (
        <form
          className="flex flex-wrap items-center row-mx-15"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="lg-w-2-5 w-full lg-mb-0 mb-15">
            <div className="flex ms-xs-flex-wrap lg-justify-start justify-center rov-mx-15">
              <div className="px-15 ms-xs-w-full ms-xs-mb-15">
                <Field type="radio" name="period" value="1" component={Radio}>
                  Daily
                </Field>
              </div>
              <div className="px-15 ms-xs-w-full ms-xs-mb-15">
                <Field type="radio" name="period" value="2" component={Radio}>
                  Weekly
                </Field>
              </div>
              <div className="px-15 ms-xs-w-full">
                <Field type="radio" name="period" value="3" component={Radio}>
                  Monthly
                </Field>
              </div>
            </div>
            {touched.period && errors.period && (
              <div className="error-msg pl-10">{errors.period}</div>
            )}
          </div>
          <div className="lg-w-3-5 w-full">
            <div className="flex lg-items-center justify-center rov-mx-15 l-xs-flex-wrap lg-mb-0 mb-15">
              <div className="px-10 l-xs-w-full l-xs-mb-10">Beginning:</div>
              <div className="w-2-5 px-10 m-xs-w-1-2 m-xs-mb-10 ms-xs-w-full">
                <div className="input-datapicker-group relative">
                  <Field
                    name="startDate"
                    className="input-datapicker date"
                    validate={requiredValidation}
                    placeholder=""
                    dayPickerProps={{
                      disabledDays,
                    }}
                    component={DayPicker}
                  />
                  {touched.startDate && errors.startDate && (
                    <div className="absolute error-msg">{errors.startDate}</div>
                  )}
                </div>
              </div>
              <div className="w-2-5 px-10 m-xs-w-1-2 m-xs-mb-10 ms-xs-w-full">
                <div className="input-datapicker-group relative">
                  <Field
                    name="startTime"
                    use12Hours
                    showSecond={false}
                    autoComplete="off"
                    validate={requiredValidation}
                    component={TimePicker}
                  />
                  {touched.startTime && errors.startTime && (
                    <div className="absolute error-msg">{errors.startTime}</div>
                  )}
                </div>
              </div>
              <div className="m-xs-mt-10 m-xs-auto">
                <Button type="submit" kind="blue">
                  OK
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
}

export default TrackingNotificationsForm;
