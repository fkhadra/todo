import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import styles from './styles';

class List extends Component {
  state = {
    isVisible: true,
    height: null
  };

  ref = null;

  componentDidMount(){
    console.log('did mount')
    // if (this.ref && this.state.isVisible) {
    //   this.setState({ height: this.ref.clientHeight });
    //   console.log('did mount')
    // }
  }


  componentDidUpdate(){
    console.log('did update')
    console.log(this.ref.clientHeight)
  }

  toggle = () => {
    let state = { isVisible: !this.state.isVisible };

    // if (this.state.isVisible) {
    //   const { height } = this.ref.getBoundingClientRect();
    //   state.height = height;
    // }

    this.setState(state);
  };

  render() {
    const { list, onListSelect, title } = this.props;
    let st ={};
   if (this.state.height) {
   //x  st = { height: this.state.isVisible ? this.state.height+'px' : 0 }
   }
    return (
      <Fragment>
        <h3 onClick={this.toggle}>{title}</h3>
        <ul {...styles.list(this.state.isVisible)} ref={ref => this.ref = ref} style={st}>
          {Array.from(list.values()).map(({ id, label }) => (
            <li key={id}>
              <NavLink onClick={onListSelect} to={`/list/${id}`}>
                {/* <img src={listIcon} alt="List" /> */}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default observer(List);
