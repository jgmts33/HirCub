import React from 'react';
import useFormState from '~/utils/formState';
import { RadioTemplate } from '~/components/shared/formTemplates';
import './styles.scss';

function getQuestions() {
  return [
    {
      type: 'radio',
      name: 'bathing',
      title: 'BATHING',
      subTitle: '',
      options: [
        {
          value: '2',
          label: 'Able to bathe alone.',
        },
        {
          value: '1',
          label: 'Needs help with bathing including getting in or out of the tub or shower.',
        },
        {
          value: '0',
          label: 'Needs to be bathed or have a bed bath.',
        },
      ],
    },
    {
      type: 'radio',
      name: 'dressing',
      title: 'DRESSING',
      subTitle: '',
      options: [
        {
          value: '2',
          label: 'Able to get clothes from closets and drawers. Able to put on clothes and tie shoes.',
        },
        {
          value: '1',
          label: 'Needs some help to get dressed.',
        },
        {
          value: '0',
          label: 'Cannot dress at all without help.',
        },
      ],
    },
    {
      type: 'radio',
      name: 'transferring',
      title: 'TRANSFERRING',
      subTitle: '',
      options: [
        {
          value: '2',
          label: 'Able to get in and out of bed or chair without help. May use walkers and other equipment.',
        },
        {
          value: '1',
          label: 'Needs some help getting from bed to chair.',
        },
        {
          value: '0',
          label: 'Fully dependent on others or equipment to get out of bed or chair.',
        },
      ],
    },
    {
      type: 'radio',
      name: 'eating',
      title: 'EATING ',
      subTitle: '(may include taking food in other ways, for example feeding tubes.)',
      options: [
        {
          value: '2',
          label: 'Able to feed self. Food may be prepared by another person.',
        },
        {
          value: '1',
          label: 'Needs some help with eating.',
        },
        {
          value: '0',
          label: 'Needs total help with eating.',
        },
      ],
    },
    {
      type: 'radio',
      name: 'toileting',
      title: 'TOILETING',
      subTitle: '',
      options: [
        {
          value: '2',
          label: 'Goes to toilet by self. ',
        },
        {
          value: '1',
          label: 'Needs help cleaning self. Needs help with getting on and off the toilet.',
        },
        {
          value: '0',
          label: 'Fully dependent on others for toileting or uses a bedpan or commode.',
        },
      ],
    },
    {
      type: 'radio',
      name: 'continence',
      title: 'CONTINENCE',
      subTitle: '',
      options: [
        {
          value: '2',
          label: 'Has control over bowel and bladder.',
        },
        {
          value: '1',
          label: 'Has some control over bowel or bladder.',
        },
        {
          value: '0',
          label: 'Has no control of bowel and bladder.',
        },
      ],
    },
  ];
}

function CareNeedsToolQuestion() {
  const { values } = useFormState();
  const questions = getQuestions();

  return (
    <div className="form-mobility-setting">
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

export default CareNeedsToolQuestion;
