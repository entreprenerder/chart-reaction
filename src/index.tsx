import * as React from "react";
import styled, {keyframes} from "styled-components";


const AxisLabel = styled<any,any>('text')`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  fill: ${props => props.color ? props.color : '#000'};
`;

const DataValue = styled<any,any>('text')`
  font-size: 10px;
  fill: ${props => props.color ? props.color : '#000'};
  text-anchor: middle;
`;

const XLabels = styled<any,any>('g')`
  fill: ${props => props.color ? props.color : '#000'};
  text-anchor: right;
  font-size: 13px;
`

const YLabels = styled<any,any>('g')`
  fill: ${props => props.color ? props.color : '#000'};
  text-anchor: end;
  font-size: 13px;
`

const Axis = styled<any,any>('line')`
  stroke: ${props => props.color ? props.color : '#000'};
  stroke-dasharray: 0;
`

const DataDot = styled<any,any>('circle')`
  stroke: ${props => props.borderColor ? props.borderColor : (props.color ? props.color : '#000')};
  fill: ${props => props.color ? props.color : '#000'};
  stroke-width: 2;
`;

const XGrid = styled<any,any>('g')`
  stroke: ${props => props.color ? props.color : '#ccc'};
  stroke-dasharray: 0;
  stroke-width: 1;
`

const YGrid = styled<any,any>('g')`
  stroke: ${props => props.color ? props.color : '#ccc'};
  stroke-dasharray: 0;
  stroke-width: 1;
`

const drawLine = keyframes`
  from {
    stroke-dashoffset: 1500;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const Line = styled<any,any>('path')`
  ${({animation}) => {
    const draw = animation && (`
      stroke-dasharray: 1500;
      stroke-dashoffset: 1500;
      animation: ${drawLine} 3s forwards 1
    `);
    return draw;
  }}
`;

const LineShadow = styled<any,any>('path')`
  ${({animation}) => {
    const draw = animation && (`
      stroke-dasharray: 1500;
      stroke-dashoffset: 1500;
      animation: ${drawLine} 3s forwards 1
    `);
    return draw;
  }}
