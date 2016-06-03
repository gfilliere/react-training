
export function toggleFavorite(repositoryId) {
  return {
    type: 'TOGGLE_FAVORITE',
    repositoryId
  };
}
