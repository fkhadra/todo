import React from 'react';
import styled, { keyframes } from 'styled-components';

const animations = {
  dash: keyframes`
    0%: {
      stroke-dashoffset: 1000;
    },
    100%: {
      stroke-dashoffset: '0'
    }
  `,
  check: keyframes`
    0%: {
      stroke-dashoffset: -100
    },
    100%: {
      stroke-dashoffset: 900
    }
  `
};

const Circle = styled.circle<{ checked: boolean }>`
  fill: none;
  stroke-width: 6;
  stroke-miterlimit: 10;
  stroke: ${props => (props.checked ? '#73AF55' : '#ffffff')};
  animation: ${animations.dash} 0.9s ease-in-out;
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
`;

const Line = styled.polyline`
  fill: none;
  stroke-dasharray: 1000;
  stroke-dashoffset: -100;
  animation: ${animations.check} 0.9s 0.35s ease-in-out forwards;
  stroke: #73af55;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-miterlimit: 10;
`;

export interface CheckmarkProps {
  checked: boolean;
}

export const Checkmark: React.FC<CheckmarkProps> = ({ checked }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 130.2 130.2"
    width="20"
  >
    <Circle checked={checked} cx="65.1" cy="65.1" r="62.1" />
    {checked && <Line points="100.2,40.2 51.5,88.8 29.8,67.5 " />}
  </svg>
);

