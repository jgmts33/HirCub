import React from 'react';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';

import './profiles.scss';
import {
  renderDisplayRadio,
  renderPanelGroupTip,
} from './common';

import {
  commonQuestionSuggestions,
  Answers,
  QuestionTip4,
} from './consts';

function ProfileQuestionCommon(props) {
  const { values } = useFormState();

  useAddSuggestion(commonQuestionSuggestions, values);

  return (
    <div className="question-common question-form">
      <div className="question-form_title">Common Questions</div>
      <div className="question-form_description">
        The following questions will help us identify additional resources,
        programs, and services you may be interested in.
      </div>

      <div className="page-panel-group-container">
        {renderPanelGroupTip(
          'Are you interested in information about inclusive and respectful healthcare and resources for those who identify as 2SLGBTQ+?',
          QuestionTip4,
          Answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < Answers.length ? 'mr-20' : '',
              'interestedInInclusiveness',
              `${idx + 1}`,
              title
            );
          })
        )}

        {renderPanelGroupTip(
          'Are you interested in information about supporting children through the serious illness of someone they care about?',
          QuestionTip4,
          Answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < Answers.length ? 'mr-20' : '',
              'interestedSupporingChildren',
              `${idx + 1}`,
              title
            );
          })
        )}

        {renderPanelGroupTip(
          'Are you interested in information and resources for Indigenous Peoples living with serious illness?',
          QuestionTip4,
          Answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < Answers.length ? 'mr-20' : '',
              'interestedAboutIndigenousPeople',
              `${idx + 1}`,
              title
            );
          })
        )}

        {renderPanelGroupTip(
          'Are you interested in information and resources to support you or others who are grieving?',
          QuestionTip4,
          Answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < Answers.length ? 'mr-20' : '',
              'interestedAboutGrieving',
              `${idx + 1}`,
              title
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProfileQuestionCommon;
