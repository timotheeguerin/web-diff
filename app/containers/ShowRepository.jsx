import axios from 'axios';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import {createAccount, destroyAccount, fetchAccounts} from 'actions/accounts';
import styles from 'css/components/repositories/show';
import RepositoryCard from "components/repositories/Card";
import CreateCompareSessionForm from "components/compare/Create";

const cx = classNames.bind(styles);

class ShowRepository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null,
      showCompareSessionForm: false
    };

    this.showCompareSessionForm = this.showCompareSessionForm.bind(this);
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

  showCompareSessionForm() {
    this.setState({showCompareSessionForm: true})
  }

  createNewCompareSession(data) {
    this.setState({showCompareSessionForm: false});
    console.log("Data is", data)
  }

  renderContent() {
    const form = <CreateCompareSessionForm revisions={this.state.repository.revisions}
                                           onSubmit={this.createNewCompareSession.bind(this)}/>
    return (
      <div className={cx('repository')}>
        <RepositoryCard accountId={this.props.params.accountId} repository={this.state.repository}/>
        <div className={cx('compare-session-list')}>
          <h2>Compare sessions</h2>
          { this.state.showCompareSessionForm ? form : ''}
          <AddNewCompareSessionButton onClick={this.showCompareSessionForm}/>
        </div>
      </div>
    )
  }
}

const AddNewCompareSessionButton = ({onClick}) => {
  return (
    <a className={cx('add-compare-session-btn')} onClick={onClick}>
      <i className="fa fa-plus"/>
    </a>
  )
};

export default ShowRepository;
