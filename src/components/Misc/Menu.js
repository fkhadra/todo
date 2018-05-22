import React, { Component } from 'react';
import { css } from 'glamor';

import ellispsisIcon from 'src/assets/ellipsis.svg';

export default class Menu extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    document.addEventListener('click', this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }

  closeMenu = () => {
    this.state.isOpen && this.setState({ isOpen: false });
  };

  toggle = e => {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ isOpen: !this.state.isOpen });
  };

  stopPropagation = e => e.nativeEvent.stopImmediatePropagation();

  render() {
    return (
      <div
        {...css({
          margin: 'auto 10px',
          position: 'relative',
          display: 'inline-block'
        })}
      >
        <img src={ellispsisIcon} alt="Menu" onClick={this.toggle} />
        <div
          {...css({
            zIndex: 1,
            position: 'absolute',
            display: 'flex',
            opacity: this.state.isOpen ? 1 : 0,
            pointerEvents: this.state.isOpen ? 'initial' : 'none',
            transition: 'opacity 0.275s',
            flexDirection: 'column',
            alignItems: 'self-start',
            width: '230px',
            top: '40px',
            right: '-66px',
            height: '170px',
            background: '#24262b',
            color: '#fff',
            borderRadius: '.4rem',
            boxShadow:
              '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            '&:before': {
              content: "''",
              height: '0px',
              position: 'absolute',
              width: '0px',
              border: '13px solid transparent',
              borderBottomColor: '#24262b',
              right: '56px',
              top: '-20px'
            }
          })}
          onClick={this.stopPropagation}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
