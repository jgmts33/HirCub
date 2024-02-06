import React from 'react';
import { Field } from 'react-final-form';
import moment from 'moment';
import { DayPicker } from '~/components/ui/formControls';
import { formatDateString } from '~/consts/formatDateTime';
import './styles.scss';

export function DateSelector(props) {
  const { rootName } = props;

  return (
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
          currentDate={moment().format(formatDateString)}
          component={DayPicker}
        />
      </div>
    </div>
  );
}