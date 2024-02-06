import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
} from 'react-vis';

function Graph(props) {
  const { graphContainerWidth, data, xTickCount } = props;
  return (
    <XYPlot
      width={graphContainerWidth}
      height={400}
      xType="time"
      margin={{ left: 50, right: 50, top: 10, bottom: 40 }}
      style={{ backgroundColor: '#fff' }}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickTotal={xTickCount} />
      <YAxis tickFormat={val => `${val}%`} />
      <LineSeries data={data} curve={'curveBasis'} />
    </XYPlot>
  );
}

export default Graph;
