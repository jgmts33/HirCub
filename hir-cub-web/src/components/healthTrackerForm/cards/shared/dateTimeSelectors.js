import React from 'react';
import { Field } from 'react-final-form';
import moment from 'moment';
import { DayPicker, TimePicker } from '~/components/ui/formControls';
import { formatDateNormal } from '~/consts/formatDateTime';

function DateTimeSelectors(props) {
  const { rootName, minutesInterval } = props;
  return (
    <div className="date-selector bg-white py-10 px-20 rounded-4 my-20 mx-20 rounded-4">
      <div className="date-container items-center row-mx-15">
        <div className="date-section text-center px-10 py-10">
          <div className="font-semibold mr-5">
            <i className="fas fa-calendar-alt mr-5" />
            Date
          </div>
          <div className="input-datapicker-group relative">
            <Field
              name={`${rootName}.date`}
              className="input-datapicker date"
              placeholder=""
              currentDate={formatDateNormal()}
              component={DayPicker}
            />
          </div>
        </div>

        <div className="time-section text-center px-10 py-10">
          <div className="font-semibold mr-5">
            <i className="fas fa-clock mr-5" /> Time
          </div>
          <div className="input-datapicker-group relative">
            <Field
              name={`${rootName}.time`}
              use12Hours
              minuteStep={minutesInterval ? minutesInterval : 1}
              showSecond={false}
              autoComplete="off"
              currentTime={moment()}
              component={TimePicker}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateTimeSelectors;
