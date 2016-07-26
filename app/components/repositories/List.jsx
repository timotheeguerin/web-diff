import React, {PropTypes} from 'react';
import RepositoryItem from './Item';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/list';

const cx = classNames.bind(styles);

const RepositoryList = ({repositories}) => {
  const repoItems = repositories.map((repository, key) => {
    return (
      <RepositoryItem index={key}
                   key={repository._id}
                   repository={repository}/>);
  });

  return (
    <div className={cx('accounts-container')}>
      <h3 className={cx('title')}>Repositories</h3>
      <div className={cx('list')}>{repoItems}</div>
    </div>
  );
};

RepositoryList.propTypes = {
  repositories: PropTypes.array.isRequired,
};

export default RepositoryList;