import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from "mobx-react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


import Todos from 'src/components/Todos';
import List from 'src/components/List';

import store from 'src/models/store';
import {authService} from 'src/services/firebase';

import MenuTrigger from './MenuTrigger';
import styles from './styles';



class SignInScreen extends React.Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={authService.uiConfig} firebaseAuth={authService}/>
      </div>
    );
  }
}

class App extends Component {
  state = {
    isOpen: false,
    isLoading: false
  };

  componentDidMount(){
    
    authService.onAuthStateChanged(user => {
      if (user) {
        console.log('User', user)
      } else {
        console.log('not log')
      }
    })
  }

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
        <Switch>
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
          <Route 
            exact
            path='/auth'
            component={SignInScreen}
          />
          </Switch>
        </section>
        <div id="foobar">plpo</div>
        <footer {...styles.footer}>FOOTER</footer>
      </Fragment>
    );
  }
}

export default observer(App);
