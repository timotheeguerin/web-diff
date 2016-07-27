import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/compare/create';
import {reduxForm, Field} from 'redux-form';
import RevisionPicker from 'components/revisions/picker';

const cx = classNames.bind(styles);

let CreateCompareSessionForm = ({handleSubmit, submitting, revisions}) => {
  revisions = revisions.slice(0, 10); // TODO change to have server side search
  return (
    <form className={cx('form')} onSubmit={handleSubmit}>
      <h1 className={cx('title')}>Create a new comparaison session</h1>

      <Field
        className={cx('input')}
        component="input"
        type="text"
        placeholder="Session name ..."
        name="name"
      />

      <div className={cx('fields')}>
        <div className={cx('picker')}>
          <label className={cx('label')}>
            1. Select the base revision
          </label>
          <Field
            name="hash1"
            component={props => {
            return <RevisionPicker revisions={revisions} selectedRevisionHash={props.input.value} onRevisionSelected={param => props.input.onChange(param)}/>
          }}
          />
        </div>
        <div className={cx('center-column')}>
          <button type="submit" className={cx('save-btn')} disabled={submitting}>
            Compare
          </button>
        </div>
        <div className={cx('picker')}>
          <label className={cx('label')}>
            2. Select the revision to compare against
          </label>
          <Field
            component="input"
            name="hash2"
            component={props => {
            return <RevisionPicker revisions={revisions} selectedRevisionHash={props.input.value} onRevisionSelected={param => props.input.onChange(param)}/>
          }}
          />
        </div>


      </div>
    </form>
  )
};

CreateCompareSessionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  revisions: PropTypes.array.isRequired
};

CreateCompareSessionForm = reduxForm({
  form: 'compare-session'  // a unique name for this form
})(CreateCompareSessionForm);

export default CreateCompareSessionForm
