export function getFavoritesRepos() {
  const lsRepos = localStorage.getItem('fav-repos');
  return lsRepos ? JSON.parse(lsRepos) : [];
}

export function setFavoritesRepos(repos) {
  return localStorage.setItem('fav-repos', JSON.stringify(repos));
}

// export function isFavorite(id) {
//   //
// }
//
// export function toggleFavorite() {
//
// }