`;



class LineChart extends React.Component<any,any> {


  render() {
    const {
      data,
      yName,
      xName,
      yNameColor,
      xNameColor,
      showXGrid,
      showYGrid,
      xGridColor,
      yGridColor,
      xGridWidth,
      yGridWidth,
      showXAxis,
      showYAxis,
      xAxisColor,
      yAxisColor,
      xAxisWidth,
      yAxisWidth,
      showXLables,
      showYLables,
      xLabelColor,
      yLabelColor,
      showValues,
      valueColor,
      width,
      height,
      responsive,
      yIncrement,
      paddingTop,
      paddingBottom,
      paddingRight,
      paddingLeft,
      dots,
      dotColor,
      dotBorderColor,
      lineColor,
      lineWidth,
      lineCurved,
      areaColor,
      backgroundColor,
      lineBlur,
      hideLine,
      lineShadow,
      lineRoundedEnds,
      animation
    } = this.props;

    const values = data.map((item:any) => item.value);

    //Axis Length
    const yMin = this.props.yMin ? this.props.yMin : 0;
    const yMax = this.props.yMax ? this.props.yMax : Math.max(...values);
    const yAxisLength = height-paddingTop-paddingBottom;
    const xAxisLength = width-paddingLeft-paddingRight;
    const yBottom = yAxisLength+paddingTop;
    const xRight = paddingLeft+xAxisLength;

    //Axis Scaling
    const numberOfPoints = data.length;
    const yScale = yAxisLength/(yMax-yMin);
    const xScale = xAxisLength/(numberOfPoints - 1);

    //X Coordinates
    const xValues = [paddingLeft];
    let horizontalValue = paddingLeft;
    for (let i=1; i<numberOfPoints; i++) {
      horizontalValue = horizontalValue + xScale;
      xValues.push(horizontalValue);
    }

    //Y Coordinates
    function yCoord(value:number) {
      return (yAxisLength-(value*yScale))+(yScale*yMin)+paddingTop;
    }

    const yLabelValues = [yMin];
    let verticalValue = yMin;
    for(let i=0; i<((yMax-yMin)/yIncrement); i++) {
      verticalValue = verticalValue + yIncrement;
      if (verticalValue <= yMax) {
        yLabelValues.push(verticalValue);
      }
    }
    const yValues = values.map((item:any) => yCoord(item));

    //Coordinates
    const coords = yValues.map((item:any,i:number) => [xValues[i],item]);

    //https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
    const line = (pointA:any, pointB:any) => {
      const lengthX = pointB[0] - pointA[0]
      const lengthY = pointB[1] - pointA[1]
      return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
      }
    }

    const controlPoint = (current:any, previous:any, next:any, reverse:any) => {
      const p = previous || current;
      const n = next || current;
      const smoothing = 0.2;
      const o = line(p, n);
      const angle = o.angle + (reverse ? Math.PI : 0);
      const length = o.length * smoothing;
      const x = current[0] + Math.cos(angle) * length;
      const y = current[1] + Math.sin(angle) * length;
      return [x, y];
    }


    const bezierCommand = (point:any, i:any, a:any) => {
      const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point, false);
      const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
      return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
    }

    const svgPath = (points:any, command:any) => {
      const d = points.reduce((acc:any, point:any, i:any, a:any) => i === 0
        ? `M ${point[0]},${point[1]}`
        : `${acc} ${command(point, i, a)}`
      , '')
      return d;
    }

    const curve = svgPath(coords,bezierCommand);

    //Line Chart
    const points = coords.map((item:any) => `${item[0]} ${item[1]}`).join(" ");
    const circles = coords.map((item:any, i:number) => <DataDot key={`circle_${i}`} cx={item[0]} cy={item[1]} r="5" color={dotColor} borderColor={dotBorderColor}></DataDot>);

    function guassianBlur(blur:number,id:string) {
      return (
        <filter id={id} x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
        </filter>
      );
    }

    function displayLineShadow() {
      const {xOffset, yOffset, spread, color} = lineShadow;
      const shadowCoords = coords.map((item:any) => [item[0]+xOffset,item[1]+yOffset]);
      const shadowPoints = shadowCoords.map((item:any) => `${item[0]+xOffset} ${item[1]+yOffset}`).join(" ");
      const shadowCurve = svgPath(shadowCoords, bezierCommand);
      const shadowLine = lineCurved ? shadowCurve : `M ${shadowPoints}`;
      return (<LineShadow
       fill="none"
       stroke={color}
       strokeWidth={spread}
       d={shadowLine}
       strokeLinecap={lineRoundedEnds ? 'round' : 'inherit'}
       filter='url(#lineShadow)'
       animation={animation}
      />);
    }

    const lineChart = (<Line
     fill="none"
     stroke={lineColor ? (lineColor.constructor === Object ? 'url(#lineGradient)' : lineColor) : '#000'}
     strokeWidth={lineWidth}
     d={lineCurved ? curve : `M ${points}`}
     strokeLinecap={lineRoundedEnds ? 'round' : 'inherit'}
     filter={lineBlur && 'url(#lineBlur)'}
     animation={animation}
    />);

    //Axis Labels
    const xLabels = data.map((item:any, i:number) => <text key={`xLabel_${i}`} x={xValues[i]} y={yBottom+20}>{item.label}</text>);
    const yLabels = yLabelValues.map((item:any, i:number) => <text key={`yLabel_${i}`} x={paddingLeft-10} y={yCoord(item)}>{item}</text>);

    //Grids
    const xGridLines = yLabelValues.map((item:any, i:number) => <line key={`xGridLine_${i}`} x1={paddingLeft} x2={xRight} y1={yCoord(item)} y2={yCoord(item)} strokeWidth={yGridWidth} />);
    xGridLines.shift();
    const yGridLines = xValues.map((item:any,i:number) => <line key={`yGridLine_${i}`} x1={item} x2={item} y1={paddingTop} y2={yBottom} strokeWidth={xGridWidth} />);
    yGridLines.shift();

    const background = <polyline fill={backgroundColor} points={`${paddingLeft} ${paddingTop} ${xRight} ${paddingTop} ${xRight} ${yBottom} ${paddingLeft} ${yBottom}`} />

    //Data values
    const dataValues = coords.map((item:any, i:number) => <DataValue key={`dataValue_${i}`} x={item[0]} y={item[1]-10} color={valueColor}>{values[i]}</DataValue>)

    //Gradients
    function linearGradient(colors:any, id:string) {
      const linearConfig:any = {
        vertical: {
          x2: 0,
          y1: 0,
          y2: 1
        },
        horizontal: {
          x2: 1,
          y1: 0,
          y2: 0
        },
        diagonalUp: {
          x2: 1,
          y1: 1,
          y2: 0
        },
        diagonalDown: {
          x2: 1,
          y1: 0,
          y2: 1
        }
      }
      const c = linearConfig[colors.direction];
      return (
        <linearGradient x1="0" y1={c.y1} x2={c.x2} y2={c.y2} id={id}>
          {colors.colors.map((item:any,i:number) => <stop key={`${id}_${i}`} stopColor={item.color} offset={`${item.offset}%`}></stop>)}
        </linearGradient>
      )
    }

    const areaGradient = areaColor && ((areaColor.constructor === Object) && linearGradient(areaColor, 'areaGradient'));
    const lineGradient = lineColor && ((lineColor.constructor === Object) && linearGradient(lineColor, 'lineGradient'));


    //Area chart
    const closeArea = `${xRight} ${yBottom} ${paddingLeft} ${yBottom}`;
    const areaLine = lineCurved ? `${curve} L ${closeArea}` : `M ${points} ${closeArea}`;
    const area = areaColor && <path fill={areaColor ? (areaColor.constructor === Object ? 'url(#areaGradient)' : areaColor) : 'none'} d={areaLine} />;

    return (
      <div>
        <svg width={responsive ? "100%" : width} height={responsive ? "100%" : height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            {areaGradient}
            {lineGradient}
            {lineBlur && guassianBlur(lineBlur, 'lineBlur')}
            {lineShadow && guassianBlur(lineShadow.blur, 'lineShadow')}
          </defs>
          <g>
            {backgroundColor && background}
            {showYGrid && <YGrid color={yGridColor}>{yGridLines}</YGrid>}
            {showXGrid && <XGrid color={xGridColor}>{xGridLines}</XGrid>}
            {showYAxis && <Axis strokeWidth={yAxisWidth} color={yAxisColor} x1={paddingLeft} x2={paddingLeft} y1={paddingTop} y2={yBottom} />}
            {showXAxis && <Axis strokeWidth={xAxisWidth} color={xAxisColor} x1={paddingLeft} x2={xRight} y1={yBottom} y2={yBottom} />}
          </g>
          {area}
          <XLabels color={xLabelColor}>
            {showXLables && xLabels}
            <AxisLabel color={xNameColor} x={(xAxisLength/2)+paddingLeft} y={yBottom + 50}>{xName}</AxisLabel>
          </XLabels>
          <YLabels color={yLabelColor}>
            {showYLables && yLabels}
            <AxisLabel color={yNameColor} x={paddingLeft-40} y={(yAxisLength/2)+paddingTop}>{yName}</AxisLabel>
          </YLabels>
          {lineShadow && displayLineShadow()}
          {hideLine || lineChart}
          {dots && circles}
          {showValues && dataValues}
        </svg>
      </div>
    );
  }
}

export default LineChart;
