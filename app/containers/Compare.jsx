import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/container';
import DualView from "../components/compare/DualView";

const cx = classNames.bind(styles);

class CompareContainer extends Component {

  render() {
    return (
      <div className="compare-view">
        <DualView/>
      </div>
    );
  }
}

export default CompareContainer;