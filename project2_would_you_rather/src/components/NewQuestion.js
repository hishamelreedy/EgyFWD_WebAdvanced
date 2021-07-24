import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Nav from './Nav'
import { addQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    redirectToNewPage: false,
  }

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value

    this.setState({ optionOne: optionOne });
  }

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value

    this.setState({ optionTwo: optionTwo });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(addQuestion(optionOne, optionTwo));
    this.setState({ userID: true });
    this.setState({ redirectToNewPage: true });
  }

  render() {
    const { authedUser, authedUserAvatar, authedUserID } = this.props
    const { optionOne, optionTwo, redirectToNewPage } = this.state

    if (redirectToNewPage) {
      return (
        <Redirect to={"/home/" + authedUserID}/>
      )
    }

    if (authedUser === null) {
      return <Redirect to='/' />
    }

    return(
      <div className="ui grid">
      <Fragment>
        <Nav avatar={authedUserAvatar}/>
        <div className="twelve wide stretched column">
          <form className='ui form' onSubmit={this.handleSubmit}>
            <h1 className='title'> Would you rather... </h1>
            <div class="field">
            <input 
              placeholder='Enter Option One Here' 
              value={optionOne}
              className='question-option1' 
              onChange={this.handleChangeOptionOne}
              />
              </div>
              <div className="ui horizontal divider">
                <h5> OR </h5>
              </div>
              <div class="field">
            <input 
              placeholder='Enter Option Two Here' 
              value={optionTwo}
              className='question-option2' 
              onChange={this.handleChangeOptionTwo}
              />
              </div>
            <center><input type='submit' className='ui button' value="ADD"/></center>
          </form>
          </div>
      </Fragment>
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
    authedUser: authedUser,
    authedUserAvatar: authedUserAvatar,
    authedUserID: authedUserID
  }
}

export default connect(mapStateToProps)(NewQuestion)