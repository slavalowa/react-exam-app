import React, {Component} from 'react'
import classes from './Wrapper.css'
import BurgerToggle from '../components/Nav/BurgerToggle/BurgerToggle'
import Sidebar from '../components/Nav/Sidebar/Sidebar'

class Wrapper extends Component {

  state = {
    nav: false
  }

  toggleNavHandler = () => {
    this.setState({
      nav: !this.state.nav
    })
  }

  navCloseHandler = () => {
    this.setState({
      nav: false
    })
  }

  render() {
    return (
      <div className={classes.Wrapper}>

        <Sidebar
          isOpen={this.state.nav}
          onClose={this.navCloseHandler}
        />

        <BurgerToggle
          onToggle={this.toggleNavHandler}
          isOpen={this.state.nav}
        />

        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Wrapper