import React from 'react';
import './styles.scss';

function Checkbox(props) {
  // eslint-disable-next-line
  const { input, meta, children, ...rest } = props;
  return (
    <label className="checkbox">
      <input {...input} {...rest} />
      <span className="label-txt">{children}</span>
    </label>
  );
}

export default Checkbox;
