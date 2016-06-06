import { getRepos, getPullRequests } from '../api/github';

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

export function fetchPulls(owner, name, fullName) {
  return {
    types: ['FETCH_PULLS_REQUEST', 'FETCH_PULLS_SUCCESS', 'FETCH_PULLS_FAILURE'],
    callAPI: () => getPullRequests(owner, name),
    shouldCallAPI: (state) => {return typeof state.pulls[fullName] === 'undefined'}, //eslint-disable-line
    payload: {
      parameters: {
        fullName,
        owner,
        name
      }
    }
  };
}
