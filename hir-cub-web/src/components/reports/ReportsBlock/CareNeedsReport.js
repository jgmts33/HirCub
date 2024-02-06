import React, { useState, useEffect } from 'react';

// components
import ReactApexChart from 'react-apexcharts';

// api
import { GetValuesFromLocal } from '~/consts/global';
import useAppState from '~/appState';
// helpers
import { formatDateMMMDD } from '~/consts';

const CareNeedsReport = ({ dateFrom, dateTo }) => {
  const appState = useAppState();

  const graphItems = [
    'bathing',
    'dressing',
    'eating',
    'toileting',
    'continence',
    'feeding',
    'total',
  ];

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
       enabled: false,
      },
      selection: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      max: 12,
      title: {
        text: '',
      },
    },

    fill: {
      opacity: 1,
    },
    colors: [
      '#52A62D',
      '#019BC2',
      '#9F2080',
      '#FFE40C',
      '#F93996',
      '#016A89',
      '#6C6D73',
    ],
  });

  useEffect(() => {
    const careNeedValues =
      GetValuesFromLocal(appState, 'care-needs-tool') || {};

    let dateArray = [];

    let itemArray = {};
    graphItems.forEach((key) => {
      itemArray[key] = [];
    });

    // make item array
    for (const date in careNeedValues) {
      dateArray.push(formatDateMMMDD(date));
      let careItem = careNeedValues[date];
      let total = 0;
      graphItems.forEach((key) => {
        if (key != 'total') {
          const value = Number(careItem[key]) || 0;
          itemArray[key].push(value);
          total += value;
        }
      });

      itemArray['total'].push(total);
    }

    const graphValues = graphItems.map((key) => {
      return { name: key.toUpperCase(), data: itemArray[key] };
    });

    // set Categories and Series to Chart
    let newOptions = {
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: dateArray,
      },
    };
    setOptions(newOptions);

    setSeries(graphValues);
  }, []);

  return (
    <React.Fragment>
      <div>
        <p className="reports-block-graph__title">Care Needs Tool</p>
        <p className="reports-block-graph__description">
          INDIVIDUAL SCORING: 2 = High (independent), 1 = Some (requires assistance), 0
          = Low(very dependent)
        </p>
        <p className="reports-block-graph__description">
          TOTAL SCORING: 12 = High (independent), 6 = Some (requires assistance), 0 =
          Low(very dependent)
        </p>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </React.Fragment>
  );
};

export default CareNeedsReport;
