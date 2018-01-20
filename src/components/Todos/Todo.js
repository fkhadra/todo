import React, { Component } from 'react';
import { css } from 'glamor';

import Checkmark from './Checkmark';
import deleteIcon from 'src/assets/delete.svg';

import { keys } from 'src/utils';

const styles = {
  container: css({
    display: 'flex',
    justifyItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& img': {
      opacity: 0,
      pointerEvents: 'none'
    },
    ':hover': {
      '& img': {
        opacity: 1,
        pointerEvents: 'initial'
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
      // background: '#6c6e6f',
      outline: 'none',
      caretColor: '#0cc10c'
    }
  }),
  content: done =>
    css({
      position: 'relative',
      opacity: done ? 0.5 : 1,
      textAlign: 'left',
      ':after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: '100%',
        height: '2px',
        top: '48%',
        borderRadius: '1px',
        background: 'purple',
        transformOrigin: done ? 'center left' : 'center right',
        transform: done ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.5s cubic-bezier(0.55, 0, 0.1, 1)'
      }
    }),
  delete: css({
    cursor: 'pointer',
    alignSelf: 'end'
  })
};

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      inputValue: props.todo.value
    };
    this.touchTimer = null;
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

  handleTouchStart = e => {
    console.log('touch Start');
    this.touchTimer = setTimeout(() => {
      console.log('long touch');
    }, 800);
  };

  handleTouchEnd = () => this.touchTimer && clearTimeout(this.touchTimer);

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
          <div>
            <span
              {...styles.content(done)}
              onDoubleClick={this.toggleEdit}
              onTouchStart={this.handleTouchStart}
              onTouchEnd={this.handleTouchEnd}
            >
              {value}
            </span>
          </div>
        )}
        <div>
          <img src={deleteIcon} alt="delete" onClick={this.remove} />
        </div>
      </article>
    );
  }
}
