import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../../../actions/post_actions';
import { openModal } from '../../../actions/modal_actions';
import Post from './post_item';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.currentUser]
});

const mDTP = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  openEditPostModal: post => dispatch(openModal("editPost", post)),
  deletePost: post => dispatch(deletePost(post))
});

export default connect(mSTP, mDTP)(Post);