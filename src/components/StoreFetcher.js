import React, { Component } from 'react';

const STATE = {
  LOADING: -1,
  DONE: 0,
  ERROR: 1
};

class StoreFetcher extends Component {
  state = {
    status: STATE.LOADING
  };

  async componentDidMount() {
    console.log('StoreFetcher Mount')
    try {
      await this.props.fetch();
      this.setState({ status: STATE.DONE });
    } catch (error) {
      console.log(error)
      this.setState({ status: STATE.ERROR });
    }
  }

  componentDidUpdate(){
    console.log('Store fetcher Updare')
  }
  

  render() {
    switch (this.state.status) {
      default:
      case STATE.LOADING:
        return <div>Loading...</div>;
      case STATE.DONE:
        return this.props.children;
      case STATE.ERROR:
        return <div>Error...</div>;
    }
  }
}

export default StoreFetcher;
