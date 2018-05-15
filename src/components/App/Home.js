import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';

import TodoList from 'src/components/TodoList';

//import MenuTrigger from './MenuTrigger';
import styles from './styles';
import Header from './Header';

class Home extends Component {
  state = {
    isOpen: false
  };

  toggleSidebar = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    const { store } = this.props;

    return (
      <Router>
        <Fragment>
          <Header
            isSidebarOpen={isOpen}
            user={store.user}
            toggleSidebar={this.toggleSidebar}
          />
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
