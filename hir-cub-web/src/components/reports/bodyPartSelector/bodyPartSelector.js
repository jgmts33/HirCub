import React from 'react';
import { bodyPartCoordinates } from '~/consts';
import '~/components/healthTrackerForm/cards/shared/body/body.scss';
import './bodyPartSelector.scss';

function BodyPartSelector(props) {
  const { isFront, bodyPart, setIsFront, setBodyPart, isMale } = props;
  return (
    <div className="body-part-selector">
      <div className="text-center">
        <div className="font-semibold text-lg">
          {isFront ? 'Front' : 'Back'} View
        </div>
      </div>
      <div className="my-10 text-center body">
        <span className="relative display-inline-block">
          <img
            src={`/img/${isMale ? 'male' : 'female'}-${
              isFront ? 'front' : 'back'
            }.png`}
          />
          {bodyPartCoordinates.map(pc => (
            <div
              key={pc.type}
              className={`body_area${bodyPart === pc.type ? ' -selected' : ''}`}
              style={{ top: `${pc.top}px`, left: `${pc.left}px` }}
              onClick={() => setBodyPart(pc.type)}
              role="button"
              tabIndex="0"
            />
          ))}
        </span>
        <div
          className="my-10 text-center text-lg body-pain_swtcher"
          onClick={() => setIsFront(!isFront)}
          role="button"
          tabIndex="0"
          data-html2canvas-ignore
        >
          <i className="fas fa-angle-left" />
          {isFront ? 'Back' : 'Front'} View
          <i className="fas fa-angle-right" />
        </div>
      </div>
    </div>
  );
}

export default BodyPartSelector;
