import React from "react";
import { css } from "glamor";
import Icon from '@fortawesome/react-fontawesome';

const styles = {
  container: visible => css({
    position: 'fixed',
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    transform: `translateY(${visible ? 0 : 100}%)`,
    opacity: visible ? 1 : 0,
    transition: 'transform 0.4s, opacity 0.4s'
  }),
  content: css({
    border: '1px solid purple',
    borderRadius: '8px',
    width: '300px',
    height: '200px'
  }),
  title: css({
    background: 'linear-gradient(to right, #16bffd, #cb3066)',
    display: 'flex',
    justifyContent: 'space-between',
    height: '35px',
    padding: '8px',
    boxSizing: 'border-box',
    '& h3': {
      margin: 0
      
    }
  })
}

const Modal = ({ visible, children, title }) => (
  <div {...styles.container(visible)}>
     <div {...styles.content}>
      <header {...styles.title}>
        <h3>{title}</h3>
        <Icon icon="times"/>
      </header>
      {children}
    </div>
  </div>
)

export default Modal;