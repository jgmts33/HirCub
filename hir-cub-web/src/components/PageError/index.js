import React from 'react';
import './styles.scss';

const PageError = () => {
  return (
    <div className="error-page-content">
      <div className="container">
        <div className="text-center">
          <div className="error-page-head">404</div>
          <div className="error-page-desc">Page Not Found</div>
        </div>
      </div>
    </div>
  );
};

export default PageError;
