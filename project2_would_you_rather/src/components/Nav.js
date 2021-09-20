import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { saveAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  handleLogOut = (e) => {
    this.props.selectedUser(null)
  }

  render() {
    const { authedUserID, authedUserAvatar } = this.props

    return (
      <div className="four wide column">
      <h2 className="header">Would You Rather</h2>
      <div className="ui vertical menu">
      <div className="item">
      <center><img className="ui small circular image" alt="user-avatar" src={authedUserAvatar} /></center>
      </div>
      <div className="item">
      <center><h3 className="header">Hello, {authedUserID}</h3></center>
      </div>
      <nav className='nav'>
        <ul>
          <Link to={'/home/' + authedUserID} className='item'>
            HOME
          </Link>
          <Link to={'/leaderboard'} className='item'>
            LEADER BOARD
          </Link>
          <Link to={'/add'} className='item'> 
            NEW QUESTION
          </Link>
          <Link to={'/'} className='item' onClick={this.handleLogOut}>
            LOGOUT
          </Link>
        </ul>
      </nav>
      <div className="clearfix"></div>
    </div>
    </div>
  )
  }
}

function mapStateToProps ({ authedUser }) {
  let authedUserAvatar = ''
  let authedUserID = ''

  if (authedUser !== null) {
    authedUserAvatar = authedUser.avatarURL;
    authedUserID = authedUser.id
  }

  return {
    authedUserAvatar: authedUserAvatar,
    authedUserID: authedUserID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectedUser: (user) => dispatch(saveAuthedUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)