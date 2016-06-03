export default function createReducer(initialState, handlers = {}) {
  return (state = initialState, action) => { // eslint-disable-line
    return handlers[action.type] ? handlers[action.type](state, action) : state;
  };
}
