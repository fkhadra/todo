import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { TransitionGroup, Transition } from 'react-transition-group';
import { toast } from 'react-toastify';

import styles from './styles';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Footer from './Footer';

import { Spinner, Menu } from 'src/components/Misc';
import listIcon from 'src/assets/list.svg';
import scheduleIcon from 'src/assets/schedule.svg';
import checkIcon from 'src/assets/check.svg';

class TodoList extends Component {
  state = {
    filter: 'ALL',
    isLoading: true,
    showModal: false
  };

  applyFilter = {
    ALL: todo => todo,
    ACTIVE: todo => !todo.done,
    DONE: todo => todo.done
  };

  positionRatio = 0;

  async componentDidMount() {
    try {
      await this.props.store.fetchTodos();
      this.setState({ isLoading: false });
    } catch (err) {
      toast.error(`Oops something went wrong, ${err}`);
    }
  }

  filter = e => {
    const ratio = this.filterRef.offsetWidth / 3;
    const currentPosition = parseInt(e.currentTarget.dataset.idx, 10);

    this.positionRatio = (ratio + ratio / 2 - 25) * currentPosition;
    this.setState({ filter: e.currentTarget.dataset.filter });
  };

  render() {
    const {
      toggleDone,
      updateTodo,
      removeTodo,
      todoList,
      addTodo,
      signOut
    } = this.props.store;

    const { filter, isLoading } = this.state;

    return (
      <section {...styles.container}>
        <header>
          <h1>To-Do
            <Menu
            />
            </h1>
        </header>
        <AddTodo addTodo={addTodo} />
        <nav {...styles.filter} ref={ref => (this.filterRef = ref)}>
          <figure onClick={this.filter} data-filter="ALL" data-idx="0">
            <img src={listIcon} alt="list all" />
          </figure>
          <figure onClick={this.filter} data-filter="ACTIVE" data-idx="1">
            <img src={scheduleIcon} alt="todo" />
          </figure>
          <figure onClick={this.filter} data-filter="DONE" data-idx="2">
            <img src={checkIcon} alt="done" />
          </figure>
          <div {...styles.activeFilter(this.positionRatio)} />
        </nav>
        <main>
          {isLoading ? (
            <Spinner />
          ) : (
              <TransitionGroup {...styles.list} component="ul">
                {Array.from(todoList.values())
                  .filter(this.applyFilter[filter])
                  .reverse()
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
                  ))}
              </TransitionGroup>
            )}
        </main>
        <Footer />
      </section>
    );
  }
}

export default observer(TodoList);
