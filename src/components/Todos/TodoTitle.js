import React, { Component } from 'react';
import Input from 'src/components/Input';
import { css } from 'glamor';

const styles = {
  input: css({
    padding: '8px',
    border: 'none'
  })
};

export default class TodoTitle extends Component {
  state = {
    editing: false
  };

  toggleEdit = () =>
    this.props.list.writable &&
    this.setState({ editing: !this.state.editing });

  handleSubmit = (value, success) => {
    if (success) {
      this.props.store.saveList({ id: this.props.list.id, label: value });
    }
    this.toggleEdit();
  };

  render() {
    return (
      <h2>
        {this.state.editing ? (
          <div {...styles.input}>
            <Input
              initialValue={this.props.list.label}
              handleSubmit={this.handleSubmit}
            />
          </div>
        ) : (
          <span onDoubleClick={this.toggleEdit}>{this.props.list.label}</span>
        )}
      </h2>
    );
  }
}
