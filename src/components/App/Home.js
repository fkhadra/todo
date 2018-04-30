import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { observer } from 'mobx-react';

import Todos from 'src/components/Todos';
import List from 'src/components/List';

// import store from 'src/models/store';

import MenuTrigger from './MenuTrigger';
import styles from './styles';

class Home extends Component {
  state = {
    isOpen: false,
    isLoading: false
  };

  toggleSidebar = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    const { store } = this.props;

    return (
      <Router>
        <Fragment>
          <header {...styles.header}>
            <nav>
              <MenuTrigger isOpen={isOpen} onToggle={this.toggleSidebar} />
              <span>Navigation</span>
              <button onClick={store.signOut}>Sign Out</button>
            </nav>
          </header>
          <aside {...styles.sidebar(isOpen)}>
            <Route
              render={props => (
                <List
                  store={store}
                  toggleSidebar={this.toggleSidebar}
                  {...props}
                />
              )}
            />
          </aside>
          <section {...styles.main}>
            <Route
              exact
              path="/list/:id"
              render={({ match }) => (
                <Todos store={store} listId={match.params.id} />
              )}
            />
          </section>
          <footer {...styles.footer}>FOOTER</footer>
        </Fragment>
      </Router>
    );
  }
}

export default observer(Home);
