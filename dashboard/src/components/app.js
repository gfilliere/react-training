import React, { Component, PropTypes } from 'react';
import { ControlLabel, Form, FormControl, FormGroup, PageHeader, Radio } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchRepoList, setTextFilter, setRepoStatusFilter } from '../actions/';
import RepoList from './RepoList';

class App extends Component {
  componentWillMount() {
    this.props.fetchRepoList();
  }

  renderForm() {
    return (
      <Form inline>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Search</ControlLabel>
          {' '}
          <FormControl
            type="text"
            value={this.props.textFilter}
            onChange={this.props.setTextFilter}
          />
        </FormGroup>
        {' '}
        <FormGroup controlId="filterFavorites">
          <ControlLabel>Filter</ControlLabel>
          {' '}
          <Radio
            checked={this.props.repoStatus === 'favorites'}
            onChange={this.props.showFavoritesRepos}
          >
            {' '}Only favorites
          </Radio>
          {' '}
          <Radio
            checked={this.props.repoStatus === 'all'}
            onChange={this.props.showAllRepos}
          >
            {' '}Show all repositories
          </Radio>
        </FormGroup>
      </Form>
    );
  }

  render() {
    const { loading } = this.props;

    let content = null;
    if (loading) {
      content = <p>Loading, please wait</p>;
    }
    else {
      let listTitle = 'All repositories';
      if (this.props.repoStatus === 'favorites') {
        listTitle = 'Favorites repositories';
      }
      content = (
        <RepoList
          title={listTitle}
          repos={this.props.repos}
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

App.propTypes = {
  favorites: PropTypes.array,
  repos: PropTypes.array,
  loading: PropTypes.bool,
  textFilter: PropTypes.string,
  repoStatus: PropTypes.string,
  fetchRepoList: PropTypes.func,
  showAllRepos: PropTypes.func,
  showFavoritesRepos: PropTypes.func,
  setTextFilter: PropTypes.func
};

function getVisibleRepos(repos, statusFilter, textFilter, favorites) {
  return repos.filter(
    (repo) => {
      if (statusFilter === 'all') {
        return repo.full_name.match(textFilter);
      }
      return favorites.indexOf(repo.id) !== -1
        && repo.full_name.match(textFilter);
    }
  );
}

function mapStateToProps(state) {
  const { repos, repoStatus, textFilter, loading } = state.repositories;
  return {
    favorites: state.favorites,
    repos: getVisibleRepos(repos, repoStatus, textFilter, state.favorites),
    loading,
    textFilter,
    repoStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRepoList: () => dispatch(fetchRepoList()),
    setTextFilter: (event) => dispatch(setTextFilter(event.target.value)),
    showAllRepos: () => dispatch(setRepoStatusFilter('all')),
    showFavoritesRepos: () => dispatch(setRepoStatusFilter('favorites'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
