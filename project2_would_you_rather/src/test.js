import './index.css';
import {users} from './utils/_DATA'
import { createStore , getState} from 'redux'
import testred from './reducers/index'
import { getquestions, loadingQuestions } from './actions/questions';
import { getInitialData } from './utils/api';
import { handleInitialData } from './actions/shared';
import { saveAuthedUser } from './actions/authedUser';
import {loadingUsers} from './actions/authedUser';
it('renders without crashing', () => {
const newstore = createStore(testred)
console.log('Initial State', newstore.getState())
newstore.dispatch(loadingUsers(users))
console.log('Initial State', newstore.getState())
});