import { _saveSelectedUser, _getUsers } from '../utils/_DATA'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const GET_CURRENT_USER = 'GET_CURRENT_USER'

// Save authed user id after being chosen in userchoice.js and pass it to selectuser var in _data.js
function setAuthedUser (user) {
  return {
    type: SET_AUTHED_USER,
    user
  }
}


export const saveAuthedUser = user => {
  return dispatch => {
    return _saveSelectedUser(user).then(response => dispatch(setAuthedUser(response)));
  }
}

// Retrieve authed user
function retrieveAuthedUser (user) {
  return {
    type: GET_CURRENT_USER,
    user
  }
}
export const getAuthedUser = () => {
  return dispatch => {
    return _getUsers().then(response => dispatch(retrieveAuthedUser(response)))
  }
}