import React, { Fragment } from 'react';
import { css } from 'glamor';

import logo from 'src/assets/logo.svg';
import { withTransition } from 'src/components/Misc';


const styles = {
  common: {
    position: 'fixed',
    top: 0,
    width: '51%',
    height: '100%',
    transition: 'transform 1s',
    zIndex: 10
  },
  rotateAnimation: css.keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  }),
  left: isLoading =>
    css({
      ...styles.common,
      left: 0,
      transform: isLoading ? 'translateX(0)' : 'translateX(-100%)',
      background: 'linear-gradient(to right, #000000, #434343)'
    }),
  right: isLoading =>
    css({
      ...styles.common,
      right: 0,
      transform: isLoading ? 'translateX(0)' : 'translateX(100%)',
      background: 'linear-gradient(to right, #434343, #000000)'
    }),
  logo: isLoading =>
    css({
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 11,
      opacity: isLoading ? 1 : 0,
      transition: 'opacity 0.6s',
      '& img': {
        width: '200px',
        animation: `${styles.rotateAnimation} 6s linear infinite`
      }
    })
};

const Panel = withTransition(({ isLoading, side, unmount }) => (
  <div {...styles[side](isLoading)} onTransitionEnd={unmount} />
));
const Logo = withTransition(({ isLoading, unmount }) => (
  <div {...styles.logo(isLoading)} onTransitionEnd={unmount}>
    <img src={logo} alt="logo" />
  </div>
));

const LoadingScreen = ({ isLoading, children }) => (
  <Fragment>
    <Panel isLoading={isLoading} side="left" />
    <Panel isLoading={isLoading} side="right" />
    <Logo isLoading={isLoading} />
    {children}
  </Fragment>
)

export default LoadingScreen;
