import React, { Fragment } from 'react';
import { css, keyframes } from 'glamor';

const common = {
  position: 'fixed',
  top: 0,
  width: '50%',
  height: '100%',
  transition: 'transform 1s',
  zIndex: 10
};

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

const styles = {
  left: isLoading =>
    css({
      ...common,
      left: 0,
      transform: isLoading ? 'translateX(0)' : 'translateX(-100%)',
      background: 'linear-gradient(to right, #4568dc, #7868c9)'
    }),
  right: isLoading =>
    css({
      ...common,
      right: 0,
      transform: isLoading ? 'translateX(0)' : 'translateX(100%)',
      background: 'linear-gradient(to right, #7868c9, #b06ab3)'
    }),
  spinner: css({
    width: '40px',
    height: '40px',
    backgroundColor: '#fff',
    zIndex: 11,
    margin: '100px auto',
    animation: `${spin} 1.2s infinite ease-in-out`
  })
};

export default ({ isLoading, children }) => (
  <Fragment>
    <div {...styles.left(isLoading)} />
    <div {...styles.right(isLoading)} />
    {/* <div {...styles.spinner} /> */}
    {children}
  </Fragment>
);
