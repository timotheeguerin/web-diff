import React, {Component, PropTypes} from 'react';
import SessionItem from './Item';
import classNames from 'classnames/bind';
import styles from 'css/components/compare/list';
import CreateCompareSessionForm from "components/compare/Create";

const cx = classNames.bind(styles);

class SessionList extends Component {
  constructor(props) {
    super(props);
    this.showCompareSessionForm = this.showCompareSessionForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      showCompareSessionForm: false
    };
  }

  showCompareSessionForm() {
    this.setState({showCompareSessionForm: true})
  }

  handleFormSubmit(data) {
    this.setState({showCompareSessionForm: false});
    this.props.onNewSession(data);
  }

  render() {
    const {sessions, repository, onNewSession} = this.props;
    const sessionItems = sessions.map((session, key) => {
      return (
        <SessionItem index={key}
                     key={session._id}
                     session={session}/>);
    });
    const form = <CreateCompareSessionForm revisions={repository.revisions} onSubmit={this.handleFormSubmit}/>;
    return (
      <div className={cx('session-list')}>
        <h2>Compare sessions</h2>
        { this.state.showCompareSessionForm ? form : ''}
        <AddNewCompareSessionButton onClick={this.showCompareSessionForm}/>
        {sessionItems}
      </div>
    );
  }
}

SessionList.propTypes = {
  onNewSession: PropTypes.func.isRequired,
  sessions: PropTypes.array.isRequired
};

export default SessionList;

const AddNewCompareSessionButton = ({onClick}) => {
  return (
    <a className={cx('add-compare-session-btn')} onClick={onClick}>
      <i className="fa fa-plus"/>
    </a>
  )
};