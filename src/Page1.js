import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './page1.css'
import { scrollTo } from './scrollTo'

function Page1(props) {
  const prevPathname = useRef()
  useEffect(() => {
    if (
      props.history.action === 'POP' &&
      props.location.pathname !== prevPathname.current &&
      sessionStorage.getItem(props.location.key)
    ) {
      window.requestAnimationFrame(() => {
        scrollTo(sessionStorage.getItem(props.location.key))
      })
    }
    prevPathname.current = props.location.pathname
  }, [props.history.action, props.location.key, props.location.pathname])

  return (
    <div className={`page ${props.location.pathname.slice(1)}`}>
      <div className="nav">
        <Link to="/">Go home</Link> <Link to="/page1">Page1</Link> <Link to="/page2">Page2</Link>
      </div>
      <p>Lorem ipsum {props.location.pathname}</p>
    </div>
  )
}

export default Page1
