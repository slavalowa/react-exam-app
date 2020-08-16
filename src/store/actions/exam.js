import axios from '../../axios/axios'
import {
  FETCH_EXAM_SUCCESS, FETCH_EXAMS_SUCCESS, FETCH_EXAMS_ERROR,
  FETCH_EXAMS_START, EXAM_NEXT_QUESTION, EXAM_RETRY,
  EXAM_SET_STATE, FINISH_EXAM
} from './actionTypes'

export function fetchExamById(examId) {
  return async dispatch => {
    dispatch(fetchExamsStart())

    try {
      const response = await axios.get(`/exams/${examId}.json`)
      const exam = response.data

      dispatch(fetchExamSuccess(exam))
    } catch (e) {
      dispatch(fetchExamsError(e))
    }
  }
}

export function fetchExams() {
  return async dispatch => {
    dispatch(fetchExamsStart())
    try {
      const response = await axios.get('/exams.json')

      const exams = []

      Object.keys(response.data).forEach((key, index) => {
        exams.push({
          id: key,
          name: `Exam #${index + 1}`
        })
      })

      dispatch(fetchExamsSuccess(exams))
    } catch (e) {
      dispatch(fetchExamsError(e))
    }
  }
}

export const fetchExamSuccess = exam => ({ type: FETCH_EXAM_SUCCESS, exam })
export const fetchExamsSuccess = exams => ({ type: FETCH_EXAMS_SUCCESS, exams })
export const fetchExamsError = error => ({  type: FETCH_EXAMS_ERROR, error })

export const fetchExamsStart = () => ({ type: FETCH_EXAMS_START })
export const examNextQuestion = number => ({ type: EXAM_NEXT_QUESTION, number })
export const examSetState = (optionState, results) => ({  type: EXAM_SET_STATE, optionState, results })

export const finishExam = () => ({ type: FINISH_EXAM })
export const retryExam = () => ({ type: EXAM_RETRY })

const isExamFinished = state => state.currentQuestion + 1 === state.exam.length

export function examOptionClick(optionId) {
  return (dispatch, getState) => {
    const state = getState().exam

    if (state.optionState) {
      const key = Object.keys(state.optionState)[0]
      if (state.optionState[key] === 'success') {
        return
      }
    }

    const question = state.exam[state.currentQuestion]
    const results = state.results

    if (question.correctOptionId === optionId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(examSetState({[optionId]: 'success'}, results))

      const timeout = window.setTimeout(() => {
        if (isExamFinished(state)) {
          dispatch(finishExam())
        } else {
          dispatch(examNextQuestion(state.currentQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      dispatch(examSetState({[optionId]: 'error'}, results))
    }
  }
}
