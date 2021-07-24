import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'

class LeaderBoard extends Component {

  render() {
    const { userArray, authedUser } = this.props

    if (authedUser === null) {
      return <Redirect to='/' />
    }


    return(
      <div className="ui grid">
        <Nav />
        <div className="twelve wide stretched column">
        <h2 className="header">Leader Board</h2>
        {userArray.map(user => (
          <div key={user.id} className="ui segment">
            <div className="row"> 
              <div className="col-md-4">
                <img className="ui small circular image" alt="user-avatar" src={user.avatarURL} /> 
              </div>
              <div className="col-md-5">
                <h3 className="leader-name">{user.name}</h3>
                <h5 className="result-text"> Questions Asked:   {user.questionsResults}</h5>
                <h5 className="result-text" style={{marginTop: '15px'}}> Answered Questions: {user.answeredResults}</h5>
              </div>
              <div>
                <h3> Total Score </h3>
                <center><h5>{user.ranking} </h5></center>
              </div>
            </div>
        </div>
        ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {

  const userArray = Object.keys(users).map((user) => {
    const userInfo = {
      id: users[user].id,
      avatarURL: users[user].avatarURL,
      name: users[user].name,
      answeredResults: Object.keys(users[user].answers).length,
      questionsResults: users[user].questions.length,
    }

    const ranking = userInfo.answeredResults + userInfo.questionsResults

    userInfo.ranking = ranking;

    return userInfo;
  }).sort((a,b) => (
    b.ranking - a.ranking
  ))

  console.log(userArray)
  
  return {
    authedUser,
    userArray
  }
}

export default connect(mapStateToProps)(LeaderBoard)