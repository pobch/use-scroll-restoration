import React from 'react'
import { Link } from 'react-router-dom'
import './page1.css'

function Page1(props) {
  // const prevPathname = useRef()
  // useEffect(() => {
  //   if (
  //     props.history.action === 'POP' &&
  //     props.location.pathname !== prevPathname.current &&
  //     sessionStorage.getItem(props.location.key)
  //   ) {
  //     window.requestAnimationFrame(() => {
  //       scrollTo(sessionStorage.getItem(props.location.key))
  //     })
  //   }
  //   prevPathname.current = props.location.pathname
  // }, [props.history.action, props.location.key, props.location.pathname])

  return (
    <div className={`page ${props.location.pathname.slice(1)}`}>
      <div className="nav">
        Go to <Link to="/">Home</Link> <Link to="/page1">Page1</Link> <Link to="/page2">Page2</Link>
      </div>
      <h1>{props.location.pathname.slice(1)} (No Data from API)</h1>
      {Array(80)
        .fill(null)
        .map((_, i) => {
          return (
            <p key={i}>
              {props.location.pathname} | Item {i + 1}
            </p>
          )
        })}
    </div>
  )
}

export default Page1
