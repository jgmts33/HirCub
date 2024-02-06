import React from 'react';
import { bodyPartCoordinates } from '~/consts';

function BodyPartSelector(props) {
  const { input, ...rest } = props;
  return (
    <React.Fragment>
      <input {...input} type="hidden" value={input.value} {...rest} />
      {bodyPartCoordinates.map(pc => (
        <div
          key={pc.type}
          className={`body_area${input.value === pc.type ? ' -selected' : ''}`}
          style={{ top: `${pc.top}px`, left: `${pc.left}px` }}
          onClick={() => input.onChange(pc.type)}
          role="button"
          tabIndex="0"
        />
      ))}
    </React.Fragment>
  );
}

export default BodyPartSelector;
