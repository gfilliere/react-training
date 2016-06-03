import React, { PropTypes } from 'react';

import Repo from './Repo';

function RepoList(props) {
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexFlow: 'row wrap',
    alignContent: 'flex-end'
  };
  return (
    <div>
      <p>{props.title}</p>
      <div style={styles}>
        {
          props.repos.map(
            (repo) => (
              <Repo
                key={repo.id}
                {...repo}
              />
            )
          )
        }
      </div>
    </div>
  );
}

RepoList.propTypes = {
  title: PropTypes.string,
  repos: PropTypes.array
};

export default RepoList;
