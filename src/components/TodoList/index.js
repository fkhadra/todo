import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { TransitionGroup, Transition } from 'react-transition-group';
import Modal from './Modal';

import styles from './styles';
import Todo from './Todo';
import TodoInput from './TodoInput';
import TodoTitle from './TodoTitle';

import listIcon from 'src/assets/list.svg';
import scheduleIcon from 'src/assets/schedule.svg';
import checkIcon from 'src/assets/check.svg';

import ShareForm from './ShareForm';

class TodoList extends Component {
  state = {
    filter: 'ALL',
    displayShareForm: false
  };

  applyFilter = {
    ALL: todo => todo,
    ACTIVE: todo => !todo.done,
    DONE: todo => todo.done
  };

  positionRatio = 0;

  componentDidMount() {
    this.loadTodos(this.props.listId);
  }

  componentWillReceiveProps({ listId }) {
    this.loadTodos(listId);
  }

  loadTodos(listId) {
    this.props.store.fetchTodoList(listId);
  }

  toggleShareForm = () =>
    this.setState({
      displayShareForm: !this.state.displayShareForm
    });

  filter = e => {
    const { width } = this.filterRef.getBoundingClientRect();
    const ratio = width / 3;
    const currentPosition = parseInt(e.currentTarget.dataset.idx, 10);

    this.positionRatio = (ratio + ratio / 2 - 25) * currentPosition;
    this.setState({ filter: e.currentTarget.dataset.filter });
  };

  renderTodos() {
    const { toggleDone, updateTodo, removeTodo, todoList } = this.props.store;
    const { filter } = this.state;

    return Array.from(todoList.values())
      .filter(this.applyFilter[filter])
      .map(todo => (
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
    const { store } = this.props;

    return (
      <section>
        <TodoTitle store={store} toggleShareForm={this.toggleShareForm} />
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
        </section>
        <div>
          <TransitionGroup {...styles.list} component="ul">
            {this.renderTodos()}
          </TransitionGroup>
        </div>

        <Modal
          visible={this.state.displayShareForm}
          title="Share with friends"
          close={this.toggleShareForm}
        >
          <ShareForm store={store}/>
        </Modal>
      </section>
    );
  }
}

export default observer(TodoList);
