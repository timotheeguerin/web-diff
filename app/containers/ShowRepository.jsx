import axios from 'axios';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import {createAccount, destroyAccount, fetchAccounts} from 'actions/accounts';
import styles from 'css/components/repositories/show';
import RepositoryCard from "components/repositories/Card";
import CompareSessionList from "components/compare/List";

const cx = classNames.bind(styles);

class ShowRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null
    };

    this.createNewCompareSession = this.createNewCompareSession.bind(this);
  }

  componentDidMount() {
    const {accountId, id} = this.props.params;
    axios.get(`/api/accounts/${accountId}/repositories/${id}`).then((res) => {
      this.setState({repository: res.data});
    });
  }

  render() {
    return this.state.repository === null ? <div></div> : this.renderContent();
  }

  createNewCompareSession(data) {
    console.log("Data is", data)
  }

  renderContent() {

    return (
      <div className={cx('repository')}>
        <RepositoryCard accountId={this.props.params.accountId} repository={this.state.repository}/>
        <CompareSessionList sessions={sessionFixtures} repository={this.state.repository} onNewSession={this.createNewCompareSession} />
      </div>
    )
  }
}

const sessionFixtures = [{
  name: "My first session",
  state: "stopped",
  base: {
    hash: "iajdwjadojwofapwfopakwpfka",
    port: "30002",
    url: "http://localhost:30002"
  },
  target: {
    hash: "fsgesgsegsegsegsegs",
    port: "30003",
    url: "http://localhost:30003"
  }
}, {
  name: "My second session",
  state: "running",
  base: {
    hash: "wfafawfawfawfawwwfww",
    port: "30004",
    url: "http://localhost:30004"
  },
  target: {
    hash: "gegesgesgsesegsgegeg",
    port: "30005",
    url: "http://localhost:30005"
  }
}, {
  name: "More session",
  state: "running",
  base: {
    hash: "wwgwgwgawgwgawga",
    port: "30006",
    url: "http://localhost:30006"
  },
  target: {
    hash: "gawggwgwaawgawggwa",
    port: "30007",
    url: "http://localhost:30007"
  }
}];

export default ShowRepository;
