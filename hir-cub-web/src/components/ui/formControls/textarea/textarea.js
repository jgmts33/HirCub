import React from 'react';
import './styles.scss';

function Textarea(props) {
  const {
    input,
    meta: { touched, error },
    placeholder,
    ...rest
  } = props;
  const isInvalid = touched && error;
  return (
    <div className="input-filed">
      <textarea
        className={`form-control ${isInvalid ? 'field-error' : ''}`}
        placeholder={placeholder}
        {...input}
        {...rest}
        style={{ height: 75 }}
      />
      {isInvalid && <div className="error-msg">{error}</div>}
    </div>
  );
}

export default Textarea;
