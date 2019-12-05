import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './page1.css'
import { scrollTo } from './scrollTo'

function Page1(props) {
  useEffect(() => {
    if (sessionStorage.getItem(props.location.key)) {
      window.requestAnimationFrame(() => {
        scrollTo(sessionStorage.getItem(props.location.key))
      })
    }
  }, [props.location.key])

  return (
    <div className="page">
      <div className="nav">
        <Link to="/">Go home</Link> <Link to="/page1">Page1</Link> <Link to="/page2">Page2</Link>
      </div>
      <p>Lorem ipsum {props.location.pathname}</p>
    </div>
  )
}

export default Page1
