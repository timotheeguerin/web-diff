import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/create';

const cx = classNames.bind(styles);

export default class CreateAccountForm extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    onEntrySave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cx('form')}>
        <h1 className={cx('title')}>Create a new account</h1>
        <input
          className={cx('input')}
          value={this.props.account.name}
          placeholder="Acount name ..."
        />

        <button className={cx('save-btn')} onClick={this.props.onEntrySave}>
          Create
        </button>
        <i className="fa fa-plus-circle"/>
      </div>
    )
  }
}
