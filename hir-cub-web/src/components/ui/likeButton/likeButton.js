import React from 'react';
import './styles.scss';

function LikeButton(props) {
  const { onClick } = props;
  return (
    <button type="button" className="like-btn" onClick={onClick}>
      <i className="fas fa-star" />
    </button>
  );
}

export default LikeButton;
