import GitHub from 'github-api';

import settings from '../config/settings.json';

const gh = new GitHub({
  token: settings.githubToken
});

const me = gh.getUser();

export function getRepos(params) {
  return me.getRepos(params);
}

export function getPullRequests(owner, name) {
  return gh.getRepo(owner, name).listPullRequests();
}
