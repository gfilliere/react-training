import { combineReducers } from 'redux';
import favorites from './favorites';
import repositories from './repositories';

const rootReducer = combineReducers({
  favorites,
  repositories
});

export default rootReducer;
