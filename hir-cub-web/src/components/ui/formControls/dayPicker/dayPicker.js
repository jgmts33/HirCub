import React from 'react';
import { formatDate, formatDateDefault, parseDate, formatDateString } from '~/consts';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import './styles.scss';

function DayPicker(props) {
  const { input, ...rest } = props;
  return (
    <div>
      <DayPickerInput
        {...input}
        value={input.value !== '' ? input.value : rest.currentDate}
        onDayChange={day => {
          input.onChange(formatDateDefault(day));
        }}
        format={formatDateString}
        formatDate={formatDate}
        parseDate={parseDate}
        inputProps={{ readOnly: 'readonly' }}
        {...rest}
      />
    </div>
  );
}

export default DayPicker;
