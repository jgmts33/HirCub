import React from 'react';
import useFormState from '~/utils/formState';
import useAppState from '~/appState';
import { RadioTemplate } from '~/components/shared/formTemplates';
import { Field } from 'react-final-form';
import { TimePicker } from '~/components/ui/formControls';
import { AccountType } from '~/consts';
import './styles.scss';
import { requiredValidation } from '~/consts/validation';
export const reminderList = [
  {
    type: 'radio',
    name: 'calendar',
    title: 'Calendar',
    default: '2',
    options: [
      {
        value: '1',
        label: 'Off',
      },
      {
        value: '2',
        label: 'Daily',
      },
      {
        value: '3',
        label: 'Weekly',
      },
      {
        value: '4',
        label: 'Monthly',
      },
    ],
  },
  {
    type: 'radio',
    name: 'healthTracker',
    title: 'Health Tracker',
    default: '2',
    options: [
      {
        value: '1',
        label: 'Off',
      },
      {
        value: '2',
        label: 'Daily',
      },
      {
        value: '3',
        label: 'Weekly',
      },
      {
        value: '4',
        label: 'Monthly',
      },
    ],
  },
  {
    type: 'radio',
    name: 'expenseTracker',
    title: 'Expense Tracker',
    default: '2',
    options: [
      {
        value: '1',
        label: 'Off',
      },
      {
        value: '2',
        label: 'Daily',
      },
      {
        value: '3',
        label: 'Weekly',
      },
      {
        value: '4',
        label: 'Monthly',
      },
    ],
  },
  {
    type: 'radio',
    name: 'medicationTracker',
    title: 'Medication Tracker',
    default: '2',
    options: [
      {
        value: '1',
        label: 'Off',
      },
      {
        value: '2',
        label: 'Daily',
      },
      {
        value: '3',
        label: 'Weekly',
      },
      {
        value: '4',
        label: 'Monthly',
      },
    ],
  },
  {
    type: 'radio',
    name: 'mobilityTracker',
    title: 'Care Needs Tool',
    default: '3',
    options: [
      {
        value: '1',
        label: 'Off',
      },
      {
        value: '-1',
        label: '',
      },
      {
        value: '3',
        label: 'Weekly',
      },
      {
        value: '4',
        label: 'Monthly',
      },
    ],
  },
  {
    type: 'radio',
    name: 'caregivingNeeds',
    title: 'Caregiving Needs Questionnaire',
    default: '4',
    options: [
      {
        value: '1',
        label: 'Off',
      },
      {
        value: '-1',
        label: '',
      },
      {
        value: '-1',
        label: '',
      },
      {
        value: '4',
        label: 'Monthly',
      },
    ],
  },
  {
    type: 'radio',
    name: 'profileUpdate',
    title: 'Profile Update',
    default: '4',
    options: [
      {
        value: '1',
        label: 'Off',
      },
      {
        value: '-1',
        label: '',
      },
      {
        value: '-1',
        label: '',
      },
      {
        value: '4',
        label: 'Monthly',
      },
    ],
  },
  {
    type: 'radio',
    name: 'library',
    title: 'Library',
    default: '4',
    options: [
      {
        value: '1',
        label: 'Off',
      },
      {
        value: '-1',
        label: '',
      },
      {
        value: '-1',
        label: '',
      },
      {
        value: '4',
        label: 'Monthly',
      },
    ],
  },
];
export const reminderListForPatient = [
  reminderList[0], //Calendar
  reminderList[1], //Health Tracker
  reminderList[2], //Expense Tracker
  reminderList[3], //Medication Tracker
  reminderList[4], //Care Needs Tracker
  reminderList[6], //Profile Update
  reminderList[7], //Library
];
export const reminderListForCaregiver = [
  reminderList[0], //Calendar
  reminderList[2], //Expense Tracker
  reminderList[5], //Caregiving Needs Questionnaire
  reminderList[6], //Profile Update
  reminderList[7], //Library
];

export const getDefaultValues = () => {
  const questions = reminderList;

  let values = {};
  questions.map((item, idx) => {
    values[item.name] = item.default;
  });
  return values;
};

function ReminderSetting() {
  const {
    global: { accountType },
  } = useAppState();
  const { values, touched, errors } = useFormState();
  const questions =
    accountType === AccountType.Patient
      ? reminderListForPatient
      : reminderListForCaregiver;

  return (
    <div className="form-reminder-setting">
      <div className="panel-group reminder-alert">
        <div className="reminder-label">
          <span>Alert Time:</span>
        </div>
        <div className="my-10">
          <div className="input-datapicker-group relative">
            <Field
              name="alertTime"
              use12Hours
              showSecond={false}
              autoComplete="off"
              validate={requiredValidation}
              component={TimePicker}
              value={values['alertTime']}
            />
            {touched.alertTime && errors.alertTime && (
              <div className="absolute error-msg">{errors.alertTime}</div>
            )}
          </div>
        </div>
      </div>

      <div className="page-panel-group-container">
        {questions.map((question, i) => {
          return (
            <RadioTemplate
              key={i}
              question={question}
              value={values[question.name]}
              suggestions={{}}
              addedSuggestions={{}}
              addSuggestion={{}}
              answer=""
            />
          );
        })}
      </div>
    </div>
  );
}

export default ReminderSetting;
