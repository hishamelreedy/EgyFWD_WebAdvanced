import { _getUsers } from "../utils/_DATA";

export const GET_USERS = 'GET_USERS'

//LOADS ALL USERS
function getUsers (users) {
  return {
    type: GET_USERS,
    users
  }
}

export const loadingUsers = () => {
  return dispatch => {
    const allusers= _getUsers().then(response => dispatch(getUsers(response)))
    allusers.then((value)=>{
      console.log("Testing-----",value.users);
    });
    return _getUsers().then(response => dispatch(getUsers(response)))
  }
}