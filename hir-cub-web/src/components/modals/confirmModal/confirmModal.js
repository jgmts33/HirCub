import React from 'react';
import Modal from 'react-modal';
import { Button } from '~/components/ui';
import './styles.scss';

function ConfirmModal(props) {
  const { title, message, isOpen, confirm, close } = props;
  return (
    <Modal
      className="confirm-modal"
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
    >
      <button className="close-modal" onClick={() => close()}>&times;</button>
      <h2 className="confirm-modal-title">{title ? title : 'CareHub'}</h2>
      <div className="confirm-modal-description">{message}</div>
      
      <div className="confirm-modal_submit">
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

export default ConfirmModal;
