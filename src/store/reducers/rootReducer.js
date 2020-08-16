import {combineReducers} from 'redux'
import examReducer from './exam'
import createReducer from './create'

export default combineReducers({
  exam: examReducer,
  create: createReducer
})