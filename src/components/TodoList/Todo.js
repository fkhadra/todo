import React, { Component } from 'react';
import { css } from 'glamor';

import Checkmark from './Checkmark';
import deleteIcon from 'src/assets/delete.svg';

const styles = {
  container: css({
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    background: '#000000',
    '& div': {
      margin: '10px'
    }
  }),
  delete: css({
    cursor: 'pointer' 
  })
}

export default class Todo extends Component {
  
  toggle = () => this.props.toggleDone(this.props.todo.id);

  remove = () => this.props.removeTodo(this.props.todo.id);

  render(){
    const { done, value } = this.props.todo;
    return(
      <article {...styles.container}>
        <div onClick={this.toggle}>
          <Checkmark checked={done}/>
        </div>
        <div>{value}</div>
        <img src={deleteIcon} alt="delete" onClick={this.remove}/>
      </article>
    );
  }
}