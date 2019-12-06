# Scroll Restoration with `react-router-dom`

I accidentally saw a working scroll restoration on this [website](https://wattenberger.com/blog/react-hooks).<br/>
Here is the [repo](https://github.com/Wattenberger/Wattenberger-2019) of the website.

By the way, this implementation works because there is not any async api call to fetch the content. Therefore, the height of each page is always static.

## TODO

1. [DONE] Make a custom hook and use functional component instead of class component
2. [DONE] Add async api call to make page's height dynamic
3. [DONE with pitfalls] Use `sessionStorage` to store scroll position of every page instead of the original implementation
4. [DONE but create bugs as 6., 7.] Fix bug that occurs because of this execution order (DOM updated happens before clearing the last effect):

```
render -> useEffect -> *re-render (update) -> *DOM updated -> *clear last effect -> useEffect
render -> useEffect -> *render (mount) -> *clear last effect -> *DOM updated -> useEffect
```

5. [DONE] Use `window`'s `scroll` event to save the scroll postion into `sessionStorage` instead.
6. Bug#1: Find '@BUG' keyword to see more details
7. Bug#2: The `window`'s `scroll` can be triggered by a browser when an user navigates to a new page which has different height from the previous page. Hence, the saved scroll position in `sessionStorage` can be replaced unexpectedly.

- Try this way instead: https://github.com/janpaul123/delayed-scroll-restoration-polyfill

## Quirks that I found

1. If an `<a>` tag was clicked, the returned function of `useEffect()` will not be called, i.e. `componentWillUnmount()` will not be called.
2. Because of **1.**, we cannot save the scroll position in `sessionStorage` or set `history.scrollRestoration` back to `auto` while an user navigating to an external link, i.e. clicking `<a>` tag.
3. Setting `history.scrollRestoration = 'manual'` affects all websites in the current tab, not just our own website.
4. On Firefox, if we don't set `history.scrollRestoration = 'manual'`, the forward button will cause `window.scrollY = 0` before saving to `sessionStorage`.
5. On Firefox, when we set `history.scrollRestoration = 'manual'`, we also have to manually call `scrollTo(0)` on every `PUSH` page, not only on `POP` pages.
