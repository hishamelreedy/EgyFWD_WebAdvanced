import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router";
import { saveAuthedUser } from '../actions/authedUser'

class UserChoice extends Component {
  state = {
    users: {},
    selectUser: null,
    redirectToNewPage: false,
    userID: ''
  }

  //WILL SAVE SELECTED USER TO DATABASE
  saveUserChoice = (e, user) => {
    e.preventDefault();

    this.props.selectedUser(user)
      .then (() => this.setState({ userID: user.id }))
      .then (() => this.setState({ redirectToNewPage: true }))
  }

  render () {
    const { users } = this.props
    const { redirectToNewPage, userID } = this.state

    if (redirectToNewPage) {
      return (
        <Redirect to={"/home/" + userID}/>
      )
    }
    
    return (
      <div style={{margin:"20% 20% 20% 20%"}}>
      <div className="ui message">
      <h1 className="ui dividing header">Would You Rather</h1>

      <h3 className="first">Ask questions. Get answers. Earn points.</h3>

          <h3 className="signin-text">select user to sign in</h3>
          <div className="ui middle aligned selection list">
              {Object.keys(users).map(user => (
                  <div 
                    className="item" 
                    key={users[user].id}
                    //EVENT HANDLER TO SAVE USER
                    onClick={(e) => this.saveUserChoice(e, users[user], users[user].id)}>
                    <img className="ui avatar image" alt="avatar" src={users[user].avatarURL} /> 
                    <div className='content'> 
                    <div className="header">{users[user].name}</div>
                    </div>
                  </div>
              ))}
          </div>
          </div>
      </div>
    )
  }
}

//GRABS THE USERS AS A PROP
const mapStateToProps = state => {

  return {
    users: state.users,
  }
}

//GRABS THE loadingUser() and saveAuthedUser FUNCTION FROM ACTIONS TO BE ABLE TO USE IN THIS COMPONENT
const mapDispatchToProps = dispatch => {
  return {
    selectedUser: (user) => dispatch(saveAuthedUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChoice);