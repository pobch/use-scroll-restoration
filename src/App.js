import React, { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setUsers(Array(100).fill(null))
      setIsLoading(false)
    }, 2000)
  }, [])

  // const prevPathname = useRef()
  // useEffect(() => {
  //   if (
  //     props.history.action === 'POP' &&
  //     props.location.pathname !== prevPathname.current &&
  //     sessionStorage.getItem(props.location.key) &&
  //     users.length > 0
  //   ) {
  //     // @BUG: This won't be called as expected because of the following scenario.
  //     //  1. When first mount, we are calling the api.
  //     //    At that time, props.location.pathname ('/') !== prevPathname.current (null) but users.length === 0
  //     //  2. Then, we receive the api response.
  //     //    At that time, users.length > 0 but props.location.pathname ('/') === prevPathname.current ('/')
  //     window.requestAnimationFrame(() => {
  //       scrollTo(sessionStorage.getItem(props.location.key))
  //     })
  //   }
  //   prevPathname.current = props.location.pathname
  // }, [props.history.action, props.location.key, props.location.pathname, users])

  return (
    <div className="App">
      <div className="App-header">
        <h1>Home Page (Data from API)</h1>
      </div>
      {isLoading ? (
        <div className="loading">Fetching API...</div>
      ) : (
        <ul className="list-container">
          {users.map((_, i) => {
            return (
              <li className="list-item" key={i}>
                /home | Item {i + 1}
                <br />
                Go to <Link to="/page1">Page1</Link> <Link to="/page2">Page2</Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default App
