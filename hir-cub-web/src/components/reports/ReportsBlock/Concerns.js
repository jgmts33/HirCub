import React, { useState, useEffect, useMemo } from 'react';

// components
import ReactApexChart from 'react-apexcharts';
import Loader from '../../Loader';

// api
import { getReportDataRequest } from '~/requests/reports';

// helpers
import { isEmpty } from 'lodash';
import { formatDateMMMDD } from '~/consts';

import './Concerns.scss';
import HelpBox from '~/components/HelpBox';

const Concerns = ({ dateFrom, dateTo }) => {
  const [currentReport, setCurrentReport] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [problemGraphs, setProblemGraphs] = useState(null);

  const convertConcernValues = useMemo(() => {
    if (isEmpty(currentReport)) {
      return {
        labels: [],
        dataCharts: [],
      };
    }

    return currentReport.concernValues.reduce((convertPoints, concern) => {
      const { name, value, points } = concern;

      convertPoints.labels.push(name);

      points.forEach(point => {
        const date = formatDateMMMDD(point);

        convertPoints.dataCharts.push({
          x: date,
          y: value - 1,
        });
      });

      return convertPoints;
    }, {
      labels: [],
      dataCharts: [],
    });
  }, [currentReport]);

  const getLabelWidth = () => {
    const screenWidth = window.screen.width;
    const isSmallScreen = screenWidth <= 768;
    const isXsSmallScreen = screenWidth <= 480;

    if (currentReport.internalName === 'information') {
      return isXsSmallScreen ? 220 : (isSmallScreen ? 285 : 350);
    }

    return isSmallScreen ? 180 : 200;
  };

  const options = useMemo(() => {
    const { labels } = convertConcernValues;
    return {
      chart: {
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
      yaxis: {
        show: true,
        title: {
          text: 'Values',
        },
        tickAmount: labels.length - 1,
        min: 0,
        max: labels.length - 1,
        labels: {
          minWidth: getLabelWidth(),
          maxWidth: getLabelWidth(),
          formatter: (value) => {
            return labels[value];
          },
        },
      },
    };
  }, [convertConcernValues]);

  useEffect(() => {
    setLoading(true);
    getReportDataRequest({
      isConcern: true,
      dateFrom,
      dateTo,
    }).then(res => {
      setLoading(false);

      const { problemGraphs } = res || {};

      setProblemGraphs(problemGraphs);
    }).catch(err => {
      console.error('err', err);
      setLoading(false);
    });
  }, [dateFrom, dateTo]);

  useEffect(() => {
    if (isEmpty(problemGraphs)) {
      return;
    }

    const matchedReport = problemGraphs
      .find(({ internalName }) => internalName === currentReport.internalName);

    setCurrentReport(matchedReport || problemGraphs[0]);
  }, [problemGraphs, currentReport]);

  return (
    <div className="component-concerns">
      <HelpBox
        firstLine="Not seeing much data? Why track this data?"
        secondLine="Learn why in our help section >"
        hash="/help#reports"
      />

      <div className="reports-block-group-btn">
        {problemGraphs && problemGraphs.map(data => {
          const classNameBtn = data.internalName === currentReport.internalName
            ? '-white-btn'
            : '-purpose-btn';

          return (
            <button
              key={data.internalName}
              type="button"
              className={`btn uppercase ${classNameBtn}`}
              onClick={() => setCurrentReport(data)}
            >
              {data.displayName}
            </button>
          );
        })}
      </div>
      <ReactApexChart
        className="reports-block-graph__chart"
        type="scatter"
        options={options}
        series={[
          {
            name: 'Dot',
            data: convertConcernValues.dataCharts,
          },
        ]}
        height={200}
      />
      {isLoading && <Loader />}
    </div>
  );
};

export default Concerns;
