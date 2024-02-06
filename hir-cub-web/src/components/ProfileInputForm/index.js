import React from 'react';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Radio, Input, Checkbox, Textarea } from '~/components/ui/formControls';
import './styles.scss';

const likeLearnMore = 'Would you like to learn more about it?';
const formSuggestions = {
  mainIssues: {
    title: likeLearnMore,
    // eslint-disable-next-line
    condition: function condition(value) {
      if (
        value &&
        value.filter((mi) => mi && mi.toLowerCase().includes('lung')).length > 0
      ) {
        return 'value';
      }
    },
    options: { value: [3] },
  },
  minorIssues: {
    title: likeLearnMore,
    // eslint-disable-next-line
    condition: function condition(value) {
      if (
        value &&
        value.filter((mi) => mi && mi.toLowerCase().includes('insomnia'))
          .length > 0
      ) {
        return 'value';
      }
    },
    options: { value: [44, 54] },
  },
  haveChildren: {
    title: likeLearnMore,
    options: { '1': [52] },
  },
  childrenAge: {
    title: likeLearnMore,
    // eslint-disable-next-line
    condition: function condition(value) {
      if (
        value &&
        (value.includes('1') || value.includes('2') || value.includes('3'))
      ) {
        return '1';
      }
    },
    options: { '1': [52], '2': [52], '3': [52] },
  },
};

