`chart-reaction` is a React component library for charting.

It is still very much in beta. Right now the `LineChart` component exists. There will be more features and more variety of charts coming soon.

There will also be more documentation coming soon. Thank you for your patience :)


# Line Chart


## Example
<!-- prettier-ignore -->
```JSX
import React from 'react';
import {LineChart} from 'chart-reaction';

const Home = (props) => {

  const lineChartData = [
    {
      label: "Jan",
      value: 15
    },
    {
      label: "Feb",
      value: 10
    },
    {
      label: "Mar",
      value: 10
    },
    {
      label: "Apr",
      value: 5
    },
    {
      label: "May",
      value: 10
    },
    {
      label: "Jun",
      value: 5
    },
    {
      label: "Jul",
      value: 8
    },
    {
      label: "Aug",
      value: 12
    },
    {
      label: "Sep",
      value: 9
    },
    {
      label: "Oct",
      value: 17
    }
  ];

  const areaColor = {
    direction: 'vertical',
    colors: [
      {
        color: '#4A90E2',
        offset: 0
      },
      {
        color: 'transparent',
        offset: 100
      }
    ]
  }

  const lineShadow = {
    spread: 7,
    blur: 5,
    color: 'rgba(0,0,0,0.5)',
    xOffset: 0,
    yOffset: 10
  };

  return (
    <div>
      <LineChart
        yName={null}
        xName={null}
        yNameColor={null}
        xNameColor={null}
        showXGrid={true}
        showYGrid={false}
        xGridColor={'rgba(0,0,0,0.3)'}
        yGridColor={'rgba(0,0,0,0.3)'}
        xGridWidth={null}
        yGridWidth={null}
        showXAxis={true}
        showYAxis={true}
        xAxisColor={'rgba(255,255,255,1)'}
        yAxisColor={'rgba(255,255,255,1)'}
        xAxisWidth={2}
        yAxisWidth={2}
        showXLables={true}
        xLabelColor={'#fff'}
        yLabelColor={'#fff'}
        showYLables={true}
        showValues={true}
        valueColor={'#fff'}
        width={800}
        height={400}
        dots={false}
        dotColor={'rgba(29,36,40,1)'}
        dotBorderColor={'#70B4C6'}
        responsive={false}
        yIncrement={2}
        yMax={20}
        yMin={0}
        areaColor={areaColor}
        paddingTop={50}
        paddingLeft={90}
        paddingRight={100}
        paddingBottom={50}
        lineColor={'#70B4C6'}
        lineWidth={3}
        lineCurved={false}
        lineBlur={null}
        lineShadow={lineShadow}
        lineRoundedEnds={true}
        hideLine={false}
        backgroundColor={null}
        data={lineChartData}
        animation={true}
      />
    </div>
  );

}

export default Example;
```