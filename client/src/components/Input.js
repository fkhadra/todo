import React, { Component } from 'react';

import { keys } from 'src/utils';

export default class Input extends Component {
  state = {
    inputValue: ''
  };

  componentDidMount() {
    this.setState({
      inputValue: this.props.initialValue
    });
  }

  onFocus = e => {
    const len = this.props.inputValue.length;
    e.target.setSelectionRange(len, len);
  };

  onInputChange = e => this.setState({ inputValue: e.target.value });

  clearInput = () =>
    this.setState({
      inputValue: ''
    });

  handleSubmit = e => {
    const value = this.state.inputValue.trim();

    if (value.length && (e.which === keys.ENTER || e.type === 'blur')) {
      this.props.handleSubmit(value, true );
    } else if (e.which === keys.ESCAPE) {
      this.props.handleSubmit(this.props.initialValue, false);
    }
  };

  render() {
    const { inputValue } = this.state;
    const { placeholder } = this.props;

    return (
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={this.onInputChange}
          onKeyPress={this.handleSubmit}
          onBlur={this.handleSubmit}
          autoFocus
        />
    );
  }
}

Input.defaultProps = {
  css: null
};
