import React, { Component, PropTypes } from 'react';
import { getPullRequests } from '../api/github';

import { Badge, Glyphicon, Panel } from 'react-bootstrap';

class Repo extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleFavoriteChange = this.handleFavoriteChange.bind(this);
    this.state = {
      pr: [],
      loaded: false
    };
  }

  componentWillMount() {
    if (this.props.favorite) {
      this.getPullRequests();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorite && !this.props.favorite) {
      this.getPullRequests();
    }
  }

  getPullRequests() {
    getPullRequests(this.props.owner.login, this.props.name).then(
      request => {
        this.setState({
          pr: request.data,
          loaded: true
        });
      }
    );
  }

  handleFavoriteChange() {
    this.props.onChange(this.props.id);
  }

  renderDetails() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <div>
        <Glyphicon glyph="glyphicon glyphicon-random" />
        {' '}Pull requests: <Badge>{this.state.pr.length}</Badge>
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
            onChange={this.handleFavoriteChange}
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
  onChange: PropTypes.func.isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string
  })
};

export default Repo;
