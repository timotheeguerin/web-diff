import React, {Component, PropTypes} from 'react';
import RevisionItem from './Item';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/list';

const cx = classNames.bind(styles);

class RevisionPicker extends Component {
  static propTypes = {
    revisions: PropTypes.array.isRequired,
    onRevisionSelected: PropTypes.func.isRequired,
    selectedRevisionHash: PropTypes.string
  };

  render() {
    const {revisions, selectedRevisionHash, onRevisionSelected} = this.props;
    const revisionItems = revisions.map((revision, key) => {
      const isSelected = revision.hash === selectedRevisionHash;
      return (
        <RevisionItem index={key}
                      key={revision._id}
                      revision={revision}
                      isSelected={isSelected}
                      onSelect={onRevisionSelected}/>);
    });

    return (
      <div className={cx('accounts-container')}>
        <div className={cx('list')}>{revisionItems}</div>
      </div>
    );
  };
}
export default RevisionPicker;
