import React from 'react';
import { connect } from 'react-redux';
import Network from './network';

const mSTP = state => ({
  users: Object.values(state.entities.users)
});

const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(Network);