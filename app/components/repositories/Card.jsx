import axios from 'axios';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {createAccount, destroyAccount, fetchAccounts} from 'actions/accounts';
import styles from 'css/components/repositories/show';

const cx = classNames.bind(styles);

export default class RepositoryCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  syncRepos() {
    const {accountId, repository: {_id}} = this.props;
    this.setState({refreshing: true});
    axios.get(`/api/accounts/${accountId}/repositories/${_id}/sync`).then((res) => {
      this.setState({refreshing: false});

      if (this.props.onSyncCompleted) {
        this.props.onSyncCompleted();
      }
    })
  }

  render() {
    const {name, url, revisions} = this.props.repository;
    return (
      <div className={cx('repository-card')}>
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
          <div className={cx('item')}>
            <button className={cx('sync-btn')} onClick={this.syncRepos.bind(this)}>
              <i className={cx('fa', 'fa-refresh', {'fa-spin': this.state.refreshing})}/>{' Sync'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
