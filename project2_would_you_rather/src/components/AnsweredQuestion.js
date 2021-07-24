import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    const { users, authedUser, author, optionOne, optionTwo, optionOneVotes, optionTwoVotes } = this.props

    //const totalLength = optionOneVotes.length + optionTwoVotes.length
    const totalLength = 3
    const percentOne = (optionOneVotes.length / totalLength) * 100
    const percentTwo = (optionTwoVotes.length / totalLength) * 100

    return(
      <div className="ui segment">
        <div>
          <img className="ui small circular image" alt="user-avatar" src={Object.values(users)[2]} /> 
        </div>
        <div className="question-form">
          {authedUser.id === author
            ? <h1 className="header">You asked:</h1>
            : <h1 className="header">{author} asked:</h1>}
          <br />
          {optionOneVotes.includes(Object.values(authedUser)[0])
          ? <div className='answered-div'>
              <div className='user-choice'>
                <div className='title-user-choice'>
                  <h2>You chose to {optionOne}</h2>
                </div>
                <h3> Would you rather...? </h3>
                <h5 className="header">{optionOne}</h5>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentOne}%`}}></div>
                </div>
                <p>{optionOneVotes.length} out of {totalLength} votes</p>
              </div>
              <div className="ui horizontal divider">
                <h5> OR </h5>
              </div>
              <br />
              <div className='not-user-choice'>
              <h5 className="header">{optionTwo}</h5>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentTwo}%`}}></div>
                </div>
                <p>{optionTwoVotes.length} out of {totalLength} votes</p>
              </div>
            </div>
          : <div className='answered-div'> 
              <div className='not-user-choice'>
              <div className='title-user-choice'>
                  <h2>You chose to {optionTwo}</h2>
                </div>
              <h3> Would you rather...? </h3>
              <h5 className="header">{optionOne} </h5>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentOne}%`}}></div>
                </div>
                <p>{optionOneVotes.length} out of {totalLength} votes</p>
              </div>
              <div className="ui horizontal divider">
                <h5> OR </h5>
              </div>
              <br />
              <div className='user-choice'>
                <h5 className="header">{optionTwo}</h5>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentTwo}%`}}></div>
                </div>
                <p>{optionTwoVotes.length} out of {totalLength} votes</p>
              </div>
            </div>
          }
        </div>  
        <div className="clearfix"></div>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }, { userID }) {
  const user = users[userID];

  return {
    users: user,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(Question)