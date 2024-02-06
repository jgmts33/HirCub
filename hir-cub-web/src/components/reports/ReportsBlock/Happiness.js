import React, { useState, useEffect, useMemo } from 'react';

// components
import ReactApexChart  from 'react-apexcharts';
import Loader from '../../Loader';

// api
import { getReportDataRequest } from '~/requests/reports';

// helpers
import { isEmpty } from 'lodash';
import { formatDateMMMDD } from '~/consts';

const Happiness = ({ dateFrom, dateTo }) => {
  const listValues = [
    'Very Poor',
    'Poor',
    'Average',
    'Good',
    'Great',
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
       enabled: false,
      },
    },
    colors: ['#069e4c'],
    grid: {
      borderColor: '#ffffff',
    },
    xasis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Values',
      },
      tickAmount: listValues.length - 1,
      min: 0,
      max: listValues.length - 1,
      labels: {
        formatter: (value) => {
          const newVal = parseInt(value, 0);
          return listValues[newVal];
        },
      },
    },
  };

  const [isLoading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState(false);

  const convertPoints = useMemo(() => {
    if (isEmpty(currentData.points)) {
      return [];
    }

    return currentData.points.map((point) => {
      const { x, y } = point;
      const date = formatDateMMMDD(x);

      return {
        x: date,
        y: y - 1,
      };
    });
  }, [currentData]);

  useEffect(() => {
    setLoading(true);
    getReportDataRequest({
      isHappiness: true,
      dateFrom,
      dateTo,
    }).then(res => {
      setLoading(false);

      const { problemGraphs = [] } = res || {};

      setCurrentData(problemGraphs[0] || {});
    }).catch(err => {
      console.error('err', err);
      setLoading(false);
    });
  }, [dateFrom, dateTo]);

  return (
    <div className="component-happiness">
      <div className="reports-block-graph">
        <p className="reports-block-graph__title">Overall Happiness</p>
        <p className="reports-block-graph__description">Symptom description here</p>
        <ReactApexChart
          className="reports-block-graph__chart --custom"
          type="line"
          options={options}
          series={[
            {
              name: 'Line',
              data: convertPoints,
            },
          ]}
          height={200}
        />
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Happiness;
