import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/compare/create';
import {reduxForm, Field} from 'redux-form';
import RevisionPicker from 'components/revisions/picker';

const cx = classNames.bind(styles);

export default class CreateRevisionForm extends Component {
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
      return <RevisionForm onSubmit={this.handleSubmit.bind(this)}/>
    } else {
      return <OpenFormButton onClick={this.showForm.bind(this)}/>
    }
  }
}

export let RevisionForm = ({handleSubmit, submitting}) => {
  return (
    <form className={cx('form')} onSubmit={handleSubmit}>
      <h1 className={cx('title')}>Add a new Revision</h1>

      <div className={cx('fields')}>
        <div className={cx('picker')}>
          <label>
            Select the base revision
          </label>
          <Field
            name="sha1"
            component={props => {
            return <RevisionForm  selectedRevisionSha={{val: props.value}} onRevisionSelected={param => props.onChange(param)}/>
          }}
          />
        </div>

        <div className={cx('picker')}>
          <label>
            Select the revision to compare against
          </label>
          <Field
            component="input"
            name="sha2"
            component={props => {
            return <RevisionForm selectedRevisionSha={{val: props.value}} onRevisionSelected={param => props.onChange(param)}/>
          }}
          />
        </div>

        <button type="submit" className={cx('save-btn')} disabled={submitting}>
          Create
        </button>
      </div>
    </form>
  )
};

RevisionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

RevisionForm = reduxForm({
  form: 'account'  // a unique name for this form
})(RevisionForm);


export const OpenFormButton = ({onClick}) => {
  return (
    <div className={cx('add-btn')} onClick={onClick}>
      <i className="fa fa-plus-circle"/>
      Start a new comparaison
    </div>
  )
};