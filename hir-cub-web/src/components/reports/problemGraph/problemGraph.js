import React, { useState, useEffect, useRef } from 'react';
import { getGraphDataRequest } from '~/requests/reports';
import Graph from './graph';
import '~/components/healthTrackerForm/cards/shared/body/body.scss';
import './problemGraph.scss';

const painGraphNormalWidth = 800;//500;
const problemGraphFullWidth = 800;
const graphsFullWidthBreakPoint = 850;
const graphsFirstResizeBreakPoint = 767;
const doubledSmallerGraphsPadding = 50;

const ReportPerios = {
  Monthly: 1,
  Weekly: 2,
  Daily: 3,
};

function ProblemGraph(props) {
  const {
    isPain,
    problemTypeId,
    problemTypeName,
    xTickCount,
    dateFrom,
    dateTo,
  } = props;
  const [isMale, setIsMale] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [notEnoughData, setNotEnoughData] = useState(props.notEnoughData);
  const [bodyPart, setBodyPart] = useState(props.bodyPart.toString());
  const [isFront, setIsFront] = useState(true);
  const [reportPeriod, setReportPeriod] = useState(ReportPerios.Daily);
  const [data, setData] = useState(
    props.points
      ? props.points.map(p => ({
        ...p,
        x: new Date(p.x).getTime(),
      }))
      : []
  );
  useEffect(() => {
    const storedIsMale = localStorage.getItem('isMale');
    setIsMale(storedIsMale === '1');
  }, []);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      const params = {
        isFront,
        bodyPart,
        isPain,
        problemTypeId,
        reportPeriod,
        dateFrom,
        dateTo,
      };
      getGraphDataRequest(params).then(res => {
        if (!res || res.notEnoughData) {
          setNotEnoughData(true);
          setData(null);
          return;
        }
        setNotEnoughData(false);
        setData(
          res.points
            ? res.points.map(p => ({
              ...p,
              x: new Date(p.x).getTime(),
            }))
            : []
        );
      });
    }
    // eslint-disable-next-line
  }, [
    reportPeriod,
    isFront,
    bodyPart,
    isPain,
    problemTypeId,
    dateFrom,
    dateTo,
  ]);

  const graphContainerRef = useRef();
  const [graphContainerWidth, setGraphContainerWidth] = useState(
    isPain ? painGraphNormalWidth : problemGraphFullWidth
  );
  useEffect(() => {
    function handleResize() {
      const width = graphContainerRef.current.clientWidth;
      if (width > graphsFullWidthBreakPoint) {
        setGraphContainerWidth(
          isPain ? painGraphNormalWidth : problemGraphFullWidth
        );
        return;
      }
      if (width > graphsFirstResizeBreakPoint) {
        setGraphContainerWidth(
          isPain
            ? painGraphNormalWidth -
            graphsFullWidthBreakPoint +
            graphContainerRef.current.clientWidth
            : width - doubledSmallerGraphsPadding
        );
        return;
      }
      setGraphContainerWidth(width - doubledSmallerGraphsPadding);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="page-panel-group tmp" ref={graphContainerRef}>
      <div className="page-panel-group-title text-center problem-graph_header l-xs-flex-wrap">
        <div className="problem-graph_header-dummy" />
        <div className="problem-graph_header-title l-xs-w-full">
          {problemTypeName}
        </div>
        <div className="problem-graph_header-switcher">
          <span
            onClick={() =>
              setReportPeriod(
                reportPeriod === ReportPerios.Daily
                  ? ReportPerios.Weekly
                  : reportPeriod === ReportPerios.Weekly
                    ? ReportPerios.Monthly
                    : ReportPerios.Daily
              )
            }
            role="button"
            tabIndex="0"
          >
            <span className="switcher-label">
              {reportPeriod === ReportPerios.Monthly
                ? 'monthly'
                : reportPeriod === ReportPerios.Weekly
                  ? 'weekly'
                  : 'daily'}
            </span>
          </span>
        </div>
      </div>
      <div className="graph-container">
        {notEnoughData ? (
          <div>
            <i>There is not enough data to build the report</i>
          </div>
        ) : (
          <div className="problem-graph">
            <Graph
              graphContainerWidth={graphContainerWidth}
              data={data}
              xTickCount={xTickCount}
            />
          </div>
        )}
        {/*{isPain && (
          <BodyPartSelector
            isFront={isFront}
            bodyPart={bodyPart}
            setIsFront={setIsFront}
            setBodyPart={setBodyPart}
            isMale={isMale}
          />
        )}*/}
      </div>
    </div>
  );
}

export default ProblemGraph;
