import React from 'react';
import Modal from 'react-modal';
import FormSubmitSuccessLinks from '~/components/formSubmitSuccessLinks';
import './styles.scss';

function HowCanWeHelpModal(props) {
  const { isOpen, close } = props;
  return (
    <Modal
      className="help-modal"
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
    >
      <button className="close-modal" onClick={() => close()}>&times;</button>
      <h2 className="help-modal-title"><span className="care">Care</span> <span className="hub">Hub</span></h2>
      <div className="help-modal-description">What can we help you with today?</div>
      <FormSubmitSuccessLinks />
    </Modal>
  );
}

export default HowCanWeHelpModal;
