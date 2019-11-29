import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Page1 from './Page1'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import { scrollTo } from './scrollTo'

class SwitchWrapper extends Component {
  componentDidUpdate() {
    console.log('%cSCROLLED', 'background-color: salmon; color: white; padding: 3px;')
    console.log(
      'window.scrollY:',
      window.scrollY,
      ', html.scrollTop:',
      document.documentElement.scrollTop
    )
    scrollTo(0, 0)
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/page1" component={Page1} />
      </Switch>
    )
  }
}

const Wrapper = withRouter(SwitchWrapper)

ReactDOM.render(
  <BrowserRouter>
    <Wrapper />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
