import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg<{ checked: boolean }>`
  width: 20px;
  &:hover {
    cursor: pointer;
  }
  & circle {
    fill: none;
    stroke-width: 6;
    stroke-miterlimit: 10;
    transition: stroke-dashoffset 0.35s ease-in-out, stroke 0.35s;
    stroke: ${props => (props.checked ? '#73AF55' : '#ffffff')};
    stroke-dashoffset: ${props => (props.checked ? 0 : 1000)};
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
  & polyline {
    fill: none;
    stroke-dasharray: 1000;
    stroke-dashoffset: ${props => (props.checked ? 900 : -100)};
    transition: stroke-dashoffset 0.35s ease-in-out, stroke 0.35s;
    stroke: ${props => (props.checked ? '#73AF55' : '#ffffff')};
    stroke-width: 6;
    stroke-linecap: round;
    stroke-miterlimit: 10;
  }
`;

export interface CheckmarkProps {
  checked: boolean;
}

export const Checkmark: React.FC<CheckmarkProps> = ({ checked }) => (
  <Svg viewBox="0 0 130.2 130.2" checked={checked}>
    <circle cx="65.1" cy="65.1" r="62.1" />
    <polyline points="100.2,40.2 51.5,88.8 29.8,67.5" />
  </Svg>
);
