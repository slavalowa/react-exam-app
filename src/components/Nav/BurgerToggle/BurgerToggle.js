import React from 'react'
import classes from './BurgerToggle.css'

const BurgerToggle = props => {
  const cls = [
    classes.BurgerToggle,
    'fa'
  ]

  if (props.isOpen) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }

  return (
    <i className={cls.join(' ')} onClick={props.onToggle}/>
  )
}

export default BurgerToggle