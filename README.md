# Scroll Restoration with `react-router-dom` [SOLVED]

I accidentally saw a working scroll restoration on this [website](https://wattenberger.com/blog/react-hooks).<br/>
Here is the [repo](https://github.com/Wattenberger/Wattenberger-2019) of the website.

By the way, this implementation works because there is not any async api call to fetch the content. Therefore, the height of each page is always static.

## TODO

- [DONE] Make a custom hook and use functional component instead of class component
- Add async api call to make page's height dynamic
- Use `localStorage` to store scroll position of every page instead of the original implementation
