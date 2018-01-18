import React, { Component, Fragment } from 'react';

import TodoList from 'src/components/TodoList';
import TodoStore from 'src/models/TodoStore';

import MenuTrigger from './MenuTrigger';
import styles from './styles';

export default class App extends Component {
  state = {
    isOpen: false
  };

  toggleSidebar = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>
        <header {...styles.header}>
          <nav>
            <MenuTrigger isOpen={isOpen} onToggle={this.toggleSidebar} />
            <span>Navigation</span>
          </nav>
        </header>
        <aside {...styles.sidebar(isOpen)}>
          <nav>
            <ul>
              <li>link1</li>
              <li>link2</li>
            </ul>
          </nav>
        </aside>
        <section {...styles.main}>
          <TodoList title="Fucking tofos" todoStore={TodoStore} />
        </section>
        <footer {...styles.footer}>FOOTER</footer>
      </Fragment>
    );
  }
}
