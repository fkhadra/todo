import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { observer } from "mobx-react";

import Todos from 'src/components/Todos';
import List from 'src/components/List';

import store from 'src/models/store';

import MenuTrigger from './MenuTrigger';
import styles from './styles';

class App extends Component {
  state = {
    isOpen: false,
    isLoading: false
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
          <List listStore={store.list} toggleSidebar={this.toggleSidebar} />
        </aside>
        <section {...styles.main}>
          <Route
            exact
            path="/list/:id"
            render={({ match }) => (
              <Todos
                store={store}
                activeListId={match.params.id}
              />
            )}
          />
        </section>
        <footer {...styles.footer}>FOOTER</footer>
      </Fragment>
    );
  }
}

export default observer(App);
