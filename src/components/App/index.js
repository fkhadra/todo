import React, { Component, Fragment } from 'react';

import Store from 'src/models/Store';
import { authService } from 'src/services/firebase';
import Login from './Login';
import Home from './Home';
import LoadingScreen from './LoadingScreen';

class App extends Component {
  state = {
    user: null,
    initialLoad: true
  };

  componentDidMount() {
    this.unregisterAuthObserver = authService.onAuthStateChanged(user => {
      this.setState({
        user: user || null,
        initialLoad: false
      });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { user, initialLoad } = this.state;
    
    return (
      <LoadingScreen isLoading={initialLoad}>
        {this.state.user ? (
          <Home store={new Store(user)} />
        ) : (
          <Login authService={authService} />
        )}
      </LoadingScreen>
    );
  }
}

export default App;
