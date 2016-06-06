import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleFavorite, fetchPulls } from '../actions';

import { Badge, Glyphicon, Panel } from 'react-bootstrap';

class Repo extends Component {
  componentWillMount() {
    if (this.props.favorite) {
      this.props.fetchPulls();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorite && !this.props.favorite) {
      this.props.fetchPulls();
    }
  }

  renderDetails() {
    if (this.props.isFetching) {
      return null;
    }
    return (
      <div>
        <Glyphicon glyph="glyphicon glyphicon-random" />
        {' '}Pull requests: <Badge>{this.props.items.length}</Badge>
      </div>
    );
  }

  render() {
    return (
      <Panel style={{ flex: 1, flexBasis: '20%' }}>
        <label>
          <input
            type="checkbox"
            checked={this.props.favorite}
            onChange={this.props.toggleFavorite}
          />
          {this.props.full_name}
        </label>
        {this.props.favorite ? this.renderDetails() : null}
      </Panel>
    );
  }
}

Repo.propTypes = {
  id: PropTypes.number,
  full_name: PropTypes.string,
  name: PropTypes.string,
  favorite: PropTypes.bool.isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string
  }),
  isFetching: PropTypes.bool,
  items: PropTypes.array,
  toggleFavorite: PropTypes.func,
  fetchPulls: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    favorite: state.favorites.indexOf(ownProps.id) !== -1,
    isFetching: state.pulls[ownProps.full_name] ?
      state.pulls[ownProps.full_name].isFetching : false,
    items: state.pulls[ownProps.full_name] ?
      state.pulls[ownProps.full_name].items : []
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleFavorite: () => dispatch(toggleFavorite(ownProps.id)),
    fetchPulls: () => dispatch(fetchPulls(ownProps.owner.login, ownProps.name, ownProps.full_name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Repo);
