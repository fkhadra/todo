import { css } from "glamor";

export default {
  list: css({
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
        background: 'purple'
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