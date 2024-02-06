import React, { useEffect, useState } from 'react';
import { FormContextProvider } from '~/utils/formState';
import { Form } from 'react-final-form';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';

import './style.scss';
import { useAppDispatch } from '~/appState';
import { showAddedPrompt } from '~/actions/global';
import HowDoingFormStep from './howDoingFormStep';
import HelpBox from '../HelpBox';
import { Button } from '../ui';
import { usePostWelcomeQuestionRequest } from '~/hooks/requests';
import Loader from '../Loader';


const CaregiverExperienceQuestionType = {
  Posivite: 'Posivite',
  Negative: 'Negative',
};

const answers = [
  {
    answerId: 'always',
    value: 'always',
    label: 'Always',
  },
  {
    answerId: 'sometimes',
    value: 'sometimes',
    label: 'Sometimes',
  },
  {
    answerId: 'rarely',
    value: 'rarely',
    label: 'Rarely',
  },
  {
    answerId: 'never',
    value: 'never',
    label: 'Never',
  },
  {
    answerId: 'null',
    value: 'null',
    label:
      'Does not apply',
  },
];

const questions = [
  {
    questionId: 'wasSatisfied',
    text: 'I was satisfied with the support I received from family or friends.',
    name: 'wasSatisfied',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Posivite,
  },
  {
    questionId: 'feltUseful',
    text: 'I felt useful and needed.',
    name: 'feltUseful',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Posivite,
  },
  {
    questionId: 'foundWays',
    text: 'I found ways to meet my spiritual or faith needs.',
    name: 'foundWays',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Posivite,
  },
  {
    questionId: 'hadTroubleFocusing',
    text: 'I had trouble focusing on what I was doing.',
    name: 'hadTroubleFocusing',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'feltThat',
    text: "I felt that I couldn't leave the person I am caring for alone.",
    name: 'feltThat',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'hadDifficulty',
    text: 'I had difficulty making common decisions.',
    name: 'hadDifficulty',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'feltOverwhelmed',
    text: 'I felt overwhelmed.',
    name: 'feltOverwhelmed',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'feltLonely',
    text: 'I felt lonely.',
    name: 'feltLonely',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'wasUpset',
    text: 'I was upset that the person I am caring for has changed so much since they have been ill.',
    name: 'wasUpset',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'feltLike',
    text: 'I felt like I didn’t have enough personal time.',
    name: 'feltLike',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'wasCranky',
    text: 'I was cranky or annoyed.',
    name: 'wasCranky',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'hadTroubleSleeping',
    text: 'I had trouble sleeping.',
    name: 'hadTroubleSleeping',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'feltDepressed',
    text: 'I felt depressed.',
    name: 'feltDepressed',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'feltAnxious',
    text: 'I felt anxious.',
    name: 'feltAnxious',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'feltIll',
    text: 'I felt ill (such as headaches, stomach problems, or common cold).',
    name: 'feltIll',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'homeSituation',
    text: 'The home situation made it difficult for me to provide care.',
    name: 'homeSituation',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
  {
    questionId: 'wasDifficult',
    text: 'It was difficult to balance my life (such as work, family, caregiving).',
    name: 'wasDifficult',
    options: answers,
    experienceType: CaregiverExperienceQuestionType.Negative,
  },
];

const focusOnError = createDecorator();
const decorators = [focusOnError];

function HowDoingForm(props) {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const validate = (values) => {
    return {};
  };
  const { errors, sendRequest } = usePostWelcomeQuestionRequest(
    handleSubmitSuccess
  );

  function handleSubmitSuccess() {
    dispatch(showAddedPrompt(true));
    setSubmitting(false);
  }

  const handleSubmit = (formData) => {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);
    let sendQuestions = [];
    for (const key in formData) {
      let receiveQuestion = { 'answerID': '', 'questionID': '' };
      receiveQuestion.questionID = key;
      receiveQuestion.answerID = formData[key]
      sendQuestions.push(receiveQuestion);
    }
    sendRequest(sendQuestions);
  };

  useEffect(() => {
    setSubmitting(false);
  }, [errors]);

  const indexedQuestions = questions.map((question, idx) => ({
    ...question,
    title: (
      <>
        <span className="page-panel-group-num">{idx + 1}.</span>&nbsp;
        {question.text}
      </>
    )
  }));

  return (
    <React.Fragment>
      <hr className="horizontal-line" />

      <HelpBox
        title="How am I doing?"
        firstLine="Why answer these questions?"
        secondLine="FIND ANSWERS IN OUR HELP SECTION"
        hash="/help"
      />

      <p className="content-desc">
        Let’s see how you are caring for your own needs. Your answers will be
        used to make a report so you can see how you are doing over time.
        Helpful items will be sent to The Library based on your answers.
        You can share this with healthcare providers or others as you wish.
        <br /> <br />
        Answer the questions below about how the past week has been.
      </p>

      <div
        className={`form-how-doing-box ${props.option ? '' : 'radius-style'}`}
      >
        <Form
          mutators={{
            ...arrayMutators,
          }}
          initialValues={values}
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
                  <HowDoingFormStep questions={indexedQuestions} />
                  <div className="btn-welcome">
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
        {isSubmitting && <Loader />}
      </div>
    </React.Fragment>
  );
};

export default HowDoingForm;
