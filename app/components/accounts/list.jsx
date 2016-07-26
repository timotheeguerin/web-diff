import React, {PropTypes} from 'react';
import AccountItem from './Item';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/list';

const cx = classNames.bind(styles);

const AccountList = ({onDestroy, accounts}) => {
  const accountItems = accounts.map((account, key) => {
    return (
      <AccountItem index={key}
                   id={account.id}
                   key={key}
                   text={account.name}
                   onDestroy={onDestroy}/>);
  });

  return (
    <div className={cx('accounts-container')}>
      <h3 className={cx('title')}>List of your accounts</h3>
      <ul className={cx('list')}>{accountItems}</ul>
    </div>
  );
};

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default AccountList;