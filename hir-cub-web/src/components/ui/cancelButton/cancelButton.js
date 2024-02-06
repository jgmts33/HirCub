import React from 'react';
import './styles.scss';

function CancelButton(props) {
  const { onClick } = props;
  return (
    <button type="button" className="cancel-btn" onClick={onClick}>
      <i className="fas fa-trash" />
    </button>
  );
}

export default CancelButton;
