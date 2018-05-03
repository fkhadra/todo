import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { observer } from 'mobx-react';

import TodoList from 'src/components/TodoList';
import Sidenav from 'src/components/Sidenav';

//import MenuTrigger from './MenuTrigger';
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
              <div
                {...styles.sidebarTrigger(isOpen)}
                onClick={this.toggleSidebar}
                role="button"
              >
                <span />
              </div>
              <span>Navigation</span>
              <button onClick={store.signOut}>Sign Out</button>
            </nav>
          </header>
          <aside {...styles.sidebar(isOpen)}>
            <Route
              render={props => (
                <Sidenav
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
                <TodoList store={store} listId={match.params.id} />
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
