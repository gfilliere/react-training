import createReducer from './createReducer';

const initialState = {
  loading: false,
  error: false,
  repos: []
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
  }
});
