# Scroll Restoration with `react-router-dom`

## Websites that their scroll restoration works properly

#### 1. [Firebase](https://firebase.google.com/)

Firebase update the current page's state whenever an user scrolls. For example, if I `scrollY` to `2226` on the `https://firebase.google.com/` page, the `console.log(history.state)` at that time will be

```javascript
{
  path: 'https://firebase.google.com/'
  previousPath: undefined
  scrollX: 0
  scrollY: 2226 // the same value as the current `window.scrollY` value
}
```

I think on `scroll` event they repeatly call `history.replaceState({ ..updated state data.. }, '')`. And when an user navigate back, they do scroll restoration **before** adding `scroll` event listener.

#### 2. [Wattenberger Blog](https://wattenberger.com/blog) -- It's a static website

[Repo](https://github.com/Wattenberger/Wattenberger-2019) of the whole website.

I accidentally saw a working scroll restoration on this [blog](https://wattenberger.com/blog/react-hooks).

By the way, after reading their repo, I think their implementation works because there is not any async api call to fetch the content. It's a static website that their content already sit in the code. Therefore, the height of each page is always static.

## My research and my trial & error

#### TODO of my trial & error

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

Because of bugs and many quirks, in the end, I decided to use implementation as explained in the **Possible Solutions** section instead.

#### Possible Solutions

1. Modify `history` to save scroll position: https://github.com/janpaul123/delayed-scroll-restoration-polyfill
2. https://stackoverflow.com/a/52978973/6568503
3. https://stackoverflow.com/a/58806940/6568503
4. https://stackoverflow.com/a/57432069/6568503

#### Quirks that I found while doing trial & error

1. If an `<a>` tag was clicked, the returned function of `useEffect()` will not be called, i.e. `componentWillUnmount()` will not be called.
2. Because of **1.**, we cannot save the scroll position in `sessionStorage` or set `history.scrollRestoration` back to `auto` while an user navigating to an external link, i.e. clicking `<a>` tag.
3. Setting `history.scrollRestoration = 'manual'` affects all websites in the current tab, not just our own website.
4. On Firefox, if we don't set `history.scrollRestoration = 'manual'`, the forward button will cause `window.scrollY = 0` before saving to `sessionStorage`.
5. On Firefox, when we set `history.scrollRestoration = 'manual'`, we also have to manually call `scrollTo(0)` on every `PUSH` page, not only on `POP` pages.
