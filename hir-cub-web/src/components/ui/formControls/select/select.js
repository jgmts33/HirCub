import React from 'react';
import Select from 'react-select';
import './styles.scss';

function SelectBox(props) {
  const {
    input,
    meta: { touched, error },
    ...rest
  } = props;
  const isInvalid = touched && error;
  return (
    <div className="select-filed">
      <Select
        className={`form-control ${isInvalid ? 'field-error' : null}`}
        {...input}
        {...rest}
      />
      {isInvalid && <div className="error-msg">{error}</div>}
    </div>
  );
}

export default SelectBox;
