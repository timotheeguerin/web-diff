import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import {Link} from 'react-router'

import styles from 'css/components/accounts/list';

const cx = classNames.bind(styles);

export default class RepositoryItem extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {_id, name, url} = this.props.repository;

    return (
      <Link className={cx('item')} key={_id} to={`/repository/${_id}`}>
        <span className={cx('topic')} style={{display: 'inline-block', width: '15rem'}}>{name}</span>
        <span className={cx('topic')}>{url}</span>
      </Link>
    );
  }
}
