import { createStore, applyMiddleware, compose } from 'redux';
import callApiMiddleware from './callApiMiddleware';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
    compose(
      applyMiddleware(callApiMiddleware),
      window.devToolsExtension && window.devToolsExtension()
    )
  );

  if (module.hot) {
    // live reload stuff
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
