import React from 'react';
import InputColor from 'react-input-color';

function ColorPickerWrapper(props) {
  const { input, ...rest } = props;
  return (
    <div>
      <InputColor
        {...input}
        initialValue={rest.initial ? rest.initial : '#3fb4c4'}
        onChange={input.onChange}
        {...rest}
      />
    </div>
  );
}

export default ColorPickerWrapper;
