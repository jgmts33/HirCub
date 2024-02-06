import React, { useEffect, useState } from 'react';
import { FormContextProvider } from '~/utils/formState';
import { Form } from 'react-final-form';
import { Button } from '../ui';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';

import { useAppDispatch } from '~/appState';
import ReminderSetting, {
  getDefaultValues,
  reminderList,
} from './reminderSetting';
import moment from 'moment';
import { showSettingPrompt } from '~/actions/global';
import { formatDateYMD } from '~/consts';
import './styles.scss';
import {
  useGetRemindersFetchOnce,
  usePostRemindersRequest,
} from '~/hooks/requests';
import Loader from '../Loader';

const focusOnError = createDecorator();
const decorators = [focusOnError];

function ReminderForm(props) {
  const dispatch = useAppDispatch();

  const formatTime = (hour, min) => {
    const date = formatDateYMD();

    const h = hour > 9 ? `${hour}` : `0${hour}`;
    const m = min > 9 ? `${min}` : `0${min}`;

    return moment(date + ` ${h}:${m}:00`);
  };

  const [fetchErrors] = useGetRemindersFetchOnce((items) => {
    let values = {};
    let hour = 12;
    let min = 0;

    items.map((item, idx) => {
      values[reminderList[idx].name] = `${item.state}`;
      if (idx == 0) {
        hour = item.hours;
        min = item.minutes;
      }
    });
    values['alertTime'] = formatTime(hour, min);

    setFormValues(values);
  });

  const [formValues, setFormValues] = useState({ alertTime: null });
  const [isLoading, setLoading] = useState(false);

  const { postErrors, sendRequest } = usePostRemindersRequest(
    handleSubmitSuccess
  );

  function handleSubmitSuccess() {
    dispatch(showSettingPrompt(true));
    setLoading(false);
  }

  function validate(values) {
    return {};
  }

  const getValuesFromLocal = () => {
    let values = getDefaultValues();
    values['alertTime'] = formatTime(12, 0);
    setFormValues(values);
  };

  const handleSubmit = (formData) => {
    if (isLoading) {
      return;
    }
    setLoading(true);

    let alertTime = moment(formData['alertTime']);
    let hour = alertTime.hours();
    let min = alertTime.minutes();

    const param = reminderList.map((item, index) => {
      let state = formData[item.name] ? Number(formData[item.name]) : 1;
      return {
        reminderReferenceId: index + 1,
        state: state,
        hours: hour,
        minutes: min,
      };
    });
    console.log(param);
    sendRequest(param);
  };

  useEffect(() => {
    getValuesFromLocal();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [postErrors]);

  return (
    <React.Fragment>
      <div className="reminder-style">
        <div className="form-title">My Reminders</div>
        <div className="form-description">Introduction contents here.</div>

        <hr />

        <Form
          mutators={{
            ...arrayMutators,
          }}
          initialValues={formValues}
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
                  <ReminderSetting />

                  <div className="btn-reminder">
                    <Button type="submit" kind="purpure" disabled={submitting}>
                      <i className="fas fa-lock" />
                      Update/Save
                    </Button>
                  </div>
                </form>
              </FormContextProvider>
            );
          }}
        </Form>
        {isLoading && <Loader />}
      </div>
    </React.Fragment>
  );
}

export default ReminderForm;
