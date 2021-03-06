import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/user_actions';
import { fetchPosts, deletePost } from '../../../actions/post_actions';
import { fetchComments } from '../../../actions/comment_actions';
import { openModal } from '../../../actions/modal_actions';
import { createComment } from '../../../actions/comment_actions';
import { fetchPostReactions, createPostReaction, updatePostReaction, deletePostReaction } from '../../../actions/reaction_actions';
import Post from './post_item';

const mSTP = state => ({
  sessionId: state.session.id,
  currentUser: state.entities.users[state.session.id],
  comments: Object.values(state.entities.comments),
  reactions: Object.values(state.entities.reactions),
  users: state.entities.users,
  usersArr: Object.values(state.entities.users),
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: () => dispatch(fetchPosts()),
  fetchComments: postId => dispatch(fetchComments(postId)),
  openEditPostModal: post => dispatch(openModal("editPost", post)),
  deletePost: post => dispatch(deletePost(post)),
  createComment: comment => dispatch(createComment(comment)),
  fetchPostReactions: postId => dispatch(fetchPostReactions(postId)),
  createPostReaction: reaction => dispatch(createPostReaction(reaction)),
  updatePostReaction: reaction => dispatch(updatePostReaction(reaction)),
  deletePostReaction: reactionId => dispatch(deletePostReaction(reactionId)),
  openPostShowModal: post => dispatch(openModal("postShow", post))
});

export default connect(mSTP, mDTP)(Post);