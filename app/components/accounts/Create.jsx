import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/create';
import {reduxForm, Field} from 'redux-form';

const cx = classNames.bind(styles);

export default class CreateAccountForm extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
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
      return <AccountForm onSubmit={this.handleSubmit.bind(this)}/>
    } else {
      return <OpenFormButton onClick={this.showForm.bind(this)}/>
    }
  }
}

export let AccountForm = ({handleSubmit, submitting}) => {
  return (
    <form className={cx('form')} onSubmit={handleSubmit}>
      <h1 className={cx('title')}>Create a new account</h1>

      <div className={cx('fields')}>
        <Field
          className={cx('input')}
          component="input"
          type="text"
          placeholder="Acount name ..."
          name="name"
        />

        <button type="submit" className={cx('save-btn')} disabled={submitting}>
          Create
        </button>
      </div>
    </form>
  )
};

AccountForm.propTypes = {
  name: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

AccountForm = reduxForm({
  form: 'account'  // a unique name for this form
})(AccountForm);


export const OpenFormButton = ({onClick}) => {
  return (
    <div className={cx('add-btn')} onClick={onClick}>
      <i className="fa fa-plus-circle"/>
    </div>
  )
};