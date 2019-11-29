import React from 'react'
import { Link } from 'react-router-dom'
import './page1.css'

function Page1(props) {
  return (
    <div className="page">
      <div className="nav">
        <Link to="/">Go home</Link>
      </div>
      <p>Lorem ipsum</p>
    </div>
  )
}

export default Page1
