import React from "react";
import {
  AxisLabel,
  DataValue,
  XLabels,
  YLabels,
  Axis,
  DataDot,
  XGrid,
  YGrid,
  Line,
  LineShadow,
  AreaPath
} from './styles';


export class LineChart extends React.Component {

  curve(points) {
    const line = (pointA, pointB) => {
      const lengthX = pointB[0] - pointA[0]
      const lengthY = pointB[1] - pointA[1]
      return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
      }
    }

    const controlPoint = (current, previous, next, reverse) => {
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

    const bezierCurve = (point, i, a) => {
      const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point, false);
      const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
      return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
    }

    const d = points.reduce((acc, point, i, a) => i === 0
      ? `M ${point[0]},${point[1]}`
      : `${acc} ${bezierCurve(point, i, a)}`
    , '');
    return d;
  }


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

    const values = data.map((item) => item.value);

    //Axis Length
    const width = this.props.width || 400;
    const height = this.props.height || 200;
    const yMin = this.props.yMin ? this.props.yMin : 0;
    const yMax = this.props.yMax ? this.props.yMax : Math.max(...values);
    const xLeft = paddingLeft || 0;
    const xAxisLength = width-xLeft-(paddingRight || 0);
    const xRight = xLeft+xAxisLength;
    const yTop = paddingTop || 0;
    const yAxisLength = height-yTop-(paddingBottom || 0);
    const yBottom = yAxisLength+yTop;



    //Axis Scaling
    const numberOfPoints = data.length;
    const yScale = yAxisLength/(yMax-yMin);
    const xScale = xAxisLength/(numberOfPoints - 1);

    //X Coordinates
    const xValues = [xLeft];
    let horizontalValue = xLeft;
    for (let i=1; i<numberOfPoints; i++) {
      horizontalValue = horizontalValue + xScale;
      xValues.push(horizontalValue);
    }

    //Y Coordinates
    function yCoord(value) {
      return (yAxisLength-(value*yScale))+(yScale*yMin)+yTop;
    }

    const yLabelValues = [yMin];
    let verticalValue = yMin;
    for(let i=0; i<((yMax-yMin)/yIncrement); i++) {
      verticalValue = verticalValue + yIncrement;
      if (verticalValue <= yMax) {
        yLabelValues.push(verticalValue);
      }
    }
    const yValues = values.map((item) => yCoord(item));

    //Coordinates
    const coords = yValues.map((item,i) => [xValues[i],item]);

    //Line Chart
    const points = coords.map((item) => `${item[0]} ${item[1]}`).join(" ");
    const circles = coords.map((item, i) => <DataDot key={`circle_${i}`} cx={item[0]} cy={item[1]} r="5" color={dotColor} borderColor={dotBorderColor}></DataDot>);

    function guassianBlur(blur,id) {
      return (
        <filter id={id} x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
        </filter>
      );
    }

    const displayLineShadow = () => {
      const {xOffset, yOffset, spread, color} = lineShadow;
      const shadowCoords = coords.map((item) => [item[0]+xOffset,item[1]+yOffset]);
      const shadowPoints = shadowCoords.map((item) => `${item[0]+xOffset} ${item[1]+yOffset}`).join(" ");
      const shadowLine = lineCurved ? this.curve(shadowCoords) : `M ${shadowPoints}`;
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
     d={lineCurved ? this.curve(coords) : `M ${points}`}
     strokeLinecap={lineRoundedEnds ? 'round' : 'inherit'}
     filter={lineBlur && 'url(#lineBlur)'}
     animation={animation}
    />);

    //Axis Labels
    const xLabels = data.map((item, i) => <text key={`xLabel_${i}`} x={xValues[i]} y={yBottom+20}>{item.label}</text>);
    const yLabels = yLabelValues.map((item, i) => <text key={`yLabel_${i}`} x={xLeft-10} y={yCoord(item)}>{item}</text>);

    //Grids
    const xGridLines = yLabelValues.map((item, i) => <line key={`xGridLine_${i}`} x1={xLeft} x2={xRight} y1={yCoord(item)} y2={yCoord(item)} strokeWidth={yGridWidth} />);
    xGridLines.shift();
    const yGridLines = xValues.map((item,i) => <line key={`yGridLine_${i}`} x1={item} x2={item} y1={yTop} y2={yBottom} strokeWidth={xGridWidth} />);
    yGridLines.shift();

    const background = <polyline fill={backgroundColor} points={`${xLeft} ${yTop} ${xRight} ${yTop} ${xRight} ${yBottom} ${xLeft} ${yBottom}`} />

    //Data values
    const dataValues = coords.map((item, i) => <DataValue key={`dataValue_${i}`} x={item[0]} y={item[1]-10} color={valueColor}>{values[i]}</DataValue>)

    //Gradients
    function linearGradient(colors, id) {
      const linearConfig = {
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
          {colors.colors.map((item,i) => <stop key={`${id}_${i}`} stopColor={item.color} offset={`${item.offset}%`}></stop>)}
        </linearGradient>
      )
    }

    const areaGradient = areaColor && ((areaColor.constructor === Object) && linearGradient(areaColor, 'areaGradient'));
    const lineGradient = lineColor && ((lineColor.constructor === Object) && linearGradient(lineColor, 'lineGradient'));


    //Area chart
    const closeArea = `${xRight} ${yBottom} ${xLeft} ${yBottom}`;
    const areaLine = lineCurved ? `${this.curve(coords)} L ${closeArea}` : `M ${points} ${closeArea}`;
    const area = areaColor && <AreaPath animation={animation} fill={areaColor ? (areaColor.constructor === Object ? 'url(#areaGradient)' : areaColor) : 'none'} d={areaLine} />;

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
            {showYAxis && <Axis strokeWidth={yAxisWidth} color={yAxisColor} x1={xLeft} x2={xLeft} y1={yTop} y2={yBottom} />}
            {showXAxis && <Axis strokeWidth={xAxisWidth} color={xAxisColor} x1={xLeft} x2={xRight} y1={yBottom} y2={yBottom} />}
          </g>
          {area}
          <XLabels color={xLabelColor}>
            {showXLables && xLabels}
            <AxisLabel color={xNameColor} x={(xAxisLength/2)+xLeft} y={yBottom + 50}>{xName}</AxisLabel>
          </XLabels>
          <YLabels color={yLabelColor}>
            {showYLables && yLabels}
            <AxisLabel color={yNameColor} x={xLeft-40} y={(yAxisLength/2)+yTop}>{yName}</AxisLabel>
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
