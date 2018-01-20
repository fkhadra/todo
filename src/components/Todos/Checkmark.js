import React from 'react';
import { css, keyframes } from 'glamor';

const animations = {
  dash: keyframes({
    '0%': {
      strokeDashoffset: '1000'
    },
    '100%': {
      strokeDashoffset: '0'
    }
  }),
  check: keyframes({
    '0%': {
      strokeDashoffset: '-100'
    },
    '100%': {
      strokeDashoffset: '900'
    }
  }),
  path: {
    strokeDasharray: '1000',
    strokeDashoffset: '0'
  },
};

const styles = {
  circle: checked => checked ? css(animations.path, {
    stroke: "#73AF55" ,
    animation: `${animations.dash} 0.9s ease-in-out`
  }) : css(animations.path, {
    stroke: "#ffffff",
    animation: `${animations.dash} 0.9s ease-in-out`
  }) ,
  check: css(animations.path, {
    strokeDashoffset: -100,
    animation: `${animations.check} 0.9s 0.35s ease-in-out forwards`
  })
};

const Checkmark = ({ checked }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 130.2 130.2"
    width="20"
  >
    <circle
      {...styles.circle(checked)}
      fill="none"
      strokeWidth="6"
      strokeMiterlimit="10"
      cx="65.1"
      cy="65.1"
      r="62.1"
    />
    {checked && (
      <polyline
        {...styles.check}
        fill="none"
        stroke="#73AF55"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      />
    )}
  </svg>
);

export default Checkmark;
