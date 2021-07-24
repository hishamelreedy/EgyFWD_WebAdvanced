import React, { Component } from 'react'
import { connect } from 'react-redux'
import { savingQuestionAnswer } from '../actions/questions'

class Question extends Component {
  state = {
    answer: ''
  }

  handleChange = (e) => {
    const answer = e.target.value

    this.setState({ answer: answer })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();

    const { answer } = this.state
    const { dispatch, questionID } = this.props
    
    if (!answer) {
      alert('Please select an answer.')
    } else {
      dispatch(savingQuestionAnswer(questionID, answer))
    }
  }

  render() {
    const { users, authedUser } = this.props

    return(
      <div className="ui segment">
        <div className="image">
          <img className="ui small circular image" alt="user-avatar" src={Object.values(users)[2]} /> 
        </div>
        <form className="question-form" onSubmit={this.handleSubmit}>
          {authedUser.id === this.props.author
            ? <h1 className="header">You asked:</h1>
            : <h1 className="header">{this.props.author} asks:</h1>}
            <div className="description">
          <h3> Would you rather...? </h3>
          <div className="ui radio checkbox">
          <input type='radio' name='option' value='optionOne' id='optionOne' onChange={this.handleChange}/>
          <label><h5 className="header" htmlFor='optionOne'> {this.props.optionOne} </h5></label>
          </div>
          <div className="ui horizontal divider">
                <h5> OR </h5>
              </div>
          <div className="ui radio checkbox">
          <input type='radio' name='option' value='optionTwo' id='optionTwo' onChange={this.handleChange}/> 
          <label><h5 className="header" htmlFor='optionTwo'>{this.props.optionTwo}</h5></label>
          </div>
          </div>
          <br />
          <br />
          <center><input className="ui basic green button" type='submit' value="Answer"/></center>
        </form>  
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