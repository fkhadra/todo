import React, { Component } from 'react';
import Icon from "@fortawesome/react-fontawesome";
import { css } from "glamor";

const styles = {
  icon: css({
    display: 'flex',
  }),
  input: css({
    padding: '8px',
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box',
    border: 'none',
  })
}

class ShareForm extends Component {
  state = {
    email: ''
  };

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <section>
        <div >
        {/* <div {...styles.icon}>
        <span>
            <Icon icon="at"/>
          </span>
        </div> */}
          <input
          {...styles.input}
          type="email"
          id="email"
          name="email"
          value={this.state.email}
          onChange={this.handleInput}
          placeholder="Enter email"
        />
        </div>
        {/* <button>Submit</button> */}
      </section>
    );
  }
}

export default ShareForm;
