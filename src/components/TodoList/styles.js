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
      node.style.maxHeight = 0;
      node.style.opacity = 0;
      node.style.padding = 0;
    });
  },
  status: css({
    '& header': {
      textAlign: 'left'
    }
  }),
  progressBar: css({
    height: '4px',
    background:
      'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)',
    width: 0,
    transition: 'width 0.5s'
  }),
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
