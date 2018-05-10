import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
import { css } from 'glamor';
import Store from 'src/models/Store';

const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& label': {
      textAlign: 'left',
      margin: '12px 0 5px 0'
    }
  }),
  inputGroup: css({
    position: 'relative',
    '& span': css({
      position: 'absolute',
      fontSize: '32px',
      lineHeight: '38px',
      left: '10px'
    }),
    '& input': css({
      padding: '8px',
      width: '100%',
      outline: 'none',
      boxSizing: 'border-box',
      border: 'none',
      paddingLeft: '46px',
      borderRadius: '2px'
    })
  }),
  buttons: css({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    '& button': css({
      border: 'none',
      display: 'inline-block',
      padding: '8px 16px',
      verticalAlign: 'middle',
      overflow: 'hidden',
      textDecoration: 'none',
      color: 'inherit',
      textAlign: 'center',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      borderRadius: '4px'
    }),
  }),
  submit: css({
    background: '#4CAF50'
  }),
  cancel: css({
    background: 'grey'
  })
};

class ShareForm extends Component {
  state = {
    email: '',
    loading: false
  };

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  shareList = async () => {
    await this.props.store.shareList(this.state.email);
  }

  render() {
    return (
      <section {...styles.form}>
        <label htmlFor="email">Email</label>
        <div {...styles.inputGroup}>
          <span role="img" aria-label="email">
            💌
          </span>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
            placeholder="foo@bar.com"
          />
        </div>
        <label htmlFor="buddies">Buddies</label>
        <div {...styles.inputGroup}>
          <span role="img" aria-label="buddies">
            <Icon icon="users" {...css({ color: '#000', fontSize: '25px' })} />
          </span>
          <input type="text" id="buddies" name="buddies" placeholder="peaxe" />
        </div>
        <div {...styles.buttons}>
          <button {...styles.cancel}>Cancel</button>
          <button {...styles.submit} onClick={this.shareList}>Submit</button>
        </div>
      </section>
    );
  }
}

export default ShareForm;
