import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import useAppState, { useAppDispatch } from '~/appState';
import { showAddedPrompt } from '~/actions/global';
import { ReactComponent as Bell } from '~/assets/svg/Bell.svg';
import './styles.scss';

function AddResourceConfirmModal() {
  const {
    global: { isShowedAddedPrompt },
  } = useAppState();
  const dispatch = useAppDispatch();

  function handleCloseClick() {
    dispatch(showAddedPrompt(!isShowedAddedPrompt));
  }

  return (
    <Modal
      className="add_resource-modal"
      isOpen={isShowedAddedPrompt}
      onRequestClose={handleCloseClick}
      shouldCloseOnOverlayClick={true}
    >
      <button className="close-modal" onClick={handleCloseClick}>
        <div className="font-semibold">close</div>
        <span>&times;</span>
      </button>

      <div className="add_resource-modal-row">
        <span>
          <Bell />
        </span>
        <div>
          <div className="add_resource-modal-description">
            Based on our answers to these questions, new resources have been
            added to your library!
          </div>
          <div className="add_resource-modal-link">
            Go to
            <Link
              to="/library"
              className="iconed-link text-black"
              onClick={() => {
                handleCloseClick();
              }}
            >
              library now
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddResourceConfirmModal;
