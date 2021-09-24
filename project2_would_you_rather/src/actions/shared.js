import { getInitialData } from '../utils/api'
import { loadingUsers } from '../actions/users'
import { loadingQuestions } from '../actions/questions'

//GETS handInitialData FROM API AND APPLIES IT TO ACTION CREATORS
export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions })=>{
        dispatch(loadingUsers(users))
        dispatch(loadingQuestions(questions))
      })
  }
}