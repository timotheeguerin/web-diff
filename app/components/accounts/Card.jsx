import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {createAccount, destroyAccount, fetchAccounts} from 'actions/accounts';
import styles from 'css/components/accounts/show';

const cx = classNames.bind(styles);

export default class AccountCard extends Component {
  render() {
    const {name} = this.props.account;
    return (
      <div className={cx('account-card')}>
        <div className={cx('title')}>
          {name}
        </div>
      </div>
    );
  }
}
