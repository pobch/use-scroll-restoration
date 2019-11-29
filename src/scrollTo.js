// from https://gist.github.com/andjosh/6764939
export function scrollTo(to = 0, duration = 200, element, isHorizontal = false, onEnd = () => {}) {
  const scrollElement = element || document.scrollingElement || document.documentElement
  var start = scrollElement[isHorizontal ? 'scrollLeft' : 'scrollTop'],
    change = to - start,
    currentTime = 0,
    increment = 20

  var animateScroll = function() {
    var val = easeInOutQuad(currentTime, start, change, duration)
    if (currentTime <= duration) {
      scrollElement[isHorizontal ? 'scrollLeft' : 'scrollTop'] = val
      currentTime += increment
      setTimeout(animateScroll, increment)
    } else {
      onEnd()
    }
  }
  animateScroll()
}

//t = current time
//b = start value
//c = change in value
//d = duration
const easeInOutQuad = function(t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}
