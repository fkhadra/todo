import React, { Component } from "react";

function withTransition(C) {
  return class extends Component {
    state = {
      hasEnded: false
    };

    unmount = () => {
      this.setState({
        hasEnded: true
      });
    }

    render() {
      return !this.state.hasEnded && <C {...this.props} unmount={this.unmount}/>
    }
  }
}

export default withTransition;
