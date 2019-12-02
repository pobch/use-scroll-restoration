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
        <Link to="/">Go home</Link>
      </div>
      <p>Lorem ipsum</p>
    </div>
  )
}

export default Page1
