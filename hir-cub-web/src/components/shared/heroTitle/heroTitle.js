import React from 'react';
import './styles.scss';

function HeroTitle({ imageUrl, children }) {
  return (
    <div className="hero-title flex flex-wrap justify-center">
      <div className="hero-title_image">
        <img className="" src={imageUrl} />
      </div>
      <div className="hero-children">{children}</div>
    </div>
  );
}

export default HeroTitle;
