import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(() => (
    dispatch(logoutCurrentUser())
  ))
);

export const update = user => dispatch => (
  APIUtil.update(user).then(user => (
    dispatch(receiveCurrentUser(user))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const updatePicture = (formData, userId) => dispatch => (
  APIUtil.updatePicture(formData, userId)
    .then(user => dispatch(receiveCurrentUser(user)),
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const deletePicture = imageType => dispatch => (
  APIUtil.deletePicture(imageType)
    .then(user => dispatch(receiveCurrentUser(user)),
    err => (dispatch(receiveErrors(err.responseJSON))))
)