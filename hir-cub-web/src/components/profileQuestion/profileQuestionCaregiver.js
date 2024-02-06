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
  caregiverQuestionSuggestions,
  QuestionTip1,
  QuestionTip2,
  Answers,
  YourAges,
  CareMonths,
  CareDays,
  CareHours,
  QuestionTip3,
  WorkTimes,
  CarePeople,
} from './consts';

function ProfileQuestionCaregiver(props) {
  const { values } = useFormState();

  useAddSuggestion(caregiverQuestionSuggestions, values);

  return (
    <div className="question-caregiver question-form">
      <div className="question-form_title">Caregiver Questions</div>
      <div className="question-form_description">
        Thank you for signing up for CareHub! We'd like to know a little more
        about you and the person you are caring for so CareHub can identify
        resources that might be helpful. The information you choose to enter is
        up to you and you can revisit your profile at any time to add or change
        the information provided.
      </div>

      <div className="page-panel-group-container">
        {renderPanelGroupTip(
          'What age group do you fit into?',
          QuestionTip1,
          YourAges.map((title, idx) => {
            return renderDisplayRadio(
              idx < YourAges.length ? 'mr-20' : 'mb-10',
              'caregiverAge',
              `${idx + 1}`,
              title
            );
          })
        )}
        {renderPanelGroupTip('How do you identify?', QuestionTip1, [
          renderDisplay('gender', [
            renderRadio('mr-20 mt-10', 'caregiverGender', '1', 'Male'),
            renderRadio('mr-20 mt-10', 'caregiverGender', '2', 'Female'),
          ]),
          renderDisplay(
            'genderOther',
            <div className="flex flex-wrap items-center row-mx-15">
              <div className="sm-w-1-3 lg-w-1-4 w-full">
                {renderRadio('mb-15', 'caregiverGender', '3', 'Other')}
              </div>
              <div className="sm-w-2-3 lg-w-3-4 w-full">
                <div className="w-full px-0 mt-15 sm-mt-0">
                  {renderText(
                    'caregiverGenderOther',
                    'Please Specify',
                    values.caregiverGender !== '3'
                  )}
                </div>
              </div>
            </div>
          ),
        ])}

        {renderPanelGroupTip(
          'Have you provided care to someone before?',
          QuestionTip1,
          Answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < Answers.length ? 'mr-20' : '',
              'haveExperienceProvidingCare',
              `${idx + 1}`,
              title
            );
          })
        )}

        {renderPanelGroupTip(
          'How long have you been providing care for?',
          QuestionTip1,
          CareMonths.map((title, idx) => {
            return renderDisplayRadio('', 'experienceLength', `${idx + 1}`, title);
          })
        )}

        {renderPanelGroupTip(
          'How many days a week do you provide some level of care?',
          QuestionTip1,
          CareDays.map((title, idx) => {
            return renderDisplayRadio('', 'caregivingFrequency', `${idx + 1}`, title);
          })
        )}

        {renderPanelGroupTip(
          'On the days you provide care, how much time does caregiving currently take on average?',
          QuestionTip1,
          CareHours.map((title, idx) => {
            return renderDisplayRadio('', 'caregivingAmountOfTime', `${idx + 1}`, title);
          })
        )}

        {renderPanelGroupTip(
          'Do you have children or others you are also caring for?',
          QuestionTip3,
          Answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < Answers.length ? 'mr-20' : '',
              'haveChildrenOrOthersWhomAlsoCaring',
              `${idx + 1}`,
              title
            );
          })
        )}

        {renderPanelGroupTip(
          'Do you work or volunteer or have other responsibilities?',
          QuestionTip3,
          WorkTimes.map((title, idx) => {
            return renderDisplayRadio(
              idx < Answers.length ? 'mr-20' : '',
              'responsibilities',
              `${idx + 1}`,
              title
            );
          })
        )}

        {renderPanelGroupTip(
          'Who are you caring for?',
          QuestionTip1,
          <>
            {CarePeople.map((title, idx) => {
              return renderDisplayRadio('', 'caringFor', `${idx + 1}`, title);
            })}
            {renderDisplay(
              'caringForOther',
              <div className="flex flex-wrap items-center row-mx-15">
                <div className="sm-w-1-3 lg-w-1-4 w-full">
                    {renderRadio('mb-15', 'caringFor', `${CarePeople.length + 1}`, 'Other')}
                </div>
                <div className="sm-w-2-3 lg-w-3-4 w-full">
                  <div className="w-full px-0 mt-15 sm-mt-0">
                    {renderText(
                      'caringForOther',
                      'Please Specify',
                      values.carePeople !== `${CarePeople.length + 1}`
                    )}
                  </div>
                </div>
              </div>
              )
            }
          </>
        )}

        {renderPanelGroupTip(
          'What does your healthcare team need to know about you to support you as a caregiver?',
          QuestionTip2,
          renderTextarea('notesAboutCaregiving', '5')
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

export default ProfileQuestionCaregiver;
