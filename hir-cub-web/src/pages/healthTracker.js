import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAppState from '~/appState';
import {
  useTrackConcernsRequest,
  useTrackProblemsRequest,
  useTrackQuestionsRequest,
} from '~/hooks/requests';
import HeroTitle from '~/components/shared/heroTitle';
import HealthTrackerForm from '~/components/healthTrackerForm';
import '~/components/healthTrackerForm/styles.scss';

// helpers
import { trackGTM } from '~/utils';

// constants
import { formatDateStandard, TRACK_GTM } from '~/consts';
import { GetName } from '~/consts/global';

const problemTypes = {
  tiredness: 1,
  drowsiness: 2,
  nausea: 3,
  lackOfAppetite: 4,
  shortnessOfBreath: 5,
  depression: 6,
  anxiety: 7,
  wellBeing: 8,
};

function HealthTracker() {
  const {
    global: { userId },
  } = useAppState();

  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(0);
  const {
    errors: concernErrors,
    sendRequest: sendRequestConcerns,
  } = useTrackConcernsRequest(handleSubmitConcernSuccess);
  const {
    errors: questionErrors,
    sendRequest: sendRequestQuestions,
  } = useTrackQuestionsRequest(handleSubmitQuestionSuccess);
  const {
    errors: problemErrors,
    sendRequest: sendRequestProblems,
  } = useTrackProblemsRequest(handleSubmitProblemSuccess);
  const [isSubmittingConcern, setSubmittingConcern] = useState(false);
  const [isSubmittingQuestion, setSubmittingQuestion] = useState(false);
  const [isSubmittingProblem, setSubmittingProblem] = useState(false);

  function handleSubmitConcernSuccess(response, formData) {
    trackGTM(TRACK_GTM.CREATE_HEALTH_CONCERNS, {
      ...formData,
      userId,
    });
    setSubmittingConcern(false);
    toast.success('Concerns data has been succesfully submitted.');
  }

  function handleSubmitQuestionSuccess(response, formData) {
    trackGTM(TRACK_GTM.CREATE_HEALTH_QUESTIONS, {
      ...formData,
      userId,
    });
    setSubmittingQuestion(false);
    toast.success('Questions data has been succesfully submitted.');
  }

  function handleSubmitProblemSuccess(response, formData) {
    trackGTM(TRACK_GTM.CREATE_HEALTH_PROBLEMS, {
      ...formData,
      userId,
    });
    toast.success('All the data has been succesfully submitted.');
    const problems = formData.problems
      .filter((p) => p.intensity)
      .map((p) => ({ [p.problemTypeId]: true }));
    // const painProblem = formData.painProblem.intensity ? { pain: true } : {};
    let res = {};
    for (let i = 0; i < problems.length; i++) {
      res = { ...res, ...problems[i] };
    }
    if (formData.painProblem.intensity) {
      res = { ...res, ...{ pain: true } };
    }
    setSubmittingProblem(false);
    setShouldShowSuggestions(res);
  }

  function handleSubmitConcern(formData) {
    let data = {
      period: formData.period,
      concerns: formData.concerns,
    };
    if (isSubmittingConcern) {
      return;
    }
    setSubmittingConcern(true);
    sendRequestConcerns(data);
  }

  function handleSubmitQuestion(formData) {
    let data = {
      happiness: formData.happiness,
      content: formData.content,
    };
    if (isSubmittingQuestion) {
      return;
    }
    setSubmittingQuestion(true);
    sendRequestQuestions(data);
  }

  function handleSubmitProblem(formData) {
    if (isSubmittingProblem) {
      return;
    }
    setSubmittingProblem(true);
    const problems = [];
    Object.keys(problemTypes).forEach((pt) => {
      const node = formData[pt];
      if (!node) {
        return;
      }
      let time = formatDateStandard(node.time);
      problems.push({
        ...node,
        time: time,
        problemTypeId: problemTypes[pt],
      });
    });

    let pain = formData.pain;
    let time = formatDateStandard(pain.time);

    let data = {
      additionalDetails: formData.additionalDetails,
      painProblem: {
        ...pain,
        time: time,
      },
      problems,
    };
    sendRequestProblems(data);
  }

  useEffect(() => {
    trackGTM(TRACK_GTM.ACCESS_HEALTH_TRACKER, {
      userId,
    });
  }, [userId]);

  useEffect(() => {
    setSubmittingConcern(false);
  }, [concernErrors]);

  useEffect(() => {
    setSubmittingQuestion(false);
  }, [questionErrors]);

  useEffect(() => {
    setSubmittingProblem(false);
  }, [problemErrors]);

  return (
    <div className="health-tracker-page md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="container">
        <HeroTitle imageUrl="/img/icons/health-white.svg">
          <h1>Health Tracker</h1>
          <div className="hero-description">
            Use the health tracker to track symptoms, such as pain, nausea,
            shortness of breath, and identify concerns. Resources will be
            populated in your library based on your responses. You can also view
            your data in your health <a href="/reports"> reports </a> to see how
            symptoms are changing over time, and use this information to have
            conversations with your healthcare providers. If you have missed
            tracking information, you can add previous information by changing
            the date and time.
          </div>
        </HeroTitle>
        <HealthTrackerForm
          handleSubmitConcern={handleSubmitConcern}
          handleSubmitQuestion={handleSubmitQuestion}
          handleSubmitProblem={handleSubmitProblem}
          concernErrors={concernErrors}
          questionErrors={questionErrors}
          problemErrors={problemErrors}
          isProcessingConcern={isSubmittingConcern}
          isProcessingQuestion={isSubmittingQuestion}
          isProcessingProblem={isSubmittingProblem}
          shouldShowSuggestions={shouldShowSuggestions}
        />
      </div>
    </div>
  );
}

export default HealthTracker;
