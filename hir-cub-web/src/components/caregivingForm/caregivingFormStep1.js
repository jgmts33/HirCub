import React, { useMemo, useRef, useEffect } from 'react';
import useAppState from '~/appState';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';
import {
  RadioTemplate,
  CheckboxTemplate,
} from '~/components/shared/formTemplates';
import CollapsiblePanel from '../ui/collapsiblePanel';
import { GetName } from '~/consts/global';

function getQuestionsForStep1(caredName) {
  const optionsYesNoNA = [
    {
      value: 'true',
      label: 'Yes',
    },
    {
      value: 'false',
      label: 'No',
    },
    {
      value: 'null',
      label: 'Does not apply',
    },
  ];

  return [
    {
      type: 'radio',
      name: 'feelConfident',
      title: 'Do I feel confident about being/becoming a caregiver?',
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'understandConditions',
      title: `Do I understand ${caredName}'s medical condition?`,
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'understandNeeds',
      title: `Do I understand what ${caredName}'s needs are right now?`,
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'understandFutureNeeds',
      title: `I understand what ${caredName}'s needs may be over time`,
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'balance',
      title: 'Am I able to balance caregiving with other responsibilities?',
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'involveFamily',
      title: `Are other family or friends involved in ${caredName}'s care?`,
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'comfortableAskingHelp',
      title: 'Am I comfortable asking for or accepting help from others?',
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'knowOtherResources',
      title:
        'Do I know about other resources, programs and services in my area that can help me with providing care?',
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'getEnoughRespite',
      title:
        'Do I feel like I am getting an appropriate amount of respite/home care?',
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'thoughAboutStress',
      title: 'Have I thought about ways to manage my stress?',
      options: optionsYesNoNA,
    },
    {
      type: 'radio',
      name: 'takeTimeOut',
      title: 'Do I take time out for myself to do the things I enjoy?',
      options: optionsYesNoNA,
    },
    {
      type: 'checkbox',
      name: 'careOfOwnHealth',
      title: 'I take care of my own health by (check all that apply):',
      options: [
        {
          value: '1',
          label: 'Getting regular check-ups',
        },
        {
          value: '2',
          label: 'Eating well',
        },
        {
          value: '3',
          label: 'Exercising',
        },
        {
          value: '4',
          label: 'None of the above',
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'comfortableTalking',
      title: `I feel comfortable talking about ${caredName}'s illness with (check all that apply):`,
      options: [
        {
          value: '1',
          label: `${caredName}`,
        },
        {
          value: '2',
          label: 'My family',
        },
        {
          value: '3',
          label: 'My friends',
        },
        {
          value: '4',
          label: 'Health care practitioners',
        },
        {
          value: '5',
          label: 'No one',
        },
      ],
    },
  ];
}

function getSuggestionsForStep1(caredName) {
  return {
    feelConfident: {
      title: 'Would you like something to be added to your library about this?',
      options: { false: [1, 2] },
    },
    understandNeeds: {
      title: 'Would you like something to be added to your library about this?',
      options: { false: [3] },
    },
    understandFutureNeeds: {
      title: 'Would you like something to be added to your library about this?',
      options: { false: [4] },
    },
    involveFamily: {
      title: 'Would you like something to be added to your library about this?',
      options: { false: [5] },
    },
    comfortableAskingHelp: {
      title: 'Would you like something to be added to your library about this?',
      options: { false: [6, 7] },
    },
    understandConditions: {
      title: 'Would you like something to be added to your library about this?',
      options: { false: [3] },
    },
    thoughAboutStress: {
      title: 'Would you like something to be added to your library about this?',
      options: { false: [6, 12, 13] },
    },
    careOfOwnHealth: {
      title: 'Would you like something to be added to your library about this?',
      condition: function condition(value) {
        if (
          value &&
          (value.includes('1') ||
            value.includes('2') ||
            value.includes('3') ||
            value.includes('4'))
        ) {
          return '1';
        }
      },
      options: { 1: [6], 2: [6], 3: [6], 4: [6] },
    },
    takeTimeOut: {
      title: 'Would you like something to be added to your library about this?',
      options: { false: [6] },
    },
  };
}

function CaregivingFormStep1(props) {
  const { suggestions, addSuggestion, addedSuggestions, collapsed } = props;
  const myName = GetName();

  const { values } = useFormState();
  const stepRef = useRef();
  const questions = useMemo(() => getQuestionsForStep1(myName), [myName]);
  const formSuggestions = useMemo(
    () => getSuggestionsForStep1(myName),
    [myName]
  );
  useAddSuggestion(formSuggestions, values);

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

  const indexedQuestions = questions.map((question, i) => ({
    ...question,
    title: (
      <>
        <span className="page-panel-group-num">{i + 1}.</span>&nbsp;
        {question.title}
      </>
    ),
  }));

  return (
    <div className="form-care-giving form-step1">
      <CollapsiblePanel
        title={
          <>
            <span className="form-care-giving-num">Part 1:</span> Let's figure
            out your needs as a caregiver:
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

export default CaregivingFormStep1;
