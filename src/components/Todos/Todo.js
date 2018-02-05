import React, { Component } from 'react';
import { css } from 'glamor';

import Checkmark from './Checkmark';
import Input from 'src/components/Input';
import deleteIcon from 'src/assets/delete.svg';

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
  state = {
    editing: false
  };

  toggle = () => this.props.toggleDone(this.props.todo.id);

  remove = () => this.props.removeTodo(this.props.todo.id);

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  handleSubmit = (value, success) => {
    if (success) {
      this.props.updateTodo(this.props.todo.id, { value });
    }
    this.toggleEdit();
  };

  render() {
    const { done, value } = this.props.todo;
    return (
      <article {...styles.container}>
        <div onClick={this.toggle}>
          <Checkmark checked={done} />
        </div>
        {this.state.editing ? (
          <Input
            handleSubmit={this.handleSubmit}
            initialValue={this.props.todo.value}
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
