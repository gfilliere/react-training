import { getFavoritesRepos, setFavoritesRepos } from '../utils/favoriteManagement';

const initialState = getFavoritesRepos();

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      let nextFavorites = state;
      const { repositoryId } = action;

      if (state.indexOf(repositoryId) !== -1) {
        nextFavorites = state.filter(item => item !== repositoryId);
      }
      else {
        nextFavorites = [...state, repositoryId];
      }

      setFavoritesRepos(nextFavorites);
      return nextFavorites;
    }

    default:
      return state;
  }
}
