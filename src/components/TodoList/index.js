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
  }),

};

const styles = {
  list: css({
    listStyle: 'none',
    padding: 0
  }),
  enter: css({
    animationFillMode: 'both',
    animationDuration: '0.75s',
    animationName: animations.slideInLeft
  }),
  exit: height => css({
    animationFillMode: 'both',
    animationDuration: '0.75s',
    animationName: animations.zoomOut,
    transition: 'max-height 0.75s, opacity 0.75s',
    maxHeight: height,
    overflow: 'hidden',
  })
};
export default class TodoList extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    this.props.todoStore.onChange(todos => {
      this.setState({ todos: todos });
    });
  }

  ext = el => {
    const timing = '0.75s';
    const height = el.offsetHeight + 'px';
   
   
    el.classList.add(styles.exit(height));
    // Begin transition
    // var endSlideDown = function() {
    //   el.style.removeProperty('-webkit-transition');
    //   el.style.removeProperty('transition');
    //   el.removeEventListener(transitionEvent('end'), endSlideDown);
    // };
    requestAnimationFrame(function() {
      el.style.maxHeight = '0';
      el.style.opacity = '0';
    });
  }

  renderTodos() {
    const { toggleDone, updateTodo, removeTodo } = this.props.todoStore;

    return this.state.todos.map(todo => (
      <Transition 
      key={todo.id}
      timeout={750}
      onEnter={node => node.classList.add(styles.enter)}
      onEntered={node => node.classList.remove(styles.enter)}
      onExit={this.ext}
      
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

    return (
      <section>
        <h2>{title}</h2>
        <div>
          <TodoInput addTodo={todoStore.addTodo} />
          <TransitionGroup {...styles.list} component="ul">
            {this.renderTodos()}
          </TransitionGroup>
        </div>
      </section>
    );
  }
}
