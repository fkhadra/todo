import React, { Component, Fragment } from 'react';

import TodoList from 'src/components/TodoList';
import TodoStore from 'src/models/TodoStore';
import listStore from 'src/models/ListStore';

import MenuTrigger from './MenuTrigger';
import styles from './styles';

export default class App extends Component {
  state = {
    collection: [],
    isOpen: false
  };

  componentDidMount() {
    listStore.onChange(collection => this.setState({ collection }));
  }

  toggleSidebar = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen, collection } = this.state;
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
              {collection.map(item => <li key={item.id}>{item.label}</li>)}
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
