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

export function setTextFilter(text) {
  return {
    type: 'TEXT_FILTER_CHANGE',
    text
  };
}

export function setRepoStatusFilter(value) {
  return {
    type: 'STATUS_FILTER_CHANGE',
    value
  };
}
