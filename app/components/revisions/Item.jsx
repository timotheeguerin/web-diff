import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import {Link} from 'react-router'

import styles from 'css/components/accounts/list';

const cx = classNames.bind(styles);

export default class RevisionItem extends Component {
  static propTypes = {
    revision: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  handleClick() {
    const {onSelect, revision} = this.props;
    onSelect(revision.sha);
  }

  render() {
    const {revision:{sha, message}, isSelected}= this.props;

    return (
      <a className={cx('item', {'selected': isSelected})} key={_id} onClick={this.handleClick}>
        <span className={cx('topic')} style={{display: 'inline-block', width: '15rem'}}>{sha}</span>
        <span className={cx('topic')}>{message}</span>
      </a>
    );
  }
}
