import React from 'react'
import classes from './Select.css'

const Select = props => {
  const key = `${props.label}-${Math.random()}`

  return (
    <div className={classes.Select}>
      <label htmlFor={key}>{props.label}</label>
      <select
        id={key}
        value={props.value}
        onChange={props.onChange}
      >
        { props.options.map((option, index) => {
          return (
            <option
              value={option.value}
              key={option.value + index}
            >
              {option.text}
            </option>
          )
        }) }
      </select>
    </div>
  )
}

export default Select