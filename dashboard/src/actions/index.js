import { getRepos } from '../api/github';

export function toggleFavorite(repositoryId) {
  return {
    type: 'TOGGLE_FAVORITE',
    repositoryId
  };
}

export function fetchRepoList() {
  return {
    types: ['FETCH_REPOSITORY_REQUEST', 'FETCH_REPOSITORY_SUCCESS', 'FETCH_REPOSITORY_FAILURE'],
    callAPI: () => getRepos()
  };
}
