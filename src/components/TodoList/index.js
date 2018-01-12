import React, { Component } from 'react';

import Checkmark from './Checkmark';
import TodoInput from './TodoInput';

export default class TodoList extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    this.props.todoStore.onChange(todos => {
      this.setState({ todos: todos })
    });
  }
  
  renderTodos(){
    return this.state.todos.map( ({ id, done, value }) => (
      <li key={id}>
        <Checkmark checked={done} />
        <span>{value}</span>
      </li>
    ))
  }

  render() {
    const { title, todoStore } = this.props;

    return (
      <section>
        <h2>{title}</h2>
        <p>
          <TodoInput addTodo={todoStore.addTodo} />
          {this.renderTodos()}
        </p>
      </section>
    );
  }
}
