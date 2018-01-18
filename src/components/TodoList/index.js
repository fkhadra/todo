import React, { Component } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';

import styles from './styles';
import Todo from './Todo';
import TodoInput from './TodoInput';

import listIcon from 'src/assets/list.svg';
import scheduleIcon from 'src/assets/schedule.svg';
import checkIcon from 'src/assets/check.svg';

export default class TodoList extends Component {
  state = {
    todos: [],
    filter: 'ALL'
  };

  applyFilter = {
    ALL: todo => todo,
    ACTIVE: todo => !todo.done,
    DONE: todo => todo.done
  };

  positionRatio = null;

  componentDidMount() {
    this.props.todoStore.onChange(todos => {
      this.setState({ todos: todos });
    });
    window.addEventListener('resize', this.computeRatio)
    this.computeRatio();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeRatio);
  }

  computeRatio= () => {
    const { width } = this.filterRef.getBoundingClientRect();
    this.positionRatio = width / 3 + 8 * 3;
  }

  filter = e => this.setState({ filter: e.currentTarget.dataset.filter });

  renderTodos() {
    const { toggleDone, updateTodo, removeTodo } = this.props.todoStore;
    const { todos, filter } = this.state;

    return todos.filter(this.applyFilter[filter]).map(todo => (
      <Transition
        key={todo.id}
        timeout={750}
        onEnter={node => node.classList.add(styles.enter)}
        onEntered={node => node.classList.remove(styles.enter)}
        onExit={styles.onExit}
      >
        <li>
          <Todo
            todo={todo}
            toggleDone={toggleDone}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
        </li>
      </Transition>
    ));
  }

  getActivePosition() {
    switch (this.state.filter) {
      default:
      case 'ALL':
        return 0;
      case 'ACTIVE':
        return this.positionRatio;
      case 'DONE':
        return this.positionRatio * 2;
    }
  }

  render() {
    const { title, todoStore } = this.props;
    const { percentage, number } = todoStore.getDone();

    return (
      <section>
        <h2>{title}</h2>
        <TodoInput addTodo={todoStore.addTodo} />
        <section {...styles.status}>
          <header>
            <div {...styles.filter} ref={ref => (this.filterRef = ref)}>
              <figure onClick={this.filter} data-filter="ALL">
                <img src={listIcon} alt="list all" />
                {/* <span>{`(${this.state.todos.length || 0})`}</span> */}
              </figure>
              <figure onClick={this.filter} data-filter="ACTIVE">
                <img src={scheduleIcon} alt="todo" />
                {/* <span>{`(${number})`}</span> */}
              </figure>
              <figure onClick={this.filter} data-filter="DONE">
                <img src={checkIcon} alt="done" />
                {/* <span>{`(${number})`}</span> */}
              </figure>
              <div {...styles.activeFilter(this.getActivePosition())} />
            </div>
          </header>
          {/* <div>
            <div {...styles.progressBar} style={{ width: `${percentage}%` }} />
          </div> */}
        </section>
        <div>
          <TransitionGroup {...styles.list} component="ul">
            {this.renderTodos()}
          </TransitionGroup>
        </div>
      </section>
    );
  }
}
