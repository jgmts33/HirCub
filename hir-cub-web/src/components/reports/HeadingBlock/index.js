import React, { useEffect, useMemo, useState } from 'react';

// component
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { ReactComponent as Calendar } from '~/assets/svg/Calendar.svg';

// helper
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import './HeadingBlock.scss';

// constants
import {
  formatDate,
  formatDateDefault,
  formatDateString,
  limitType,
  limitValue,
  parseDate,
  convertDate,
} from '~/consts';

const HeadingBlock = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  setSearching,
}) => {
  const [dateFromTemp, setDateFromTemp] = useState('');
  const [dateToTemp, setDateToTemp] = useState('');

  useEffect(() => {
    setDateFromTemp(dateFrom);
  }, [dateFrom]);

  useEffect(() => {
    setDateToTemp(dateTo);
  }, [dateTo]);

  const onHandleView = () => {
    setDateFrom(dateFromTemp);
    setDateTo(dateToTemp);
    setSearching(true);

    setTimeout(() => {
      setSearching(false);
    });
  };

  const rangeTimeReport = useMemo(() => {
    return `${dateFrom} ${dateFrom && dateTo ? '- ' : ''}${dateTo}`;
  }, [dateFrom, dateTo]);

  return (
    <div className="report-heading-block">
      <div className="report-heading-block__left">
        <img
          className="report-heading-block__left-logo"
          src="/img/icons/heart-black.png"
          alt="Heart"
        />
        <h3 className="report-heading-block__left-title">
          <span>Health Report:&nbsp;</span>
          <span>{rangeTimeReport}</span>
        </h3>
      </div>
      <div className="report-heading-block__right">
        <p className="report-heading-block__right-label">Date range:</p>
        <div className="input-datapicker-group">
          <DayPickerInput
            placeholder="Start Date"
            onDayChange={(day) => {
              setDateFromTemp(day ? formatDateDefault(day) : '');
            }}
            value={dateFromTemp}
            format={formatDateString}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              disabledDays: {
                before: moment(
                  moment(dateToTemp)
                    .subtract(limitValue, limitType)
                    .format(formatDateString)
                ).toDate(),
                after: convertDate(dateToTemp),
              },
            }}
          />
        </div>
        <div className="input-datapicker-group">
          <DayPickerInput
            placeholder="End Date"
            onDayChange={(day) => {
              setDateToTemp(day ? formatDateDefault(day) : '');
            }}
            readonly
            value={dateToTemp}
            format={formatDateString}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              disabledDays: {
                before: convertDate(dateFromTemp),
                after: moment(
                  moment(dateFromTemp)
                    .add(limitValue, limitType)
                    .format(formatDateString)
                ).toDate(),
              },
            }}
          />
        </div>
        <button type="button" className="btn -blue-btn" onClick={onHandleView}>
          <Calendar />
          View
        </button>
      </div>
    </div>
  );
};

export default HeadingBlock;
