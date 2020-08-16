import {BUILD_EXAM_QUESTION, RESET_EXAM_CREATION} from '../actions/actionTypes'

const initialState = {
  exam: []
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_EXAM_CREATION:
      return {
        ...state, exam: []
      }
    case BUILD_EXAM_QUESTION:
      return {
        ...state,
        exam: [...state.exam, action.question]
      }
    default:
      return state
  }
}