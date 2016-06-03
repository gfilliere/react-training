
/**
 * This ius a middleware for asynchronous redux actions
 * @see http://gaearon.github.io/redux/docs/recipes/ReducingBoilerplate.html#async-action-creators for the inspiration
 *
 * @param  {Function} options.dispatch the store dispatch function
 * @param  {Function} options.getState the store getState function
 * @return {Function|Promise} the next action or promise
 */
export default function callAPIMiddleware({ dispatch, getState }) {
  return (next) => { // eslint-disable-line
    return (action) => {
      const {
        types,
        callAPI,
        shouldCallAPI = () => true,
        payload = {}
      } = action;

      if (!types) {
        // Normal action: pass it on
        return next(action);
      }

      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.');
      }

      if (typeof callAPI !== 'function') {
        throw new Error('Expected fetch to be a function.');
      }

      if (!shouldCallAPI(getState())) {
        // do nothing
        /* eslint-disable consistent-return */
        return;
        /* eslint-enable consistent-return */
      }

      const [requestType, successType, failureType] = types;

      dispatch(Object.assign({}, payload, {
        type: requestType
      }));

      return callAPI().then(
        response => dispatch(Object.assign({}, payload, {
          payload: response,
          type: successType
        })),
        error => dispatch(Object.assign({}, payload, {
          error,
          type: failureType
        }))
      );
    };
  };
}
