import {
  FETCH_EXAM_SUCCESS,
  FETCH_EXAMS_ERROR,
  FETCH_EXAMS_START,
  FETCH_EXAMS_SUCCESS, FINISH_EXAM, EXAM_NEXT_QUESTION, EXAM_RETRY,
  EXAM_SET_STATE
} from '../actions/actionTypes';

const initialState = {
  exams: [],
  exam: null,
  error: null,
  loading: false,
  results: {},
  isFinished: false,
  currentQuestion: 0,
  optionState: null
}

export default function examReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXAMS_START:
      return {
        ...state, loading: true
      }
    case FETCH_EXAM_SUCCESS:
      return {
        ...state, loading: false, exam: action.exam
      }
    case FETCH_EXAMS_SUCCESS:
      return {
        ...state, loading: false, exams: action.exams
      }
    case FETCH_EXAMS_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    case EXAM_SET_STATE:
      return {
        ...state, optionState: action.optionState, results: action.results
      }
    case EXAM_NEXT_QUESTION:
      return {
        ...state, optionState: null, currentQuestion: action.number
      }
    case FINISH_EXAM:
      return {
        ...state, isFinished: true
      }
    case EXAM_RETRY:
      return {
        ...state,
        currentQuestion: 0,
        optionState: null,
        isFinished: false,
        results: {}
      }
    default:
      return state
  }
}