import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/list';
import {Link} from 'react-router'
const cx = classNames.bind(styles);

export default class AccountItem extends Component {

  constructor(props) {
    super(props);
    this.onDestroyClick = this.onDestroyClick.bind(this);
  }

  onDestroyClick() {
    const {account, onDestroy} = this.props;
    onDestroy(account._id);
  }

  render() {
    const {_id, name} = this.props.account;

    return (
      <div className={cx('item')} key={_id}>
        <Link className={cx('topic')} to={`/accounts/${_id}`}>{name}</Link>
        <button className={ cx('delete-btn') }
                onClick={this.onDestroyClick}>
          <i className='fa fa-remove'/>
        </button>
      </div>
    );
  }
}

AccountItem.propTypes = {
  account: PropTypes.object.isRequired,
  onDestroy: PropTypes.func.isRequired
};
