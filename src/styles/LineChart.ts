import styled, {keyframes} from "styled-components";

const drawLine = keyframes`
  from {
    stroke-dashoffset: 1500;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AxisLabel = styled<any,any>('text')`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  fill: ${props => props.color ? props.color : '#000'};
`;

export const DataValue = styled<any,any>('text')`
  font-size: 10px;
  fill: ${props => props.color ? props.color : '#000'};
  text-anchor: middle;
`;

export const XLabels = styled<any,any>('g')`
  fill: ${props => props.color ? props.color : '#000'};
  text-anchor: right;
  font-size: 13px;
`

export const YLabels = styled<any,any>('g')`
  fill: ${props => props.color ? props.color : '#000'};
  text-anchor: end;
  font-size: 13px;
`

export const Axis = styled<any,any>('line')`
  stroke: ${props => props.color ? props.color : '#000'};
  stroke-dasharray: 0;
`

export const DataDot = styled<any,any>('circle')`
  stroke: ${props => props.borderColor ? props.borderColor : (props.color ? props.color : '#000')};
  fill: ${props => props.color ? props.color : '#000'};
  stroke-width: 2;
`;

export const XGrid = styled<any,any>('g')`
  stroke: ${props => props.color ? props.color : '#ccc'};
  stroke-dasharray: 0;
  stroke-width: 1;
`

export const YGrid = styled<any,any>('g')`
  stroke: ${props => props.color ? props.color : '#ccc'};
  stroke-dasharray: 0;
  stroke-width: 1;
`

export const Line = styled<any,any>('path')`
  ${({animation}) => {
    const draw = animation && (`
      stroke-dasharray: 1500;
      stroke-dashoffset: 1500;
      animation: ${drawLine} 3s forwards 1;
    `);
    return draw;
  }}
`;

export const LineShadow = styled<any,any>('path')`
  ${({animation}) => {
    const draw = animation && (`
      stroke-dasharray: 1500;
      stroke-dashoffset: 1500;
      animation: ${drawLine} 3s forwards 1;
    `);
    return draw;
  }}
`;

export const AreaPath = styled<any,any>('path')`
  ${({animation}) => {
    const fadeArea = animation && (`
      opacity: 0;
      animation: ${fade} 2s forwards 1;
      animation-delay: 1s;
    `);
    return fadeArea;
  }}
`;
