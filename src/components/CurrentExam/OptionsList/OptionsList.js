import React from 'react'
import classes from './OptionsList.css'
import OptionItem from './OptionItem/OptionItem'

const OptionsList = props => {
  return (
    <ul className={classes.OptionsList}>
      { props.options.map((option, index) => {
        return (
          <OptionItem
            key={index}
            option={option}
            onOptionClick={props.onOptionClick}
            state={props.state ? props.state[option.id] : null}
          />
        )
      }) }
    </ul>
  )
}

export default OptionsList