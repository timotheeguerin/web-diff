import React, {Component, PropTypes} from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div>
        {this.props.loading ? this.props.children : 'Loading...'}
      </div>
    )
  }
}