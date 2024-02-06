import React, { useState, useEffect, useReducer } from 'react';
import { getReportDataRequest } from '~/requests/reports';
import ProblemGraph from './problemGraph';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import '~/components/healthTrackerForm/cards/shared/body/body.scss';
import './styles.scss';
import {
  convertDate,
  formatDate,
  formatDateDefault,
  parseDate,
} from '~/consts';

const SAVE_DATA = 'saveData';
const SET_NOT_ENOUGH_DATA = 'setNotEnoughData';

function reducer(state, action) {
  switch (action.type) {
    case SAVE_DATA:
      const { problemGraphs } = action.payload;
      return {
        ...state,
        graphsData: problemGraphs,
        notEnoughData: false,
      };
    case SET_NOT_ENOUGH_DATA:
      return {
        ...state,
        graphsData: null,
        notEnoughData: true,
      };
    default:
      throw new Error();
  }
}

const initialState = {
  graphsData: null,
  problemTypesDict: null,
  notEnoughData: false,
};

function Graphs() {
  const [{ graphsData, notEnoughData }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    getReportDataRequest().then((res) => {
      if (!res.problemGraphs || res.problemGraphs.length === 0) {
        dispatch({ type: SET_NOT_ENOUGH_DATA });
        return;
      }
      dispatch({ type: SAVE_DATA, payload: res });
    });
  }, []);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  return (
    <React.Fragment>
      <div className="reports_container">
        <div className="reports_range-container">
          <div className="reports_range-input">
            <div className="reports_range-label">Date From</div>
            <div className="input-datapicker-group relative">
              <DayPickerInput
                onDayChange={(day) => {
                  setDateFrom(formatDateDefault(day));
                }}
                value={dateFrom}
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  disabledDays: { after: convertDate(dateTo) },
                }}
              />
            </div>
          </div>
          <div className="reports_range-input">
            <div className="reports_range-label">Date To</div>
            <div className="input-datapicker-group relative">
              <DayPickerInput
                onDayChange={(day) => {
                  setDateTo(formatDateDefault(day));
                }}
                value={dateTo}
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  disabledDays: { before: convertDate(dateFrom) },
                }}
              />
            </div>
          </div>
        </div>
        {moment(dateFrom).isAfter(moment(dateTo)) && (
          <div className="reports_error">
            Date To can't be greater than Date From
          </div>
        )}
      </div>
      {notEnoughData && (
        <div>
          <i>There is no data to show in the report.</i>
        </div>
      )}
      {graphsData &&
        graphsData.length > 0 &&
        graphsData.map((gd) => (
          <ProblemGraph
            key={gd.problemTypeId}
            dateFrom={dateFrom}
            dateTo={dateTo}
            {...gd}
            // problemTypeName={problemTypesDict[gd.problemTypeId]}
          />
        ))}
    </React.Fragment>
  );
}

export default Graphs;
