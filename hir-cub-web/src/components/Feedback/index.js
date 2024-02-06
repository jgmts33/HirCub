import React from 'react';
import './styles.scss';

function Feedback(props) {
  return (
    <div className="feedback-container">
      <div className="feedback-panel">
        <div className="feedback-comments">
          <img src="/img/icons/comment.png" alt="" />
        </div>

        <div className="feedback-other">
          <div className="feedback-desc">
            Let us know what you think of your CareHub!
          </div>
          <div className="feedback-button">
            <a
              href="mailto:carehub@virtualhospice.ca?subject=CareHub Feedback"
              className="btn -blue-btn"
            >
              Provide feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
