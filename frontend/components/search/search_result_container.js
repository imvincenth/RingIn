import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../actions/session_actions';
import { fetchUsers } from '../../actions/user_actions';
import { createConnection,fetchConnections, fetchConnection, updateConnection, deleteConnection } from '../../actions/connection_actions';
import Search from './search_result';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id],
  users: Object.values(state.entities.users),
  connections: Object.values(state.entities.connections)
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout()),
  fetchConnections: userId => dispatch(fetchConnections(userId)),
  fetchConnection: (connecteeId, connectorId) => dispatch(fetchConnection(connecteeId, connectorId)),
  createConnection: connection => dispatch(createConnection(connection)),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: connectionId => dispatch(deleteConnection(connectionId)),
});

export default withRouter(connect(mSTP, mDTP)(Search));