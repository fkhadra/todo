import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Input from 'src/components/Input';
import { css } from 'glamor';

// const anim = css.keyframes({
//   from:
// })

const styles = {
  input: css({
    padding: '8px',
    border: 'none',
    position: 'relative',
    display: 'inline-block'
  }),
  button: css({})
};

class TodoTitle extends Component {
  state = {
    editing: false
  };

  toggleEdit = () =>
    this.props.store.activeList.writable &&
    this.setState({ editing: !this.state.editing });

  handleSubmit = (value, success) => {
    if (success) {
      this.props.store.saveUserList({ label: value });
    }
    this.toggleEdit();
  };

  render() {
    return (
      <h2>
        {this.state.editing ? (
          <div {...styles.input}>
            <div>
              <Input initialValue={'Foo'} handleSubmit={this.handleSubmit} />
              <button>Save</button>
            </div>
          </div>
        ) : (
          <span onDoubleClick={this.toggleEdit}>
            {this.props.store.activeList && this.props.store.activeList.label}
          </span>
        )}
      </h2>
    );
  }
}

export default observer(TodoTitle);
