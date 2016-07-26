import axios from 'axios';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import {createAccount, destroyAccount, fetchAccounts} from 'actions/accounts';
import styles from 'css/components/accounts/show';
import AccountCard from "components/accounts/Card";
import RepositoryList from "components/repositories/List";
import CreateRepositoryForm from "components/repositories/Create";

const cx = classNames.bind(styles);

class ShowAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      repositories: []
    };

    this.addNewRepo = this.addNewRepo.bind(this);
  }

  componentDidMount() {
    const {id} = this.props.params;
    console.log("LOading ");
    axios.get(`/api/accounts/${id}`).then((res) => {
      this.setState({account: res.data});
    });

    axios.get(`/api/accounts/${id}/repositories`).then((res) => {
      this.setState({repositories: res.data});
    });
  }

  addNewRepo(data) {
    const {id} = this.props.params;

    axios.post(`/api/accounts/${id}/repositories`, data).then((res) => {
      console.log("Lol this is working well 2", res);
    }).catch((err) => {
      console.log("Error is ", err);
    })
  }

  render() {
    console.log("TSTTE", this.state);
    return (
      <div className={cx('account')}>
        <AccountCard account={this.state.account}/>
        <CreateRepositoryForm onEntrySave={this.addNewRepo}/>
        <RepositoryList repositories={this.state.repositories}/>
      </div>
    );
  }
}

export default ShowAccount;
