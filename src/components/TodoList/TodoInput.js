import React, { Component } from 'react';

const keys = {
  ENTER: 13,
  ESCAPE: 27
}; 

export default class TodoInput extends Component {
  state = {
    inputValue: ''
  };

  onInputChange = e => this.setState({ inputValue: e.target.value });
  
  clearInput = () => this.setState({
    inputValue: ''
  });

  handleSubmit = e => {
    if(e.which === keys.ENTER) {
      this.props.addTodo({ value: this.state.inputValue });
      this.clearInput();
    } else if(e.which === keys.ESCAPE) {
      this.clearInput();
    }
  }

  render() {
    
    return (
      <input
            type="text"
            value={this.state.inputValue}
            placeholder="What need to be done ?"
            onChange={this.onInputChange}
            onKeyPress={this.handleSubmit}
          />
    )
  }
}
