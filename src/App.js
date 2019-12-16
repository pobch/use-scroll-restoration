import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'
import { Link } from 'react-router-dom'
import { scrollTo } from './scrollTo'

const URL = 'https://jsonplaceholder.typicode.com/users'
const data = Array(20).fill('/page1')

function App(props) {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      axios
        .get(URL)
        .then(res => {
          setUsers(res.data)
          setIsLoading(false)
        })
        .catch(e => {
          console.error(e)
          setIsLoading(false)
        })
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {isLoading ? (
        <div className="loading">Loading . . .</div>
      ) : (
        <ul className="list-container">
          {users.map(user => {
            return (
              <li className="list-item" key={user.username}>
                {user.id} - {user.name}
                <br />
                Go to <Link to="/page1">Page1</Link>
              </li>
            )
          })}
          {data.map((route, index) => {
            return (
              <li className="list-item" key={index}>
                {index + 1} - Go to <Link to={route}>Page1</Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default App
