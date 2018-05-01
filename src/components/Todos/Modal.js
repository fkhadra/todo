import React from 'react';
import { css } from 'glamor';
import Icon from '@fortawesome/react-fontawesome';

const styles = {
  container: visible =>
    css({
      zIndex: 999,
      position: 'fixed',
      height: '100%',
      width: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      pointerEvents: visible ? 'initial' : 'none',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s'
    }),
  body: visible =>
    css({
      zIndex: 1000,
      borderRadius: '4px',
      width: '300px',
      height: '200px',
      transform: visible ? 'scale3d(1,1,1)' : 'scale3d(0.8,0.8,1)',
      transition: 'transform 0.3s',
      background: '#333'
    }),
  title: css({
    background: '#2196f3',
    display: 'flex',
    justifyContent: 'space-between',
    height: '35px',
    padding: '8px',
    boxSizing: 'border-box',
    '& h3': {
      margin: 0
    }
  }),
  content: css({
    padding: '10px'
  })
};

const Modal = ({ visible, children, title, close }) => (
  <div {...styles.container(visible)} onClick={close}>
    <div {...styles.body(visible)} onClick={e => e.stopPropagation()}>
      <header {...styles.title}>
        <h3>{title}</h3>
        <Icon icon="times" onClick={close} />
      </header>
      <div {...styles.content}>{children}</div>
    </div>
  </div>
);

export default Modal;
