# Chart Reaction

[![GitHub issues](https://img.shields.io/github/issues/entreprenerder/chart-reaction.svg)](https://github.com/entreprenerder/chart-reaction/issues) [![Twitter](https://img.shields.io/twitter/url/https/github.com/entreprenerder/chart-reaction.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fentreprenerder%2Fchart-reaction)

NOTE: `chart-reaction` is in beta. Right now the `LineChart` component exists. There will be more features and more variety of charts coming soon. Thank you for your patience :)

## A JS Chart Library built for React!

**Self contained components**

No external js or css links are required. All settings are built within the component(like it should be) allowing you to take advantage of React's component life cycle and virtual DOM for any chart updates based on user interaction.

**Simplicty**

No need to write endless configuration code just to get a chart to render. Configure your chart through `props` and just use the ones you need.

## Line Chart

### Getting Started
<!-- prettier-ignore -->
```JSX
import React from 'react';
import {LineChart} from 'chart-reaction';

//This will render a line by itself w/o any grid, axis, or labels.
export const Example = (props) => {
  const lineChartData = [
    {label: "Jan",value: 15},
    {label: "Feb",value: 10},
    {label: "Mar",value: 10},
    {label: "Apr",value: 5},
    {label: "May",value: 10},
    {label: "Jun",value: 5},
    {label: "Jul",value: 8},
    {label: "Aug",value: 12},
    {label: "Sep",value: 9},
    {label: "Oct",value: 17}
  ];

  return <LineChart data={lineChartData} />;
}
```
NOTE: The component does not require any props to work:
```JSX
//This will render an empty 400px X 200px box.
//This can be useful as a placeholder if there is not yet data to create a line.
<LineChart />
```
### Example w/ More Settings
<!-- prettier-ignore -->
```JSX
import React from 'react';
import {LineChart} from 'chart-reaction';

export const Example = (props) => {

  const lineChartData = [
    {label: "Jan",value: 15},
    {label: "Feb",value: 10},
    {label: "Mar",value: 10},
    {label: "Apr",value: 5},
    {label: "May",value: 10},
    {label: "Jun",value: 5},
    {label: "Jul",value: 8},
    {label: "Aug",value: 12},
    {label: "Sep",value: 9},
    {label: "Oct",value: 17}
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
        xGridColor='rgba(0,0,0,0.3)'
        yGridColor='rgba(0,0,0,0.3)'
        xGridWidth={null}
        yGridWidth={null}
        showXAxis={true}
        showYAxis={true}
        xAxisColor='#000'
        yAxisColor='#000'
        xAxisWidth={2}
        yAxisWidth={2}
        showXLables={true}
        xLabelColor='#000'
        yLabelColor='#000'
        showYLables={true}
        showValues={true}
        valueColor='#000'
        width={800}
        height={400}
        dots={true}
        dotColor='#fff'
        dotBorderColor='#4A90E2'
        responsive={false}
        yIncrement={2}
        yMax={20}
        yMin={0}
        areaColor={areaColor}
        paddingTop={50}
        paddingLeft={90}
        paddingRight={100}
        paddingBottom={50}
        lineColor='#4A90E2'
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
```

### Properties

#### data <array>
```JSX
//label will show the label for that x value.
[
  {
    label: <string>,
    value: <number>
  }
]
```

#### width <number>
default: 400

#### height <number>
default: 200

#### showXAxis <boolean>
default: false

#### showYAxis <boolean>
default: false

#### xAxisColor <string(color name | rgba | hexcolor)>
default: "#000"

#### yAxisColor <string(color name | rgba | hexcolor)>
default: "#000"

#### showXGrid <boolean>
default: false

#### showYGrid <boolean>
default: false

#### xGridColor <string(color name | rgba | hexcolor)>
default: "#CCC"

#### yGridColor <string(color name | rgba | hexcolor)>
default: "#CCC"
