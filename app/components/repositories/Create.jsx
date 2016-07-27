import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/create';
import {reduxForm, Field} from 'redux-form';

const cx = classNames.bind(styles);

export default class CreateRepositoryForm extends Component {
  static propTypes = {
    onEntrySave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {showForm: false};
  }

  showForm() {
    this.setState({showForm: true});
  }

  handleSubmit(data) {
    this.setState({showForm: false});
    this.props.onEntrySave(data);
  }

  render() {
    if (this.state.showForm) {
      return <RepositoryForm onSubmit={this.handleSubmit.bind(this)}/>
    } else {
      return <OpenFormButton onClick={this.showForm.bind(this)}/>
    }
  }
}

export let RepositoryForm = ({handleSubmit, submitting}) => {
  return (
    <form className={cx('form')} onSubmit={handleSubmit}>
      <h1 className={cx('title')}>Add a new repository</h1>

      <div className={cx('fields')}>
        <Field
          className={cx('input')}
          component="input"
          type="text"
          placeholder="Repository name ..."
          name="name"
        />

        <Field
          className={cx('input')}
          component="input"
          type="text"
          placeholder="Repository git url ..."
          name="url"
        />

        <button type="submit" className={cx('save-btn')} disabled={submitting}>
          Create
        </button>
      </div>
    </form>
  )
};

RepositoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

RepositoryForm = reduxForm({
  form: 'repository'  // a unique name for this form
})(RepositoryForm);


export const OpenFormButton = ({onClick}) => {
  return (
    <div className={cx('add-btn')} onClick={onClick}>
      <i className="fa fa-plus-circle"/>
    </div>
  )
};
