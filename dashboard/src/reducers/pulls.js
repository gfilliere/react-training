import createReducer from './createReducer';

const initialPullState = { // initial state for one pull request
  isFetching: false,
  items: []
};

const initialState = { }; // initial state for this reducer (an empty object)

const singlePullReducer = createReducer(initialPullState, {
  ['FETCH_PULLS_REQUEST']: (state, action) => { // eslint-disable-line
    return Object.assign(
      {},
      state,
      {
        isFetching: true
      }
    );
  },
  ['FETCH_PULLS_SUCCESS']: (state, action) => { // eslint-disable-line
    return Object.assign(
      {},
      state,
      {
        isFetching: false,
        items: action.payload.data
      }
    );
  },
  ['FETCH_PULLS_FAILURE']: (state) => { // eslint-disable-line
    return Object.assign(
      {},
      state,
      {
        isFetching: false,
        error: true
      }
    );
  }
});

export default function pullsByRepos(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PULLS_REQUEST':
    case 'FETCH_PULLS_SUCCESS':
    case 'FETCH_PULLS_FAILURE':
      return Object.assign({}, state, {
        [action.parameters.fullName]: singlePullReducer(state[action.parameters.fullName], action)
      });
    default:
      return state;
  }
}
