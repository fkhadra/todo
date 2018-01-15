import React, { Component, Fragment } from 'react';
import { css } from 'glamor';

import TodoList from 'src/components/TodoList';
import TodoStore from 'src/models/TodoStore';
import MenuTrigger from './MenuTrigger';

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
  })
};


export default class App extends Component {
  state = {
    showSidebar: false
  };

  toggleSidebar = () => this.setState({ showSidebar: !this.state.showSidebar });

  render() {
    const { showSidebar } = this.state;
    return (
      <Fragment>
        <header {...styles.header}>
          <nav>
            <MenuTrigger isOpen={showSidebar} onToggle={this.toggleSidebar} />
            <span>Navigation</span>
          </nav>
        </header>
        <aside {...styles.sidebar(showSidebar)}>
          <nav>
            <ul>
              <li>link1</li>
              <li>link2</li>
            </ul>
          </nav>
        </aside>
        <section {...styles.main}>
          <TodoList 
            title="Fucking tofos" 
            todoStore={TodoStore}
          />
        </section>
        <footer {...styles.footer}>FOOTER</footer>
      </Fragment>
    );
  }
}
