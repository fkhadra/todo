import React, { Fragment } from 'react';
import { css } from 'glamor';

import { Spinner } from 'src/components/Misc';
import logo from 'src/assets/logo.svg';

const common = {
  position: 'fixed',
  top: 0,
  width: '51%',
  height: '100%',
  transition: 'transform 1s',
  zIndex: 10
};

const a = css.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
});

const styles = {
  left: isLoading =>
    css({
      ...common,
      left: 0,
      transform: isLoading ? 'translateX(0)' : 'translateX(-100%)',
      background: 'linear-gradient(to right, #000000, #434343)'
    }),
  right: isLoading =>
    css({
      ...common,
      right: 0,
      transform: isLoading ? 'translateX(0)' : 'translateX(100%)',
      background: 'linear-gradient(to right, #434343, #000000)'
    })
};

export default class extends React.Component {
  
  handleTransitonEnd = e => {
    console.log(e.target.dataset.trans)
  };

  render(){
    const { isLoading, children } = this.props;
   
    
    return (
      <Fragment>
        {/* {isLoading ? <Spinner /> : children} */}
        <div {...styles.left(isLoading)}  data-trans="left" onTransitionEnd={this.handleTransitonEnd}/>
        <div {...styles.right(isLoading)} data-trans="right" />
        {/* <div
          {...css({
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 11,
            opacity: isLoading ? 1 : 0,
            transition: 'opacity 0.6s'
          })}
          data-trans="logo"
        >
          <img
            src={logo}
            {...css({
              width: '200px',
              animation: `${a} 6s linear infinite`,
              pointerEvents: 'none'
            })}
            alt=""
          />
        </div> */}
        {children}
      </Fragment>
    );
  }
}

