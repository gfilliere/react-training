import React, { Component, PropTypes } from 'react';
import { ControlLabel, Form, FormControl, FormGroup, PageHeader, Radio } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchRepoList } from '../actions/';
import RepoList from './RepoList';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filter: {
        text: '',
        repoStatus: 'favorites'
      }
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.showAllRepos = this.showAllRepos.bind(this);
    this.showFavoritesRepos = this.showFavoritesRepos.bind(this);
  }

  componentWillMount() {
    this.props.fetchRepoList();
  }

  getFilteredRepos() {
    return this.props.repos.filter(
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
    return this.props.favorites.indexOf(id) !== -1;
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
    const { loading } = this.props;

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
  fetchRepoList: PropTypes.func
};

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    repos: state.repositories.repos,
    loading: state.repositories.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRepoList: () => dispatch(fetchRepoList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
