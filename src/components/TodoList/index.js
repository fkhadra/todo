import React, { Component } from 'react';
import { css, keyframes } from 'glamor';
import { TransitionGroup, Transition } from 'react-transition-group';

import Todo from './Todo';
import TodoInput from './TodoInput';

const animations = {
  slideInLeft: keyframes({
    from: {
      transform: 'translate3d(-100%, 0, 0)',
      opacity: 0
    },
    to: {
      opacity: 1,
      transform: 'none'
    }
  }),
  zoomOut: keyframes({
    from: {
      opacity: 1
    },

    '50%': {
      opacity: 0,
      transform: 'scale3d(.3, .3, .3)'
    },

    to: {
      opacity: 0
    }
  })
};

const styles = {
  list: css({
    listStyle: 'none',
    padding: 0,
    '& li:not(:first-child)': {
      borderTop: 'solid 1px #424545'
    }
  }),
  enter: css({
    animationFillMode: 'both',
    animationDuration: '0.75s',
    animationName: animations.slideInLeft
  }),
  exit: height =>
    css({
      animationFillMode: 'both',
      animationDuration: '0.75s',
      animationName: animations.zoomOut,
      transition: 'max-height 0.75s, opacity 0.75s',
      maxHeight: height,
      overflow: 'hidden'
    }),
  onExit: node => {
    node.classList.add(styles.exit(`${node.offsetHeight}px`));
    requestAnimationFrame(() => {
      node.style.maxHeight = '0';
      node.style.opacity = '0';
    });
  },
  status: css({
    '& header': {
      textAlign: 'left'
    },
    '& > div': {
      background: 'grey',
      opacity: 0.5
    }
  }),
  progressBar: css({
    height: '4px',
    background:
      'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)',
    width: 0,
    transition: 'width 0.5s'
  }),
  filter: css({
    display: 'flex',
    justifyContent: 'space-between'
  })
};

export default class TodoList extends Component {
  state = {
    todos: [],
    filter: 'ALL'
  };

  applyFilter = {
    'ALL': todo => todo,
    'ACTIVE': todo => !todo.done,
    'DONE': todo => todo.done
  };

  componentDidMount() {
    this.props.todoStore.onChange(todos => {
      this.setState({ todos: todos });
    });
  }

  filter = e => this.setState({ filter: e.currentTarget.dataset.filter })

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

  render() {
    const { title, todoStore } = this.props;
    const { percentage, number } = todoStore.getDone();

    return (
      <section>
        <h2>{title}</h2>
        <TodoInput addTodo={todoStore.addTodo} />
        <section {...styles.status}>
          <header>
            <div {...styles.filter}>
              <span onClick={this.filter} data-filter="ALL">All</span>
              <span onClick={this.filter} data-filter="ACTIVE">2</span>
              <span onClick={this.filter} data-filter="DONE">3</span>
            </div>
            <div>
            Completed: {number} / {this.state.todos.length}{' '}
            <span role="img" aria-label="image">
              🚀
            </span>
            </div>
          </header>
          <div>
            <div {...styles.progressBar} style={{ width: `${percentage}%` }} />
          </div>
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
