import React from 'react';
import TimePicker from 'rc-time-picker';

function TimePickerWrapper(props) {
  const { input, ...rest } = props;
  return (
    <div>
      <TimePicker
        {...input}
        value={input.value === '' ? rest.currentTime ? rest.currentTime : null : input.value}
        onChange={input.onChange}
        {...rest}
      />
    </div>
  );
}

export default TimePickerWrapper;
