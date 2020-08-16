import React from 'react'
import classes from './OptionItem.css'

const OptionItem = props => {
  const cls = [classes.OptionItem]

  if (props.state) {
    cls.push(classes[props.state])
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => props.onOptionClick(props.option.id)}
    >
      { props.option.text }
    </li>
  )
}

export default OptionItem