import React from 'react';
import Modal from 'react-modal';
import { Button } from '~/components/ui';
import './styles.scss';

function HowAreYouDoingModal(props) {
  const { isOpen, close } = props;
  return (
    <Modal
      className="welcome-modal"
      isOpen={isOpen}
      onRequestClose={close}      
      shouldCloseOnOverlayClick={false}
    >
      
        <h2 className="welcome-modal_header">
          <span className="welcome-modal_header-care">Care</span>{' '}
          <span className="welcome-modal_header-hub">Hub</span>
        </h2>
        <h4 className="welcome-modal_subtitle">How are you doing today?</h4>
        <div>
          <input type="range" />
        </div>
        <div className="welcome-modal_levels">
          <div>Awful</div>
          <div>Ok</div>
          <div>Great</div>
        </div>
        <div className="welcome-modal_submit">
          <Button type="button" kind="full-blue" onClick={close}>
            Ok
          </Button>
        </div>
    </Modal>
  );
}

export default HowAreYouDoingModal;
