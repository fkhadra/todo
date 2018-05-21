import React, { Component } from 'react';
import { css } from 'glamor';

import editIcon from 'src/assets/edit.svg';
import clearIcon from 'src/assets/clear.svg';

import { keys } from 'src/utils';

const styles = {
  group: css({
    position: 'relative',
    boxSizing: 'border-box',
    '& input': {
      fontSize: '100%',
      marginBottom: '1.5rem',
      width: '100%',
      appearance: 'none',
      backgroundColor: '#6d6e70',
      border: 'none',
      borderRadius: '.4rem',
      boxShadow: 'none',
      boxSizing: 'inherit',
      height: '2.8rem',
      color: '#ffffff',
      caretColor: '#0cc10c',
      padding: '.6rem 1.0rem',
      transition: 'transform 0.4s',
      ':focus': {
        outline: 'none',
        transform: ''
      },
      '::placeholder': {
        color: '#a0a0a0'
      }
    }
  }),
  icon: css({
    position: 'absolute',
    right: '2%',
    top: '14%'
  }),
  clear: css({
    top: '18%'
  })
};

export default class AddTodo extends Component {
  state = {
    inputValue: ''
  };

  onInputChange = e => this.setState({ inputValue: e.target.value });

  clearInput = () =>
    this.setState({
      inputValue: ''
    });

  handleSubmit = e => {
    const value = this.state.inputValue.trim()
    if (e.which === keys.ENTER && value.length) {
      this.props.addTodo({ value });
      e.target.blur();
      this.clearInput();
    } else if (e.which === keys.ESCAPE) {
      e.target.blur()
      this.clearInput();
    }
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div {...styles.group}>
        <input
          type="text"
          value={inputValue}
          placeholder="What need to be done ?"
          onChange={this.onInputChange}
          onKeyPress={this.handleSubmit}
        />
        {inputValue.length ? (
          <img
            {...css(styles.icon, styles.clear)}
            src={clearIcon}
            alt="input"
            onClick={this.clearInput}
          />
        ) : (
          <img {...styles.icon} src={editIcon} alt="input" />
        )}
      </div>
    );
  }
}
