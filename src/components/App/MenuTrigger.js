import React from 'react';
import { css } from 'glamor';

const style = isOpen =>
  css({
    fontSize: '1rem',
    position: 'relative',
    display: 'inline-block',
    width: '2em',
    height: '2em',
    cursor: 'pointer',
    margin: '0 15px',
    '& span': {
      position: 'absolute',
      top: '50%',
      left: '0',
      display: 'block',
      width: '100%',
      height: '0.2em',
      marginTop: '-0.1em',
      backgroundColor: '#fff',
      userSelect: 'none',
      transition: 'background-color 0.3s',
      '&:after, &:before': {
        position: 'absolute',
        left: '0',
        width: '100%',
        height: '100%',
        background: '#fff',
        content: '""',
        transition: 'transform 0.3s'
      },
      '&:before': {
        transform: isOpen
          ? 'translateY(-0.35em) translateX(-0.65em) rotate(-45deg) scaleX(0.6)'
          : 'translateY(-0.5em)'
      },
      '&:after': {
        transform: isOpen
          ? 'translateY(0.35em) translateX(-0.65em) rotate(45deg) scaleX(0.6)'
          : 'translateY(0.5em)'
      }
    }
  });

const MenuTrigger = ({ isOpen, onToggle }) => (
  <div {...style(isOpen)} onClick={onToggle} role="button">
    <span />
  </div>
);

export default MenuTrigger;
