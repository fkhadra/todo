import React, { Component } from 'react';

import Store from 'src/models/Store';
import { authService } from 'src/services/firebase';
import TodoList from "src/components/TodoList";
import Login from './Login';
import LoadingScreen from './LoadingScreen';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
          <TodoList store={new Store(user)} />
        ) : (
            <Login authService={authService} />
          )}
          <ToastContainer />
      </LoadingScreen>
    );
  }
}

export default App;
