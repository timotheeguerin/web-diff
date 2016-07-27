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

    this.loadRepo = this.loadRepo.bind(this);
    this.createNewCompareSession = this.createNewCompareSession.bind(this);
    this.startCompareSession = this.startCompareSession.bind(this);
    this.stopCompareSession = this.stopCompareSession.bind(this);
    this.deleteCompareSession = this.deleteCompareSession.bind(this);
  }

  componentDidMount() {
    this.loadRepo();
  }

  loadRepo() {
    const {accountId, id} = this.props.params;

    axios.get(`/api/accounts/${accountId}/repositories/${id}`).then((res) => {
      console.log("new repo ", res.data);
      this.setState({repository: res.data});
    });
  }

  render() {
    return this.state.repository === null ? <div></div> : this.renderContent();
  }

  createNewCompareSession(formData) {
    const {accountId, id} = this.props.params;
    const data = {
      name: formData.name,
      base: {
        hash: formData.hash1,
        message: ""
      },
      target: {
        hash: formData.hash2,
        message: ""
      }
    };
    console.log("Data is", formData, data);

    axios.post(`/api/accounts/${accountId}/repositories/${id}/comparisons`, data).then(() => {
      console.log("Compare session added successfully");
      this.loadRepo();
    }).catch((error) => {
      console.error("Error while adding the compare session", error)
    });
  }

  startCompareSession(sessionId) {
    const {accountId, id} = this.props.params;

    axios.get(`/api/accounts/${accountId}/repositories/${id}/comparisons/${sessionId}/start`).then(() => {
      console.log("Session deleted successfully");
      this.loadRepo();
    }).catch((error) => {
      console.error("Error while adding the compare session", error)
    });
  }

  stopCompareSession(sessionId) {
    const {accountId, id} = this.props.params;

    axios.get(`/api/accounts/${accountId}/repositories/${id}/comparisons/${sessionId}/stop`).then(() => {
      console.log("Session deleted successfully");
      this.loadRepo();
    }).catch((error) => {
      console.error("Error while adding the compare session", error)
    });
  }


  deleteCompareSession(sessionId) {
    const {accountId, id} = this.props.params;

    axios.delete(`/api/accounts/${accountId}/repositories/${id}/comparisons/${sessionId}`).then(() => {
      console.log("Session deleted successfully");
      this.loadRepo();
    }).catch((error) => {
      console.error("Error while adding the compare session", error)
    });
  }

  renderContent() {

    return (
      <div className={cx('repository')}>
        <RepositoryCard accountId={this.props.params.accountId} repository={this.state.repository} onSyncCompleted={this.loadRepo} />
        <CompareSessionList sessions={this.state.repository.comparisons} repository={this.state.repository}
                            onNewSession={this.createNewCompareSession}
                            onDelete={this.deleteCompareSession}
                            onStart={this.startCompareSession}
                            onStop={this.stopCompareSession}/>
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
