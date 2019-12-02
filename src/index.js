import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Page1 from './Page1'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import { scrollTo } from './scrollTo'

function SwitchWrapper(props) {
  const prevPathname = useRef()

  useEffect(() => {
    console.log('Rendered:', props.location.key)

    if (props.history.action === 'PUSH' && props.location.pathname !== prevPathname.current) {
      scrollTo(0) // default scroll duration = 200ms
    }
    // Note: props.history.action === 'POP' when...
    //       1. Back or Forward button
    //       2. The component is first mounted

    // save prev props
    prevPathname.current = props.location.pathname

    return () => {
      console.log('Unrendered:', props.location.key, window.scrollY)
      sessionStorage.setItem(props.location.key, String(window.scrollY))
    }
  }, [props.history.action, props.location.key, props.location.pathname])

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/page1" component={Page1} />
    </Switch>
  )
}

const Wrapper = withRouter(SwitchWrapper)

/** -----------------------------
 *           ReactDOM
 * ------------------------------
 */
const isFirefox = typeof InstallTrigger !== 'undefined'
if (isFirefox) {
  window.history.scrollRestoration = 'manual'
}

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
