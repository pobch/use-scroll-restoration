import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Link } from 'react-router-dom'

const data = Array(20).fill('/page1')

function App() {
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
      <ul className="list-container">
        {data.map((route, index) => {
          return (
            <li className="list-item" key={index}>
              {index + 1} - Go to <Link to={route}>Page1</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
