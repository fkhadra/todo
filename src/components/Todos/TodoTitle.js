import React, { Component } from 'react';

import { keys } from 'src/utils';

export default class TodoTitle extends Component{
  state = {
    editing: false,
    inputValue: ''
  };

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  handleSubmit = e => {
    const value = this.state.inputValue.trim();

    if (
      (e.which === keys.ENTER && value.length) ||
      (e.type === 'blur' && value.length)
    ) {
      
      this.toggleEdit();
    } else if (e.which === keys.ESCAPE) {
      this.toggleEdit();
    }
  };

  handleEdit = e => {
    this.setState({ inputValue: e.target.value });
  };

  render(){
    return( 
      <h2>
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
          <span onDoubleClick={this.toggleEdit}>
          Title
          </span>
        )}
      </h2>
    )
  }
}