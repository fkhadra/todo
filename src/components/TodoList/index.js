import React, { Component } from 'react';
import { css } from 'glamor';

import Todo from './Todo';
import TodoInput from './TodoInput';

const styles = {
  list: css({
    listStyle: 'none',
    padding: 0
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

  renderTodos() {
    const { toggleDone, updateTodo, removeTodo } = this.props.todoStore;

    return this.state.todos.map(todo => (
      <li key={todo.id}>
        <Todo
          todo={todo}
          toggleDone={toggleDone}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />
      </li>
    ));
  }

  render() {
    const { title, todoStore } = this.props;

    return (
      <section>
        <h2>{title}</h2>
        <div>
          <TodoInput addTodo={todoStore.addTodo} />
          <ul {...styles.list}>{this.renderTodos()}</ul>
        </div>
      </section>
    );
  }
}
