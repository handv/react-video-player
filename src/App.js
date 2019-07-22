import React, {Component} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './Home'
import Video from './Video'

export default class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/video" component={Video} />
        </Switch>
      </Router>
    )
  }
}
