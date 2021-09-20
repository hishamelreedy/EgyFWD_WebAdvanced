import { _getQuestions } from '../utils/_DATA';
import { handleQuestionAnswer, handleSaveQuestion } from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

//GETS ALL QUESTIONS
function getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    questions
  }
}

export const loadingQuestions = () => {
  return dispatch => {
    return _getQuestions().then(response => dispatch(getQuestions(response)))
  }
}

//SAVE NEW QUESTION
export function saveQuestion (question) {
  return {
    type: SAVE_QUESTION,
    question
  }
}

//SAVES QUESTION ANSWER OF PARTICULAR USER
function saveAnswer ({ authedUser, qid, answer}) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export const savingAnswer = (qid, answer) => {
  return (dispatch, getState) => {
    let { authedUser } = getState()

    authedUser = Object.values(authedUser)[0]

    dispatch(saveAnswer({ authedUser, qid, answer }))

    return handleQuestionAnswer({
      authedUser,
      qid,
      answer
    })
  }
}

export const addQuestion = (optionOne, optionTwo) => {
  return (dispatch, getState) => {
    let { authedUser } = getState()

    authedUser = Object.values(authedUser)[0]

    return handleSaveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    })
      .then((question) => dispatch(saveQuestion(question)))
  }
}