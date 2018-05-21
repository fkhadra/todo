import React from 'react';
import { css, keyframes } from 'glamor';

const spin = keyframes({
  '0%': {
    transform: 'perspective(120px) rotateX(0deg) rotateY(0deg)'
  },
  '50%': {
    transform: 'perspective(120px) rotateX(-180.1deg) rotateY(0deg)'
  },
  '100%': {
    transform: 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)'
  }
});

const style = css({
  width: '40px',
  height: '40px',
  backgroundColor: '#fff',
  zIndex: 11,
  margin: '100px auto',
  animation: `${spin} 1.2s infinite ease-in-out`
});

export default () => <div {...style} />
