import React from 'react';
import Modal from 'react-modal';

import useAppState, { useAppDispatch } from '~/appState';
import { showQuestionPrompt } from '~/actions/global';
import { ReactComponent as Bell } from '~/assets/svg/Bell.svg';
import './styles.scss';

function QuestionSaveConfirmModal() {
  const {
    global: { isShowedQuestionPrompt },
  } = useAppState();
  const dispatch = useAppDispatch();

  function handleCloseClick() {
    dispatch(showQuestionPrompt(!isShowedQuestionPrompt));
  }

  return (
    <Modal
      className="question_save-modal"
      isOpen={isShowedQuestionPrompt}
      onRequestClose={handleCloseClick}
      shouldCloseOnOverlayClick={true}
    >
      <button className="close-modal" onClick={handleCloseClick}>
        <div className="font-semibold">close</div>
        <span>&times;</span>
      </button>

      <div className="question_save-modal-row">
        <span>
          <Bell />
        </span>
        <div>
          <div className="question_save-modal-description">
            Thank you for completing your profile. You may revisit this at any
            time if it requires updating or your needs change. Relevant
            resources have been populated in your library.
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default QuestionSaveConfirmModal;
