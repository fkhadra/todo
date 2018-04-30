import React, { Component } from 'react';
import Icon from "@fortawesome/react-fontawesome";

class ShareForm extends Component {
  state = {
    email: ''
  };

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <section>
        <label htmlFor="email">
          <Icon icon="envelope"/>
          <input
          type="email"
          id="email"
          name="email"
          value={this.state.email}
          onChange={this.handleInput}
          placeholder="Enter email"
        />
        </label>
        <button>Submit</button>
      </section>
    );
  }
}

export default ShareForm;
