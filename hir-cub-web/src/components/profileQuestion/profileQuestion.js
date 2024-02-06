import React, { useEffect, useState } from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import './styles.scss';
import { Form } from 'react-final-form';
import { Button } from '../ui';
import ProfileQuestionPatient from './profileQuestionPatient';
import ProfileQuestionCaregiver from './profileQuestionCaregiver';
import ProfileQuestionCommon from './profileQuestionCommon';
import { FormContextProvider } from '~/utils/formState';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';
import Loader from '../Loader';
import { showQuestionPrompt } from '~/actions/global';
import { usePostProfileDataRequest } from '~/hooks/requests';
import { AccountType } from '~/consts';
import { boolToStr, intToStr, strToBool, strToInt } from '~/consts/global';

const focusOnError = createDecorator();
const decorators = [focusOnError];

function ProfileQuestion({ profileData }) {
  const dispatch = useAppDispatch();
  const {
    global: { accountType },
  } = useAppState();

  const [formValues, setFormValues] = useState({});

  const [giveAccess, setGiveAccess] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const { errors, sendRequest } = usePostProfileDataRequest(
    handleSubmitSuccess
  );
  function handleSubmitSuccess() {
    dispatch(showQuestionPrompt(true));
    setSubmitting(false);

    setTimeout(() => {
      window.location = '/welcome';
      if (giveAccess) {
        if (giveAccess == '1') {
          // selected YES
          window.location = 'profile/sharing';
        } else {
          window.location = '/welcome';
        }
      }
    }, 3);
  }
  const handleSubmit = (values) => {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);

    let patientValues = null;
    let caregiverValues = null;

    if (accountType == AccountType.CareGiver) {
      caregiverValues = {
        age: strToInt(values.caregiverAge),
        gender: strToInt(values.caregiverGender),
        genderOther: values.caregiverGenderOther,
        haveExperienceProvidingCare: strToBool(
          values.haveExperienceProvidingCare
        ),
        experienceLength: strToInt(values.experienceLength),
        caregivingFrequency: strToInt(values.caregivingFrequency),
        caregivingAmountOfTime: strToInt(values.caregivingAmountOfTime),
        haveChildrenOrOthersWhomAlsoCaring: strToBool(
          values.haveChildrenOrOthersWhomAlsoCaring
        ),
        responsibilities: strToInt(values.responsibilities),
        caringFor: strToInt(values.caringFor),
        notesAboutCaregiving: values.notesAboutCaregiving,
      };
    } else {
      patientValues = {
        age: strToInt(values.patientAge),
        gender: strToInt(values.patientGender),
        genderOther: values.patientGenderOther,
        mainHealthIssue: values.mainHealthIssue,
        livingWithMainHealthIssue: strToInt(values.livingWithMainHealthIssue),
        notesForCaregiver: values.notesForCaregiver,
      };
    }

    let commonValues = {
      interestedInInclusiveness: strToBool(values.interestedInInclusiveness),
      interestedSupporingChildren: strToBool(
        values.interestedSupporingChildren
      ),
      interestedAboutIndigenousPeople: strToBool(
        values.interestedAboutIndigenousPeople
      ),
      interestedAboutGrieving: strToBool(values.interestedAboutGrieving),
    };

    setGiveAccess(values.giveAccess);

    sendRequest({
      profile: profileData.profile,
      patientQuestions: patientValues,
      caregiverQuestions: caregiverValues,
      commonQuestions: commonValues,
    });
    console.log({
      profile: profileData.profile,
      patientQuestions: patientValues,
      caregiverQuestions: caregiverValues,
      commonQuestions: commonValues,
    });
  };

  const updateProfile = () => {
    let patientData = {};
    let caregiverData = {};
    let commonData = {};

    if (accountType == AccountType.CareGiver) {
      let caregiverValues = profileData.caregiverQuestions;
      if (caregiverValues) {
        caregiverData = {
          caregiverAge: intToStr(caregiverValues.age),
          caregiverGender: intToStr(caregiverValues.gender),
          caregiverGenderOther: caregiverValues.caregiverGenderOther,
          haveExperienceProvidingCare: boolToStr(
            caregiverValues.haveExperienceProvidingCare
          ),
          experienceLength: intToStr(caregiverValues.experienceLength),
          caregivingFrequency: intToStr(caregiverValues.caregivingFrequency),
          caregivingAmountOfTime: intToStr(
            caregiverValues.caregivingAmountOfTime
          ),
          haveChildrenOrOthersWhomAlsoCaring: boolToStr(
            caregiverValues.haveChildrenOrOthersWhomAlsoCaring
          ),
          responsibilities: intToStr(caregiverValues.responsibilities),
          caringFor: intToStr(caregiverValues.caringFor),
          notesAboutCaregiving: caregiverValues.notesAboutCaregiving,
        };
      }
    } else {
      let patientValues = profileData.patientQuestions;
      if (patientValues) {
        patientData = {
          patientAge: intToStr(patientValues.age),
          patientGender: intToStr(patientValues.gender),
          patientGenderOther: patientValues.genderOther,
          mainHealthIssue: patientValues.mainHealthIssue,
          livingWithMainHealthIssue: intToStr(
            patientValues.livingWithMainHealthIssue
          ),
          notesForCaregiver: patientValues.notesForCaregiver,
        };
      }
    }

    let commonValues = profileData.commonQuestions;
    if (commonValues) {
      commonData = {
        interestedInInclusiveness: boolToStr(
          commonValues.interestedInInclusiveness
        ),
        interestedSupporingChildren: boolToStr(
          commonValues.interestedSupporingChildren
        ),
        interestedAboutIndigenousPeople: boolToStr(
          commonValues.interestedAboutIndigenousPeople
        ),
        interestedAboutGrieving: boolToStr(
          commonValues.interestedAboutGrieving
        ),
      };
    }

    setFormValues({
      ...patientData,
      ...caregiverData,
      ...commonData,
    });
  };

  useEffect(() => {
    updateProfile();
  }, []);

  useEffect(() => {
    setSubmitting(false);
  }, [errors]);

  return (
    <div className="profile-question">
      <div className="profile-question_title">My profile Information</div>
      <div className="profile-question_description">
        The information you provide will help the CareHub provide resources
        that might be helpful to you. The information you choose to enter is up
        to you.
      </div>
      <Form
        onSubmit={handleSubmit}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={formValues}
        decorators={decorators}
      >
        {({ handleSubmit, submitting, values, touched, errors }) => (
          <FormContextProvider
            values={values}
            errors={errors}
            touched={touched}
          >
            <form
              onSubmit={handleSubmit}
              className="profile-question_entry-form"
            >
              {accountType == AccountType.CareGiver ? (
                <ProfileQuestionCaregiver />
              ) : (
                <ProfileQuestionPatient />
              )}
              <ProfileQuestionCommon />
              <div className="profile-question_btn-save">
                <Button type="submit" kind="purpure" disabled={submitting}>
                  <i className="fas fa-lock" />
                  Update/Save
                </Button>
              </div>
            </form>
          </FormContextProvider>
        )}
      </Form>
      {isSubmitting && <Loader />}
    </div>
  );
}

export default ProfileQuestion;
