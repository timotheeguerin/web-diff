import React, {PropTypes} from 'react';
import RepositoryItem from './Item';
import classNames from 'classnames/bind';
import styles from 'css/components/accounts/list';

const cx = classNames.bind(styles);

const RepositoryList = ({repositories, account}) => {
  const repoItems = repositories.map((repository, key) => {
    return (
      <RepositoryItem index={key}
                      key={repository._id}
                      repository={repository}
                      account={account}/>);
  });

  return (
    <div className={cx('accounts-container')}>
      <h3 className={cx('title')}>Repositories</h3>
      <div className={cx('list')}>{repoItems}</div>
    </div>
  );
};

RepositoryList.propTypes = {
  account: PropTypes.object.isRequired,
  repositories: PropTypes.array.isRequired,
};

export default RepositoryList;