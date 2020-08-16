import React, {Component} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Wrapper from './wrapper/Wrapper'
import Exam from './containers/Exam/Exam'
import ExamCatalogue from './containers/ExamCatalogue/ExamCatalogue'
import ExamBuilder from './containers/ExamBuilder/ExamBuilder'

class App extends Component {

  render() {

    let routes = (
        <Switch>
          <Route path="/exam-builder" component={ExamBuilder} />
          <Route path="/exam/:id" component={Exam} />
          <Route path="/" component={ExamCatalogue} />
          <Redirect to="/" />
        </Switch>
    )


    return (
      <Wrapper>
        { routes }
      </Wrapper>
    )
  }
}


export default withRouter(App)
