import React, { Component, Fragment } from 'react';

import Store from 'src/models/Store';
import { authService } from 'src/services/firebase';
import Login from './Login';
import Home from './Home';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.unregisterAuthObserver = authService.onAuthStateChanged(user => {
      this.setState({
        user: user || null
      });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { user } = this.state;

    return (
      <Fragment>
        {this.state.user ? (
          <Home store={new Store(user)} />
        ) : (
          <Login authService={authService} />
        )}
      </Fragment>
    );
  }
}

export default App;
