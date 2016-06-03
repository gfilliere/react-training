import createReducer from './createReducer';

const initialState = {
  loading: false,
  error: false,
  repos: [],
  textFilter: '',
  repoStatus: 'favorites'
};

export default createReducer(initialState, {
  ['FETCH_REPOSITORY_REQUEST']: (state) => { // eslint-disable-line
    return Object.assign(
      {},
      state,
      {
        loading: true
      }
    );
  },
  ['FETCH_REPOSITORY_SUCCESS']: (state, action) => { // eslint-disable-line
    return Object.assign(
      {},
      state,
      {
        loading: false,
        repos: action.payload.data
      }
    );
  },
  ['FETCH_REPOSITORY_FAILURE']: (state) => { // eslint-disable-line
    return Object.assign(
      {},
      state,
      {
        loading: false,
        error: true
      }
    );
  },
  ['TEXT_FILTER_CHANGE']: (state, action) => { // eslint-disable-line
    return Object.assign(
      {},
      state,
      {
        textFilter: action.text
      }
    );
  },
  ['STATUS_FILTER_CHANGE']: (state, action) => { // eslint-disable-line
    return Object.assign(
      {},
      state,
      {
        repoStatus: action.value
      }
    );
  }
});
