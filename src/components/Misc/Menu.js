import React, { Component } from "react";
import { css } from "glamor";

import ellispsisIcon from "src/assets/ellipsis.svg";

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
    this.state.isOpen && this.setState({ isOpen: false })
  };


  toggle = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div {...css({ margin: 'auto 0 auto auto', position: 'relative', display: 'inline-block' })}>
        <img
          src={ellispsisIcon}
          alt="Menu"
          onClick={this.toggle}
        />
        <div
          {...css({
            zIndex: 1,
            position: 'absolute',
            display: this.state.isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'self-start',
            width: '175px',
            top: '40px',
            right: '-10px',
            height: '200px',
            background: '#fff',
            color: "#000",
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            '&:before': {
              content: "''",
              height: '0px',
              position: 'absolute',
              width: '0px',
              border: '13px solid transparent',
              borderBottomColor: '#fff',
              right: '0px',
              top: '-20px'
            }
          })}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}