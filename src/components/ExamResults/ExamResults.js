import React from 'react'
import classes from './ExamResults.css'
import {Link} from 'react-router-dom'
import Button from '../UI/Button/Button'

const ExamResults = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)


  return (
    <div className={classes.ExamResults}>
      <ul>
        { props.exam.map((examItem, index) => {
          const cls = [
            'fa',
            props.results[examItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[examItem.id]]
          ]

          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              { examItem.question }
              <i className={cls.join(' ')} />
            </li>
          )

        }) }
      </ul>

      <p>Correct {successCount} from {props.exam.length}</p>

      <div>
        <Button onClick={props.onRetry} type="primary">Retry</Button>
        <Link to="/">
          <Button type="success">List of exams</Button>
        </Link>
      </div>
    </div>
  )
}

export default ExamResults