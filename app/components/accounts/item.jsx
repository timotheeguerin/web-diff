import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/list';

const cx = classNames.bind(styles);

export default class AccountItem extends Component {

  constructor(props) {
    super(props);
    this.onDestroyClick = this.onDestroyClick.bind(this);
  }

  onDestroyClick() {
    const {account, onDestroy} = this.props;
    onDestroy(account.id);
  }

  render() {
    const {id, name} = this.props.account;

    return (
      <li className={cx('item')} key={id}>
        <span className={cx('topic')}>{name}</span>
        <button className={ cx('button', 'destroy') }
                onClick={this.onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  }
}

AccountItem.propTypes = {
  account: PropTypes.object.isRequired,
  onDestroy: PropTypes.func.isRequired
};
