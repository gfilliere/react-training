import { combineReducers } from 'redux';
import favorites from './favorites';
import repositories from './repositories';
import pulls from './pulls';

const rootReducer = combineReducers({
  favorites,
  repositories,
  pulls
});

export default rootReducer;
