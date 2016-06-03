import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
    window.devToolsExtension && window.devToolsExtension()
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
