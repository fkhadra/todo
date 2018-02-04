import React, { Component } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';

import styles from './styles';
import Todo from './Todo';
import TodoInput from './TodoInput';
import TodoTitle from './TodoTitle';

import listIcon from 'src/assets/list.svg';
import scheduleIcon from 'src/assets/schedule.svg';
import checkIcon from 'src/assets/check.svg';

export default class TodoList extends Component {
  state = {
    todos: [],
    filter: 'ALL',
    list: {
      label: ''
    }
  };

  applyFilter = {
    ALL: todo => todo,
    ACTIVE: todo => !todo.done,
    DONE: todo => todo.done
  };

  positionRatio = 0;

  componentDidMount() {
    this.props.store.onChange(({ todos, list }) => {
      this.setState({ todos, list });
    });

    this.loadTodos(this.props.activeListId);
  }

  componentWillReceiveProps(nextProps) {
    const { activeListId } = nextProps;
    this.loadTodos(activeListId);
  }

  async loadTodos(activeListId) {
    this.props.store.fetchTodos(activeListId);
  }

  filter = e => {
    const { width } = this.filterRef.getBoundingClientRect();
    const ratio = width / 3;
    const currentPosition = parseInt(e.currentTarget.dataset.idx, 10);

    this.positionRatio = (ratio + ratio / 2 - 25) * currentPosition;
    this.setState({ filter: e.currentTarget.dataset.filter });
  };

  renderTodos() {
    const { toggleDone, updateTodo, removeTodo } = this.props.store;
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

  render() {
    const { title, store } = this.props;
    const { percentage, number } = store.getDone();

    return (
      <section>
        <h2>
          <input
            type="text"
            onChange={e =>
              this.setState({
                list: {
                  ...this.state.list,
                  label: e.target.value
                }
              })
            }
            value={this.state.list.label}
          />
        </h2>
        <TodoInput addTodo={store.addTodo} />
        <section {...styles.status}>
          <header>
            <div {...styles.filter} ref={ref => (this.filterRef = ref)}>
              <figure onClick={this.filter} data-filter="ALL" data-idx="0">
                <img src={listIcon} alt="list all" />
                {/* <span>{`(${this.state.todos.length || 0})`}</span> */}
              </figure>
              <figure onClick={this.filter} data-filter="ACTIVE" data-idx="1">
                <img src={scheduleIcon} alt="todo" />
                {/* <span>{`(${number})`}</span> */}
              </figure>
              <figure onClick={this.filter} data-filter="DONE" data-idx="2">
                <img src={checkIcon} alt="done" />
                {/* <span>{`(${number})`}</span> */}
              </figure>
              <div
                {...styles.activeFilter(this.positionRatio)}
                ref={r => (this.filterRef = r)}
              />
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
