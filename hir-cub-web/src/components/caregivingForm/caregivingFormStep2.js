import React, { useRef } from 'react';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';
import {
  RadioTemplate,
  CheckboxTemplate,
} from '~/components/shared/formTemplates';
import CollapsiblePanel from '../ui/collapsiblePanel';

const questionsForStep2 = [
  {
    type: 'radio',
    name: 'helpBathing',
    title: 'Bathing (washing in the shower, bath or sink)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpDress',
    title: 'Dressing (getting dressed and undressed)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpEat',
    title: 'Eating',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpHygiene',
    title: 'Personal hygiene (such as brushing teeth)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpGrooming',
    title: 'Grooming (such as washing hair and cutting nails)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpToileting',
    title: 'Toileting (going to the bathroom or changing diapers)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpTransfer',
    title: 'Transfer (such as moving from bed to chair)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpMobility',
    title: 'Mobility (includes walking)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpMedication',
    title:
      'Medication (ordering medications, organizing them, and giving all medications as prescribed)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpManagingSymptoms',
    title: 'Managing symptoms (such as pain or nausea)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpEquiptment',
    title: 'Equipment (such as oxygen, IV or infusion)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpCoordinating',
    title:
      'Coordinating care (includes talking with doctors, nurses, and other health care workers)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpManagingAppointments',
    title: 'Managing and keeping appointments',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpTransportation',
    title: 'Driving or helping with transportation (such as car, bus, or taxi)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpHouseholdChores',
    title: 'Household chores (such as shopping, cooking, and doing laundry)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpFinances',
    title: 'Taking care of finances (includes banking and paying bills)',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
  {
    type: 'radio',
    name: 'helpChangingBed',
    title: 'Changing a bed while someone is in it',
    options: [
      {
        value: '1',
        label: 'I am able to help WITHOUT training',
      },
      {
        value: '2',
        label: 'With enough training, I would be able to help',
      },
      {
        value: '3',
        label: 'I am unable to help',
      },
    ],
  },
];

const suggestionsForStep2 = {
  helpBathing: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [20, 21] },
  },

  helpEat: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [22] },
  },
  helpHygiene: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [23, 24] },
  },
  helpGrooming: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [25] },
  },
  helpToileting: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [26] },
  },
  helpTransfer: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [27] },
  },
  helpMobility: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [28] },
  },
  helpMedication: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [29, 30, 31, 32, 33, 34] },
  },
  helpManagingSymptoms: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [35, 36, 37] },
  },
  helpEquiptment: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [38] },
  },
  helpCoordinating: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [39] },
  },
  helpFinances: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [10, 41] },
  },
  helpChangingBed: {
    title: 'Would you like something to be added to your library about this?',
    options: { 2: [42] },
  },
};

function CaregivingFormStep2(props) {
  const { suggestions, addSuggestion, addedSuggestions, collapsed } = props;
  const { values } = useFormState();
  const stepRef = useRef();
  useAddSuggestion(suggestionsForStep2, values);

  const radioAnswer = (question) => {
    let value = values[question.name];
    var result = question.options
      .filter((opt) => value === opt.value)
      .map((opt, i) => {
        return opt.label;
      });
    return result[0] ? result[0] : '';
  };
  const checkboxAnswer = (question) => {
    let arr = values[question.name];
    if (arr == undefined) {
      return '';
    }
    if (arr instanceof Array) {
      let result = question.options
        .filter((opt) => arr.includes(opt.value))
        .map((opt, i) => {
          return opt.label;
        })
        .join('|');
      return result ? result : '';
    } else {
      return radioAnswer(question);
    }
  };

  const indexedQuestions = questionsForStep2.map((question, i) => ({
    ...question,
    title: (
      <>
        <span className="page-panel-group-num">{i + 1}.</span>&nbsp;
        {question.title}
      </>
    ),
  }));

  return (
    <div className="form-care-giving form-step2">
      <CollapsiblePanel
        title={
          <>
            <span className="form-care-giving-num">Part 2:</span> How
            comfortable are you with common caregiving tasks?
          </>
        }
        collapse={collapsed}
        setCollapse={(flag) => props.setCollapsed(flag)}
      >
        <div className="page-panel-group-container" ref={stepRef}>
          {indexedQuestions.map((question, i) => {
            if (question.type === 'radio') {
              return (
                <RadioTemplate
                  key={i}
                  question={question}
                  value={values[question.name]}
                  suggestions={suggestions}
                  addedSuggestions={addedSuggestions}
                  addSuggestion={addSuggestion}
                  answer={radioAnswer(question)}
                />
              );
            }
            if (question.type === 'checkbox') {
              return (
                <CheckboxTemplate
                  key={i}
                  question={question}
                  value={values[question.name]}
                  suggestions={suggestions}
                  addedSuggestions={addedSuggestions}
                  addSuggestion={addSuggestion}
                  answer={checkboxAnswer(question)}
                />
              );
            }
            throw new Error(`Unexpected control type ${question.type}`);
          })}
        </div>
      </CollapsiblePanel>
    </div>
  );
}

export default CaregivingFormStep2;
