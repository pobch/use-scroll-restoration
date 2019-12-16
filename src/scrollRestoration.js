// Vanilla JS outside React

// Check whether a browser supports `history.pushState()`
if (window.history.pushState) {
  const SCROLL_RESTORATION_TIMEOUT_MS = 3000
  const TRY_TO_SCROLL_INTERVAL_MS = 100

  const originalPushState = window.history.pushState
  const originalReplaceState = window.history.replaceState

  window.history.pushState = function(...arg) {
    const newStateOfCurrentPage = {
      ...window.history.state,
      __scrollX: window.scrollX,
      __scrollY: window.scrollY
    }
    originalReplaceState.call(window.history, newStateOfCurrentPage, '')

    // Call the original `pushState()`
    originalPushState.apply(window.history, arg)
  }
}
