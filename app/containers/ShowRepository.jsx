import axios from 'axios';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import {createAccount, destroyAccount, fetchAccounts} from 'actions/accounts';
import styles from 'css/components/accounts/show';
import RepositoryCard from "components/repositories/Card";

const cx = classNames.bind(styles);

class ShowRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null
    };

  }

  componentDidMount() {
    const {accountId, id} = this.props.params;
    axios.get(`/api/accounts/${accountId}/repositories/${id}`).then((res) => {
      console.log("Got repo ", res.data);
      this.setState({repository: res.data});
    });
  }

  render() {
    return this.state.repository === null ? <div></div> : this.renderContent();
  }

  renderContent() {
    return (
      <div className={cx('account')}>
        <RepositoryCard accountId={this.props.params.accountId} repository={this.state.repository}/>
      </div>
    )
  }
}

export default ShowRepository;
