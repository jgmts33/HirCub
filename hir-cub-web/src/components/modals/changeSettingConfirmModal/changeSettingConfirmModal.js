import React from 'react';
import Modal from 'react-modal';

import useAppState, { useAppDispatch } from '~/appState';
import { showSettingPrompt } from '~/actions/global';
import { ReactComponent as Bell } from '~/assets/svg/Bell.svg';
import './styles.scss';

function ChangeSettingConfirmModal() {
  const {
    global: { isShowedSettingPrompt },
  } = useAppState();
  const dispatch = useAppDispatch();

  function handleCloseClick() {
    dispatch(showSettingPrompt(!isShowedSettingPrompt));
  }

  return (
    <Modal
      className="change_setting-modal"
      isOpen={isShowedSettingPrompt}
      onRequestClose={handleCloseClick}
      shouldCloseOnOverlayClick={true}
    >
      <button className="close-modal" onClick={handleCloseClick}>
        <div className="font-semibold">close</div>
        <span>&times;</span>
      </button>

      <div className="change_setting-modal-row">
        <span>
          <Bell />
        </span>
        <div>
          <div className="change_setting-modal-description">
            Your profile has been shared successfully
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ChangeSettingConfirmModal;
