import React from 'react';
import Modal from 'react-modal';
import './styles.scss';

function SymptomDescriptionModal(props) {
  const { isOpen, title, description, close } = props;
  const descLines = description.split(/\n/g);
  return (
    <Modal
      className="symptom-modal"
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnOverlayClick={true}
    >
      <button className="close-modal" onClick={() => close()}>&times;</button>
      <h2 className="symptom-modal-title">{title}</h2>
      <div className="symptom-modal-description">
        <ul>
          {descLines.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default SymptomDescriptionModal;
