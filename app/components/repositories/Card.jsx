import axios from 'axios';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {createAccount, destroyAccount, fetchAccounts} from 'actions/accounts';
import styles from 'css/components/accounts/show';

const cx = classNames.bind(styles);

export default class RepositoryCard extends Component {
  syncRepos() {
    const {accountId, repository: {_id}} = this.props;

    axios.get(`/api/accounts/${accountId}/repositories/${_id}/sync`).then((res) => {
      console.log("Synced repos", res.data);
    });
  }

  render() {
    const {name, url, revisions} = this.props.repository;
    return (
      <div className={cx('account-card')}>
        <div className={cx('title')}>
          {name}
        </div>
        <div className={cx('list')}>
          <div className={cx('item')}>
            <b>{'Url:  '}</b>{url}
          </div>

          <div className={cx('item')}>
            <b>{'Number of commits:  '}</b>{revisions.length}
          </div>
        </div>

        <button onClick={this.syncRepos.bind(this)}>
          Sync
        </button>
      </div>
    );
  }
}
