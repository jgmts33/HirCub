import React from 'react';
import './styles.scss';

function Radio(props) {
  // eslint-disable-next-line
  const { input, meta, children, ...rest } = props;
  return (
    <label className="radio">
      <input {...input} {...rest} />
      <span className="label-txt">{children}</span>
    </label>
  );
}

export default Radio;
