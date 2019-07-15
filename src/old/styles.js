import { css, keyframes } from 'glamor';

const animations = {
  slideInLeft: keyframes({
    from: {
      transform: 'translate3d(-100%, 0, 0)',
      opacity: 0
    },
    to: {
      opacity: 1,
      transform: 'none'
    }
  }),
  zoomOut: keyframes({
    from: {
      opacity: 1
    },

    '50%': {
      opacity: 0,
      transform: 'scale3d(.3, .3, .3)'
    },

    to: {
      opacity: 0
    }
  })
};

const styles = {
  container: css({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: 'auto',
    '& header': {
      display: 'flex',
      justifyContent: 'center'
    },
    '& main': {
      flex: 1
    }
  }),
  menu: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    padding: '16px 0',
    '& img': {
      width: '70px',
      borderRadius: '50%',
      verticalAlign: 'middle'
    },
    '& span': {
      margin: '0 12px'
    },
    '& a': {
      padding: '8px',
      cursor: 'pointer'
    }
  }),
  list: css({
    listStyle: 'none',
    overflowY: 'scroll',
    padding: 0,
    '& li': {
      padding: '5px 0'
    }
  }),
  enter: css({
    animationFillMode: 'both',
    animationDuration: '0.75s',
    animationName: animations.slideInLeft
  }),
  exit: height =>
    css({
      animationFillMode: 'both',
      animationDuration: '0.75s',
      animationName: animations.zoomOut,
      transition: 'max-height 0.75s, opacity 0.75s, padding 0.75s',
      maxHeight: height,
      overflow: 'hidden'
    }),
  onExit: node => {
    node.classList.add(styles.exit(`${node.offsetHeight}px`));
    requestAnimationFrame(() => {
      setTimeout(() => {
        node.style.maxHeight = 0;
        node.style.opacity = 0;
        node.style.padding = 0;
      }, 0);
    });
  },
  filter: css({
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    '& figure': {
      margin: 0,
      padding: '0.8rem',
      transition: 'transform 0.4s'
    }
  }),
  activeFilter: position =>
    css({
      position: 'absolute',
      height: '3px',
      width: '50px',
      bottom: 0,
      background: '#ffffff',
      transform: `translateX(${position}px)`,
      transition: 'transform 0.4s'
    })
};

export default styles;
