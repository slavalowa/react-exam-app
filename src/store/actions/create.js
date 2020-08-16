import {BUILD_EXAM_QUESTION, RESET_EXAM_CREATION} from './actionTypes'
import axios from '../../axios/axios'

export function buildExamQuestion(question) {
  return {
    type: BUILD_EXAM_QUESTION,
    question: question
  }
}

export function resetExamBuild() {
  return {
    type: RESET_EXAM_CREATION
  }
}

export function finishBuildExam() {
  return async (dispatch, getState) => {
    await axios.post('/exams.json', getState().create.exam)
    dispatch(resetExamBuild())
  }
}