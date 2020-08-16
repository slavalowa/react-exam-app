import React, {Component} from 'react'
import classes from './ExamBuilder.css'
import {configValidation, validate, validateForm} from '../../validator/validator'
import {buildExamQuestion, finishBuildExam} from '../../store/actions/create';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'

function createOptionControl(number) {
  return configValidation({
    label: `Option ${number}`,
    errorMessage: 'Value cannot be empty',
    id: number
  }, {required: true})
}

function configFormValidation() {
  return {
    question: configValidation({
      label: 'Enter your question',
      errorMessage: 'Question cannot be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class ExamBuilder extends Component {

  state = {
    isFormValid: false,
    correctOptionId: 1,
    formControls: configFormValidation()
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = event => {
    event.preventDefault()

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: this.props.exam.length + 1,
      correctOptionId: this.state.correctOptionId,
      options: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    this.props.buildExamQuestion(questionItem)

    this.setState({
      isFormValid: false,
      correctOptionId: 1,
      formControls: configFormValidation()
    })
  }

  buildExamHandler = event => {
    event.preventDefault()

    this.setState({
      isFormValid: false,
      correctOptionId: 1,
      formControls: configFormValidation()
    })
    this.props.finishBuildExam()
  }

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            validationRequired={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      correctOptionId: +event.target.value
    })
  }

  render() {
    const select = <Select
      label="Please choose the correct option"
      value={this.state.correctOptionId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />

    return (
      <div className={classes.ExamBuilder}>
        <div>
          <h1>Exam Builder</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add new question
            </Button>

            <Button
              type="success"
              onClick={this.buildExamHandler}
              disabled={this.props.exam.length === 0}
            >
              Add new test
            </Button>

          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exam: state.create.exam
  }
}

function mapDispatchToProps(dispatch) {
  return {
    buildExamQuestion: item => dispatch(buildExamQuestion(item)),
    finishBuildExam: () => dispatch(finishBuildExam())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamBuilder)