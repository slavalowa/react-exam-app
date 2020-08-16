import React from 'react'
import classes from './Input.css'

const Input = props => {
  const cls = [classes.Input]
  const key = `${props.type}-${Math.random()}` || `text - ${Math.random()}`

  const validity = props => {
    if (isInvalid(props)) {
      cls.push(classes.Invalid)
      return props.errorMessage || 'Please enter the correct value'
    } else {
        return null;
    }
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={key}>{props.label}</label>
      <input
        id={key}
        type={props.type || 'text'}
        value={props.value}
        onChange={props.onChange}
      />

      <span>{validity(props)}</span>
    </div>
  )
}

const isInvalid = ({valid, touched, validationRequired}) => (
    !valid && validationRequired && touched
)

export default Input