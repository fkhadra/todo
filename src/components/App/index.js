import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Todos from 'src/components/Todos';
import List from 'src/components/List';

import todoStore from 'src/models/TodoStore';
import listStore from 'src/models/ListStore';

import MenuTrigger from './MenuTrigger';
import styles from './styles';

export default class App extends Component {
  state = {
    isOpen: false
  };

  toggleSidebar = () => this.setState({ isOpen: !this.state.isOpen });

  loadTodos({ match }) {
    todoStore.fetchTodos(match.params.id);
    return <Todos todoStore={todoStore} />;
  }

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
          <List listStore={listStore} toggleSidebar={this.toggleSidebar}/>
        </aside>
        <section {...styles.main}>
          <Route exact path="/list/:id" component={this.loadTodos} />
        </section>
        <footer {...styles.footer}>FOOTER</footer>
      </Fragment>
    );
  }
}
