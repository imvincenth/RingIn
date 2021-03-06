import * as UserAPIUtil from '../util/session_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const removeUser = userId => ({
  type: REMOVE_USER,
  userId
});

export const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS
});

export const fetchUsers = () => dispatch => (
  UserAPIUtil.fetchUsers()
    .then(users => (dispatch(receiveUsers(users))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const fetchUser = userId => dispatch => (
  UserAPIUtil.fetchUser(userId)
    .then(user => (dispatch(receiveUser(user))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const deleteUser = userId => dispatch => (
  UserAPIUtil.deleteUser(userId)
    .then(() => (dispatch(removeUser(userId))),
    err => (dispatch(receiveErrors(err.responseJSON))))
);