function ProfileInputForm(props) {
  const { values } = useFormState();

  useAddSuggestion(formSuggestions, values);

  const renderPanelGroup = (title, bodyContent) => {
    return renderPanelGroupStyle(title, '', bodyContent);
  };

  const renderPanelGroupStyle = (title, style, bodyContent) => {
    return (
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">{title}</div>
        <div className={`page-panel-group-body ${style}`}>{bodyContent}</div>
      </div>
    );
  };

  const renderDisplay = (name, content) => {
    return (
      <div className="display-field" key={`disp-${name}`}>
        {content}
      </div>
    );
  };

  const renderRadio = (className, name, value, title) => {
    return (
      <div className={`form-group ${className}`} key={`radio-${name}-${value}`}>
        <Field
          type="radio"
          name={name}
          value={value}
          component={Radio}
          key={`${name}-${value}`}
        >
          {title}
        </Field>
      </div>
    );
  };

  const renderCheckbox = (className, name, value, title) => {
    return (
      <div className={`form-group ${className}`} key={`check-${name}-${value}`}>
        <Field
          type="checkbox"
          name={name}
          value={value}
          component={Checkbox}
          key={`${name}-${value}`}
        >
          {title}
        </Field>
      </div>
    );
  };

  const renderDisplayRadio = (className, name, value, title) => {
    return renderDisplay(
      `${name}-${value}`,
      renderRadio(className, name, value, title)
    );
  };

  const renderDisplayCheckbox = (className, name, value, title) => {
    return renderDisplay(
      `${name}-${value}`,
      renderCheckbox(className, name, value, title)
    );
  };

  const renderHealthIssues = (name) => {
    return (
      <FieldArray name={name}>
        {({ fields }) => (
          <div className="fields-list clearfix">
            {fields.map((name, index) => (
              <div
                key={name}
                className="form-group flex justify-between items-center"
              >
                <Field
                  type="text"
                  name={name}
                  placeholder="Please Specify"
                  component={Input}
                />
                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => fields.remove(index)}
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-add-item uppercase"
              onClick={() => fields.push('')}
            >
              + Add another health issue
            </button>
          </div>
        )}
      </FieldArray>
    );
  };

  const yourAges = ['Under 12', '12 - 18', '19 - 44', '45 - 64', '65 and over'];
  const pronouns = ['She/her', 'He/him', 'They', 'Ze/zir', 'Ze/zim'];
  const timeHealthIssues = [
    'Less than a month',
    'Between one and six months',
    'Between six months and a year',
    'Over a year',
  ];
  const works = ['Yes — Full time', 'Yes — Part time', 'No'];
  const childrenAges = ['Child (under 12)', 'Child (12-18)', 'Adult (over 18)'];
  const answers = ['Yes', 'No'];

  console.log(values.haveChildren);
  return (
    <div className="profile-input-form">
      <div className="page-panel-group-container">
        {renderPanelGroup(
          'What is your age?',
          yourAges.map((title, idx) => {
            return renderDisplayRadio(
              idx < yourAges.length ? 'mr-20' : 'mb-10',
              'age',
              `${idx + 1}`,
              title
            );
          })
        )}
        {renderPanelGroup('How do you identify?', [
          renderDisplay('gender', [
            renderRadio('mr-20 mt-10', 'gender', '1', 'Male'),
            renderRadio('mr-20 mt-10', 'gender', '2', 'Female'),
          ]),
          renderDisplay(
            'genderOther',
            <div className="flex flex-wrap items-center row-mx-15">
              <div className="sm-w-1-3 lg-w-1-4 w-full">
                {renderRadio('mb-15', 'gender', '3', 'Other')}
              </div>
              <div className="sm-w-2-3 lg-w-3-4 w-full">
                <div className="w-full px-0 mt-15 sm-mt-0">
                  <div className="form-group">
                    <Field
                      type="text"
                      name="genderOther"
                      placeholder="Please Specify"
                      disabled={values.gender !== '3'}
                      component={Input}
                    />
                  </div>
                </div>
              </div>
            </div>
          ),
        ])}
        {renderPanelGroup(
          'What pronouns do you use?',
          pronouns.map((title, idx) => {
            return renderDisplayRadio(
              idx < pronouns.length ? 'mr-20' : '',
              'pronoun',
              `${idx + 1}`,
              title
            );
          })
        )}
        {renderPanelGroup(
          'What is the main health issue you are dealing with?',
          renderHealthIssues('mainIssues')
        )}
        {renderPanelGroup(
          'How long have you been living with this health issue?',
          timeHealthIssues.map((title, idx) => {
            return renderDisplayRadio(
              '',
              'timeLivingWithMainIssues',
              `${idx + 1}`,
              title
            );
          })
        )}
        {renderPanelGroup(
          'Do you have other health issues you are concerned about?',
          renderHealthIssues('minorIssues')
        )}
        {renderPanelGroup(
          'How long have you been living with this health issue?',
          timeHealthIssues.map((title, idx) => {
            return renderDisplayRadio(
              '',
              'timeLivingWithMinorIssues',
              `${idx + 1}`,
              title
            );
          })
        )}
        {renderPanelGroupStyle(
          'Do you have children?',
          'display-flex',
          answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < pronouns.length ? 'mr-20' : '',
              'haveChildren',
              `${idx + 1}`,
              title
            );
          })
        )}
        {values.haveChildren === '1' &&
          renderPanelGroup(
            'What age group/groups do they fit into?',
            childrenAges.map((title, idx) => {
              return renderDisplayCheckbox(
                idx < pronouns.length ? 'mr-20' : '',
                'childrenAge',
                `${idx + 1}`,
                title
              );
            })
          )}

        {renderPanelGroup(
          'Are you employed?',
          works.map((title, idx) => {
            return renderDisplayRadio(
              idx < pronouns.length ? 'mr-20' : '',
              'work',
              `${idx + 1}`,
              title
            );
          })
        )}
        {renderPanelGroupStyle(
          'Do you have a dependant?',
          'display-flex',
          answers.map((title, idx) => {
            return renderDisplayRadio(
              idx < pronouns.length ? 'mr-20' : '',
              'haveDependants',
              `${idx + 1}`,
              title
            );
          })
        )}

        {values.haveDependants === '1' &&
          renderPanelGroup(
            'How old are your dependants?',
            childrenAges.map((title, idx) => {
              return renderDisplayCheckbox(
                idx < pronouns.length ? 'mr-20' : '',
                'dependantsAge',
                `${idx + 1}`,
                title
              );
            })
          )}

        <div className="page-panel-group panel-group">
          <div
            className="page-panel-group-title"
            title="This might include key roles or qualities you feel define you as a person, people and things that are important to you, core values, things you are afraid of, care preferences / personal care needs, etc."
          >
            What does the person providing care to you need to know to give you
            the best care possible?
          </div>
          <div className="page-panel-group-body">
            <div className="form-group">
              <Field name="additionalInfo" component={Textarea} rows="5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInputForm;
