import React from 'react'
import classes from './CurrentExam.css'
import OptionsList from './OptionsList/OptionsList'

const CurrentExam = props => {
  return (
    <div className={classes.CurrentExam}>
      <p className={classes.Question}>
        <span>
          <strong>{props.optionNumber}.</strong>&nbsp;
          {props.question}
        </span>
        <small>{props.optionNumber} from { props.examLength }</small>
      </p>

      <OptionsList
        state={props.state}
        options={props.options}
        onOptionClick={props.onOptionClick}
      />
    </div>
  )
}

export default CurrentExam