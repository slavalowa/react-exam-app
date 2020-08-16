import React, {Component} from 'react'
import classes from './ExamCatalogue.css'
import {NavLink} from 'react-router-dom'
import {fetchExams} from '../../store/actions/exam';
import {connect} from 'react-redux'
import Loader from '../../components/UI/Loader/Loader'

class ExamCatalogue extends Component {

  renderExams() {
    return this.props.exams.map(exam => {
      return (
        <li key={exam.id}>
          <NavLink to={'/exam/' + exam.id}>
            {exam.name}
          </NavLink>
        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchExams()
  }

  handleCatalogueLoading() {
    if (this.props.loading && this.props.exams.length !== 0) {
      return <Loader/>
    } else {
      return <ul>{this.renderExams()}</ul>
    }
  }

  render() {
    return (
      <div className={classes.ExamCatalogue}>
        <div>
          <h1>List of Exams</h1>
          {this.handleCatalogueLoading()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exams: state.exam.exams,
    loading: state.exam.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchExams: () => dispatch(fetchExams())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamCatalogue)