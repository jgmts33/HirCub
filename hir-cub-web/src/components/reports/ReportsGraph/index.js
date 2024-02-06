import React, { useMemo } from 'react';

// components
import ReactApexChart  from 'react-apexcharts';
import TableGraph from './TableGraph';

// helpers
import { isEmpty } from 'lodash';
import { formatDateMMMDD } from '~/consts';

const options = {
  chart: {
    height: 350,
    type: 'scatter',
    toolbar: {
      show: false,
    },
    zoom: {
     enabled: false,
    },
  },
  legend: {
    show: false,
  },
  markers: {
    colors: ['#009c47'],
    size: 10,
    strokeColors: 'transparent',
  },
  grid: {
    borderColor: '#ffffff',
  },
  xasis: {
    type: 'datetime',
  },
};

const columnsTable = [
  {
    keyMapping: 'date',
    label: 'DATE',
  },
  {
    keyMapping: 'painType',
    label: 'SYMPTOM DESCRIPTION',
  },
  {
    keyMapping: 'concerned',
    label: 'HOW CONCERNED?',
  },
  {
    keyMapping: 'additionalDetails',
    label: 'DETAILS',
  },
];

const ReportsGraph = ({ problemTypeName, notEnoughData, points, table, dateFrom, dateTo }) => {

  const convertPoints = useMemo(() => {
    if (isEmpty(points)) {
      return [];
    }

    return points.map((point) => {
      const { x, y } = point;
      const date = formatDateMMMDD(x);

      return {
        x: date,
        y,
      };
    });
  }, [points]);

  const getFormattedTableData = useMemo(() => {
    return table
      .map(item => ({
          ...item,
          date: formatDateMMMDD(item.date),
      }));
  }, [table]);

  return (
    <div className="reports-block-graph">
      <p className="reports-block-graph__title">{problemTypeName}</p>
      <p className="reports-block-graph__description">Symptom description here</p>
      <ReactApexChart
        className="reports-block-graph__chart"
        type="scatter"
        options={options}
        series={[
          {
            name: 'Dot',
            data: convertPoints,
          },
        ]}
        height={300}
      />
      {!notEnoughData &&
        <TableGraph data={getFormattedTableData} columns={columnsTable} />
      }
    </div>
  );
};

export default ReportsGraph;
