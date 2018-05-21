import React, { Fragment } from 'react';
import { css } from 'glamor';

const common = {
  position: 'fixed',
  top: 0,
  width: '50%',
  height: '100%',
  transition: 'transform 1s',
  zIndex: 10
};

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
