// Vanilla JS outside React

// Check whether a browser supports `history.pushState()`
if (window.history.pushState) {
  const SCROLL_RESTORATION_TIMEOUT_MS = 3000
  const TRY_TO_SCROLL_INTERVAL_MS = 100

  const originalPushState = window.history.pushState
  const originalReplaceState = window.history.replaceState

  // Save scroll position when an user navigates away
  window.history.pushState = function(...args) {
    const newStateOfCurrentPage = {
      ...window.history.state,
      __scrollY: window.scrollY
    }
    originalReplaceState.call(window.history, newStateOfCurrentPage, '')

    // Call the original `pushState()`
    originalPushState.apply(window.history, args)
  }

  // Remain scroll position in state when calling `replaceState`
  window.history.replaceState = function(state, ...args) {
    const newState = {
      __scrollY: window.history.state && window.history.state.__scrollY,
      ...state
    }

    originalReplaceState.call(window.history, newState, ...args)
  }

  function onPopState() {
    const state = window.history.state

    if (state && Number.isFinite(state.__scrollY)) {
      setTimeout(() => {
        tryToScrollTo({
          y: state.__scrollY,
          latestTimeToTry: Date.now() + SCROLL_RESTORATION_TIMEOUT_MS
        })
      })
    }
  }

  window.addEventListener('popstate', onPopState)

  let timeoutHandle = null

  function tryToScrollTo({ y, latestTimeToTry }) {
    // cancel previos call to `tryToScrollTo()` if any
    clearTimeout(timeoutHandle)

    const body = document.body
    const html = document.documentElement

    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )

    if (documentHeight - window.innerHeight >= y || Date.now() > latestTimeToTry) {
      window.scrollTo(0, y)
    } else {
      timeoutHandle = setTimeout(
        () => tryToScrollTo({ y, latestTimeToTry }),
        TRY_TO_SCROLL_INTERVAL_MS
      )
    }
  }
}
