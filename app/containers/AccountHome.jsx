import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import AccountList from 'components/accounts/list';
import CreateAccountForm from 'components/accounts/create';
import {createAccount, destroyAccount, fetchAccounts} from 'actions/accounts';
import styles from 'css/components/accounts/container';

const cx = classNames.bind(styles);

class AccountHome extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method
  static need = [  // eslint-disable-line
    fetchAccounts
  ];

  render() {
    const {accounts, newAccount, destroyAccount} = this.props;
    return (
      <div className={cx('account-home')}>
        <CreateAccountForm account={newAccount} onEntrySave={createAccount} />
        <AccountList accounts={accounts} onDestroy={destroyAccount} />
      </div>
    );
  }
}

AccountHome.propTypes = {
  accounts: PropTypes.array.isRequired,
  createAccount: PropTypes.func.isRequired,
  destroyAccount: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.account.accounts,
    newAccount: state.account.newAccount
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {createAccount, destroyAccount, fetchAccounts})(AccountHome);
