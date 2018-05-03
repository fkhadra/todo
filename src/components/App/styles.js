import { css } from 'glamor';

const styles = {
  header: css({
    position: 'fixed',
    height: '64px',
    top: 0,
    left: 0,
    width: '100%',
    background: 'linear-gradient(to right, #16bffd, #cb3066)',
    zIndex: 3,
    '& nav': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      margin: '0 12px'
    }
  }),
  sidebar: isOpen =>
    css({
      width: '100%',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      pointerEvents: isOpen ? 'initial' : 'none',
      position: 'fixed',
      top: '64px',
      left: '0',
      height: '100vh',
      backgroundColor: 'rgb(31, 26, 31)',
      boxShadow: '1px 0 4px 0 rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.4s',
      zIndex: 4
    }),
  main: css({
    marginTop: '64px'
  }),
  footer: css({
    display: 'flex'
  }),
  sidebarTrigger: isOpen =>
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
    })
};

export default styles;
