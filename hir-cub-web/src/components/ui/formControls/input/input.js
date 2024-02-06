import React from 'react';
import './styles.scss';

function Input(props) {
  const {
    input,
    meta: { touched, error },
    placeholder,
    ...rest
  } = props;
  const isInvalid = touched && error;
  return (
    <div className="input-filed">
      <input
        className={`form-control ${isInvalid ? 'field-error' : null}`}
        placeholder={placeholder}
        {...input}
        {...rest}
      />
      {isInvalid && <div className="error-msg">{error}</div>}
    </div>
  );
}

export default Input;
