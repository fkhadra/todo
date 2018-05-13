import { css } from "glamor";

export default {
  list: (isVisible) => css({
    transition: 'opacity 0.3s, transform 0.3s',
    opacity: isVisible ? 1 : 0,
    overflow: 'hidden',
    listStyle: 'none',
    padding: 0,
    '& li': {
      textAlign: 'left'
    },
    '& a': {
      padding: '8px',
      height: '30px',
      lineHeight: '30px',
      display: 'flex',
      '&.active': {
        background: '#cb3066'
      }
    },
    '& span': {
      marginLeft: '8px'
    },
    '& img': {
      width: '30px'
    }
  })
};