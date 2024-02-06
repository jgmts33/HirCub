import React, { useEffect, useReducer, useState } from 'react';

// components
import ReportsGraph from '../ReportsGraph';
import Loader from '../../Loader';

// API
import { getReportDataRequest } from '~/requests/reports';

// helper
import { isEmpty } from 'lodash';
import moment from 'moment';

const SAVE_DATA = 'saveData';
const SET_NOT_ENOUGH_DATA = 'setNotEnoughData';

function reducer(state, action) {
  switch (action.type) {
    case SAVE_DATA:
      return {
        ...state,
        graphsData: action.problemGraphs,
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

const Symptoms = ({ dateFrom, dateTo, isSearching }) => {
  const [{ graphsData }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [currentReport, setCurrentReport] = useState({});
  const [isLoading, setLoading] = useState(false);

  const checkItemInDate = (item, key) => {
    const itemDate = item && item[key] && moment.parseZone(item[key]).valueOf();
    const dateFromMoment = dateFrom && moment.parseZone(dateFrom).valueOf();
    const dateToMoment = dateTo && moment.parseZone(dateTo).valueOf();

    if (itemDate) {
      if (dateFromMoment && dateToMoment) {
        return itemDate >= dateFromMoment && itemDate <= dateToMoment;
      } else if (dateFromMoment && !dateToMoment) {
        return itemDate >= dateFromMoment;
      } else if (!dateFromMoment && dateToMoment) {
        return itemDate <= dateToMoment;
      }

      return true;
    }

    return false;
  };

  const getFilteredReports = (reports) => {
    return (
      reports &&
      reports
        .map((graph) => ({
          ...graph,
          table: graph.table.filter((item) => checkItemInDate(item, 'date')),
          points: graph.points.filter((item) => checkItemInDate(item, 'x')),
        }))
        .filter((graph) => graph.table.length > 0 && graph.points.length > 0)
    );
  };

  const handleChangeReports = (data) => {
    setCurrentReport(data);
  };

  useEffect(() => {
    setLoading(true);
    getReportDataRequest({
      dateFrom,
      dateTo,
    })
      .then((res) => {
        if (!res.problemGraphs || res.problemGraphs.length === 0) {
          dispatch({ type: SET_NOT_ENOUGH_DATA });
          return;
        }

        const filteredGraphsData = getFilteredReports(res.problemGraphs);
        dispatch({ type: SAVE_DATA, problemGraphs: filteredGraphsData });
        setCurrentReport(filteredGraphsData[0]);

        setLoading(false);
      })
      .catch((err) => {
        console.error('err', err);
        setLoading(false);
      });
  }, [dateFrom, dateTo]);

  return (
    <>
      <div className="reports-block">
        <div className="reports-block-group-btn">
          {graphsData &&
            graphsData.map((data) => {
              const classNameBtn =
                data.problemTypeId === currentReport.problemTypeId
                  ? '-white-btn'
                  : '-purpose-btn';

              return (
                <button
                  key={data.problemTypeId}
                  type="button"
                  className={`btn uppercase ${classNameBtn}`}
                  onClick={() => handleChangeReports(data)}
                >
                  {data.problemTypeName}
                </button>
              );
            })}
        </div>

        {!isEmpty(currentReport) && !isLoading && (
          <ReportsGraph
            dateFrom={dateFrom}
            dateTo={dateTo}
            {...currentReport}
          />
        )}

        {isEmpty(currentReport) && !isLoading && (
          <div className="noData">No data matched or available.</div>
        )}

        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default Symptoms;
