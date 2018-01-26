import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Todos from 'src/components/Todos';
import List from 'src/components/List';

import todoStore from 'src/models/TodoStore';
import listStore from 'src/models/ListStore';

import MenuTrigger from './MenuTrigger';
import styles from './styles';

class Title extends Component {
  state = {
    id: null,
    label: null
  };

  componentDidMount(){
    console.log('mount')
    this.props.listStore.find(this.props.id).then(list => this.setState({ ...list }));
  }

  render(){
    return <h2>{this.state.label || '' }</h2>
  }
}

export default class App extends Component {
  state = {
    isOpen: false
  };

  toggleSidebar = () => this.setState({ isOpen: !this.state.isOpen });

  loadTodos= ({ match }) => {
    todoStore.fetchTodos(match.params.id);
   // listStore.find(match.params.id).then(list => this.setState({ activeList: list }))

    return (
      <Fragment>
        <Title listStore={listStore} id={match.params.id} />
        {/* <h2>{this.state.activeList && this.state.activeList.label}</h2> */}
        <Todos todoStore={todoStore} />
      </Fragment>
    );
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
          <List listStore={listStore} toggleSidebar={this.toggleSidebar} />
        </aside>
        <section {...styles.main}>
          <Route exact path="/list/:id" component={this.loadTodos} />
        </section>
        <footer {...styles.footer}>FOOTER</footer>
      </Fragment>
    );
  }
}
