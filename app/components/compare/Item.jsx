import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import {Link} from "react-router";

import styles from 'css/components/compare/list';

const cx = classNames.bind(styles);

export default class SessionItem extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {session: {_id, name, base, target, state}}= this.props;

    return (
      <div className={cx('session-item')} key={_id}>
        <Link className={cx('title')} to={`/compare`}>{name}</Link>
        <div className={cx('list')}>
          <div className={cx('item')}>
            {this.renderButtons()}
          </div>
          <div className={cx('item')}>
            <b className={cx('topic')} style={{display: 'inline-block', width: '5rem'}}>{'State: '}</b>
            <span className={cx('topic')}>{state}</span>
          </div>
          <div className={cx('item')}>
            <b className={cx('topic')} style={{display: 'inline-block', width: '5rem'}}>{'Base: '}</b>
            <span className={cx('topic')}>{base.hash}</span>
          </div>
          <div className={cx('item')}>
            <b className={cx('topic')} style={{display: 'inline-block', width: '5rem'}}>{'Target: '}</b>
            <span className={cx('topic')}>{target.hash}</span>
          </div>
        </div>
      </div>
    );
  }

  renderButtons() {
    const {state}= this.props.session;
    return (
      <div className={cx('action-btns')}>
        <i className={cx('fa','fa-play-circle', 'start-btn')}/>
        <i className={cx('fa','fa-stop-circle', 'stop-btn')}/>
        <i className={cx('fa','fa-remove', 'delete-btn')}/>
      </div>
    )
  }
}
