import React from 'react';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';

import './profiles.scss';
import {
  renderDisplay,
  renderDisplayRadio,
  renderPanelGroupStyle,
  renderRadio,
  renderText,
  renderTextarea,
  renderPanelGroupTip,
} from './common';

import {
  patientQuestionSuggestions,
  QuestionTip1,
  QuestionTip2,
  Answers,
  YourAges,
  TimeHealthIssues,
} from './consts';

function ProfileQuestionPatient(props) {
  const { values } = useFormState();

  useAddSuggestion(patientQuestionSuggestions, values);

  return (
    <div className="question-patient question-form">
      <div className="question-form_title">Patient Questions</div>
      <div className="question-form_description">
        Thank you for signing up for CareHub! We'd like to know a little more
        about you so CareHub can identify resources that might be helpful. The
        information you choose to enter is up to you and you can revisit your
        profile at any time to make changes.
      </div>

      <div className="page-panel-group-container">
        {renderPanelGroupTip(
          'What age group do you fit into?',
          QuestionTip1,
          YourAges.map((title, idx) => {
            return renderDisplayRadio(
              idx < YourAges.length ? 'mr-20' : 'mb-10',
              'patientAge',
              `${idx + 1}`,
              title
            );
          })
        )}
        {renderPanelGroupTip('How do you identify?', QuestionTip1, [
          renderDisplay('gender', [
            renderRadio('mr-20 mt-10', 'patientGender', '1', 'Male'),
            renderRadio('mr-20 mt-10', 'patientGender', '2', 'Female'),
          ]),
          renderDisplay(
            'genderOther',
            <div className="flex flex-wrap items-center row-mx-15">
              <div className="sm-w-1-3 lg-w-1-4 w-full">
                {renderRadio('mb-15', 'patientGender', '3', 'Other')}
              </div>
              <div className="sm-w-2-3 lg-w-3-4 w-full">
                <div className="w-full px-0 mt-15 sm-mt-0">
                  {renderText(
                    'patientGenderOther',
                    'Please Specify',
                    values.patientGender !== '3'
                  )}
                </div>
              </div>
            </div>
          ),
        ])}

        {renderPanelGroupTip(
          'What are your illnesses and health conditions?',
          QuestionTip1,
          renderText('mainHealthIssue', 'Please Specify')
        )}
        {renderPanelGroupTip(
          'How long have you been living with this health issue?',
          QuestionTip1,
          TimeHealthIssues.map((title, idx) => {
            return renderDisplayRadio(
              '',
              'livingWithMainHealthIssue',
              `${idx + 1}`,
              title
            );
          })
        )}

        {renderPanelGroupTip(
          'What does your healthcare team need to know about you to give you the best care possible?',
          QuestionTip2,
          renderTextarea('notesForCaregiver', '5')
        )}

        {renderPanelGroupStyle(
          'You can give someone else access to your CareHub, and vice versa,' +
            ' so that you can have a shared calendar, health tracker, health reports' +
            ' and more. Would you like to give someone else access to your CareHub?',
          'display-flex',
          null,
          Answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < Answers.length ? 'mr-20' : '',
              'giveAccess',
              `${idx + 1}`,
              title
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProfileQuestionPatient;
