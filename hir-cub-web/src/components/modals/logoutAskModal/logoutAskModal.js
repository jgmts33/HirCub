import React from 'react';
import Modal from 'react-modal';
import { Button } from '~/components/ui';
import './styles.scss';

function LogOutAskModal(props) {
  const { isOpen, confirm, close } = props;
  return (
    <Modal
      className="logout-modal"
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
    >
      <button className="close-modal" onClick={() => close()}>&times;</button>
      <h2 className="logout-modal-title">CareHub</h2>
      <div className="logout-modal-description">Are you sure you want to log out?</div>
      
      <div className="logout-modal_submit">
        <Button type="button" kind="full-blue" onClick={confirm}>
          Yes
        </Button>

        <Button type="button" kind="full-blue" onClick={close}>
          No
        </Button>
      </div>
    </Modal>
  );
}

export default LogOutAskModal;
