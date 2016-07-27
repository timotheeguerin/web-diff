import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import {Link} from 'react-router'

import styles from 'css/components/revisions/list';

const cx = classNames.bind(styles);

export default class RevisionItem extends Component {
  static propTypes = {
    revision: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {onSelect, revision} = this.props;
    onSelect(revision.hash);
  }

  render() {
    const {revision:{hash, message}, isSelected} = this.props;

    return (
      <a className={cx('item', {'selected': isSelected})} onClick={this.handleClick}>
        <div className={cx('topic')}>{hash.slice(0, 6)}</div>
        <div className={cx('topic')}>{message}</div>
      </a>
    );
  }
}
