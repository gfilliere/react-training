import React, { Component } from 'react';
import { ControlLabel, Form, FormControl, FormGroup, PageHeader, Radio } from 'react-bootstrap';

import RepoList from './RepoList';
import { getRepos } from '../api/github';
import { getFavoritesRepos, setFavoritesRepos } from '../utils/favoriteManagement';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filter: {
        text: '',
        repoStatus: 'favorites'
      },
      repos: [],
      favorites: [],
      loading: true
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleFavoriteChange = this.handleFavoriteChange.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
    this.showAllRepos = this.showAllRepos.bind(this);
    this.showFavoritesRepos = this.showFavoritesRepos.bind(this);
  }

  componentWillMount() {
    const favorites = getFavoritesRepos();
    getRepos({
      sort: 'pushed'
    }).then(request => {
      this.setState({
        repos: request.data,
        loading: false,
        favorites,
        filter: {
          text: '',
          repoStatus: favorites.length ? 'favorites' : 'all'
        }
      });
    });
  }

  getFilteredRepos() {
    return this.state.repos.filter(
      (repo) => {
        if (this.state.filter.repoStatus === 'all') {
          return repo.full_name.match(this.state.filter.text);
        }
        return this.isFavorite(repo.id)
          && repo.full_name.match(this.state.filter.text);
      }
    );
  }

  setRepoStatusFilter(nextFilter) {
    this.setState({
      filter: {
        text: this.state.filter.text,
        repoStatus: nextFilter
      }
    });
  }

  isFavorite(id) {
    return this.state.favorites.indexOf(id) !== -1;
  }

  handleFavoriteChange(id) {
    let nextFavorites = this.state.favorites;

    if (this.isFavorite(id)) {
      nextFavorites = nextFavorites.filter(item => item !== id);
    }
    else {
      nextFavorites.push(id);
    }

    setFavoritesRepos(nextFavorites);

    this.setState({
      favorites: nextFavorites
    });
  }

  handleFilterChange(event) {
    this.setState({
      filter: {
        text: event.target.value,
        repoStatus: this.state.filter.repoStatus
      }
    });
  }

  showAllRepos() {
    this.setRepoStatusFilter('all');
  }

  showFavoritesRepos() {
    this.setRepoStatusFilter('favorites');
  }

  renderForm() {
    return (
      <Form inline>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Search</ControlLabel>
          {' '}
          <FormControl
            type="text"
            value={this.state.filter.text}
            onChange={this.handleFilterChange}
          />
        </FormGroup>
        {' '}
        <FormGroup controlId="filterFavorites">
          <ControlLabel>Filter</ControlLabel>
          {' '}
          <Radio
            checked={this.state.filter.repoStatus === 'favorites'}
            onChange={this.showFavoritesRepos}
          >
            {' '}Only favorites
          </Radio>
          {' '}
          <Radio
            checked={this.state.filter.repoStatus === 'all'}
            onChange={this.showAllRepos}
          >
            {' '}Show all repositories
          </Radio>
        </FormGroup>
      </Form>
    );
  }

  render() {
    const { loading } = this.state;

    let content = null;
    if (loading) {
      content = <p>Loading, please wait</p>;
    }
    else {
      let listTitle = 'All repositories';
      if (this.state.filter.repoStatus === 'favorites') {
        listTitle = 'Favorites repositories';
      }
      content = (
        <RepoList
          title={listTitle}
          repos={this.getFilteredRepos()}
          isFavorite={this.isFavorite}
          handleFavoriteChange={this.handleFavoriteChange}
        />
      );
    }
    return (
      <div>
        <PageHeader>Custom Github Dashboard</PageHeader>
        {this.renderForm()}
        {content}
      </div>
    );
  }
}

export default App;

// https://github.com/michael/github
// https://developer.github.com/v3/
