import React from 'react';
import styled, { keyframes } from 'styled-components';

const Circle = styled.circle<{ checked: boolean }>`
  fill: none;
  stroke-width: 6;
  stroke-miterlimit: 10;
  transition: stroke-dashoffset 0.35s ease-in-out, stroke 0.35s;
  stroke: ${props => (props.checked ? '#73AF55' : '#ffffff')};
  stroke-dashoffset: ${props => (props.checked ? 0 : 1000)};
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
`;

const Line = styled.polyline<{ checked: boolean }>`
  fill: none;
  stroke-dasharray: 1000;
  stroke-dashoffset: ${props => (props.checked ? 900 : -100)};
  transition: stroke-dashoffset 0.35s ease-in-out, stroke 0.35s;
  stroke: ${props => (props.checked ? '#73AF55' : '#ffffff')};
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
    <Line checked={checked} points="100.2,40.2 51.5,88.8 29.8,67.5" />
  </svg>
);
