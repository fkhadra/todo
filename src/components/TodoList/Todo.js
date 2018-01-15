import React, { Component } from 'react';
import { css } from 'glamor';

import Checkmark from './Checkmark';
import deleteIcon from 'src/assets/delete.svg';

import { keys } from 'src/utils';

const styles = {
  container: css({
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    background: '#000000',
    '& img': {
      display: 'none'
    },
    ':hover': {
      '& img': {
        display: 'initial'
      }
    },
    '& div': {
      margin: '10px'
    },
    '& input, & span': {
      color: '#ffffff',
      background: 'transparent',
      border: 'none',
      width: '100%',
      padding: '.8rem 1.0rem',
      textAlign: 'left'
    },
    '& input:focus': {
      background: '#6c6e6f',
      outline: 'none',
      caretColor: '#0cc10c'
    }
  }),
  delete: css({
    cursor: 'pointer'
  })
};

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      inputValue: props.todo.value
    };
  }

  onFocus = e => {
    const len = this.props.todo.value.length;
    e.target.setSelectionRange(len, len);
  };

  toggle = () => this.props.toggleDone(this.props.todo.id);

  remove = () => this.props.removeTodo(this.props.todo.id);

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  handleSubmit = e => {
    const value = this.state.inputValue.trim();

    if (
      (e.which === keys.ENTER && value.length) ||
      (e.type === 'blur' && value.length)
    ) {
      this.props.updateTodo(this.props.todo.id, { value });
      this.toggleEdit();
    } else if (e.which === keys.ESCAPE) {
      this.toggleEdit();
    }
  };

  handleEdit = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { done, value } = this.props.todo;
    return (
      <article {...styles.container}>
        <div onClick={this.toggle}>
          <Checkmark checked={done} />
        </div>
        {this.state.editing ? (
          <input
            onChange={this.handleEdit}
            onBlur={this.handleSubmit}
            onKeyPress={this.handleSubmit}
            type="text"
            value={this.state.inputValue}
            onFocus={this.onFocus}
            autoFocus
          />
        ) : (
          <span onDoubleClick={this.toggleEdit}>{value}</span>
        )}
        <img src={deleteIcon} alt="delete" onClick={this.remove} />
      </article>
    );
  }
}
