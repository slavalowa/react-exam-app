import React, {Component} from 'react'
import classes from './Exam.css'
import {connect} from 'react-redux'
import {fetchExamById, examOptionClick, retryExam} from '../../store/actions/exam'
import Loader from '../../components/UI/Loader/Loader'
import CurrentExam from '../../components/CurrentExam/CurrentExam'
import ExamResults from '../../components/ExamResults/ExamResults'

class Exam extends Component {

  componentDidMount() {
    this.props.fetchExamById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryExam()
  }

  loadingHandler() {
    if (this.props.loading || !this.props.exam) {
      return <Loader/>
    } else {
      return this.examHandler()
    }
  }

  examHandler() {
    return this.props.isFinished ?
        <ExamResults
            results={this.props.results}
            exam={this.props.exam}
            onRetry={this.props.retryExam}
        /> :
        <CurrentExam
            options={this.props.exam[this.props.currentQuestion].options}
            question={this.props.exam[this.props.currentQuestion].question}
            onOptionClick={this.props.examOptionClick}
            examLength={this.props.exam.length}
            optionNumber={this.props.currentQuestion + 1}
            state={this.props.optionState}
        />
  }

  render() {
    return (
      <div className={classes.Exam}>
        <div className={classes.ExamBox}>
          <h1>Show me what you got!</h1>
          {this.loadingHandler()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exam: state.exam.exam,
    currentQuestion: state.exam.currentQuestion,
    optionState: state.exam.optionState,
    isFinished: state.exam.isFinished,
    results: state.exam.results,
    loading: state.exam.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchExamById: id => dispatch(fetchExamById(id)),
    examOptionClick: optionId => dispatch(examOptionClick(optionId)),
    retryExam: () => dispatch(retryExam())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exam)