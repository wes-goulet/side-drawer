[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/wc-menu-button)

# wc-menu-button

A simple, animating menu button built as a Web Component.

![wc-menu-button demo](/demo.gif)

## [Demo](https://wc-menu-button.netlify.com/)

## Installation

You can integrate wc-menu-button via `<script>` tag or via ES Modules.

### Via `<script>` tag

In the `<head>` of your index.html put a script tag like this:

```html
<script src="https://unpkg.com/wc-menu-button/dist/wc-menu-button.js"></script>
```

Now you can use the `wc-menu-button` element anywhere in your html, JSX, template, etc.

### Via ES Modules

```bash
npm install wc-menu-button --save
```

Then, depending on the framework you are integrating into, follow the [StencilJS instructions on integration](https://stenciljs.com/docs/overview). Note: You don't have to know how StencilJS works, that site just has a nice summary of integration instructions.

### React example

There are 2 sample repos (one in JS and one in TS) that demonstrate using `wc-menu-button` web component in a React app. They demonstrate installing, setting the `is-open` attribute to a changing state object, and listening for changes by setting the `isOpenChangedFunc`.

[React consuming wc-menu-button sample repo](https://github.com/wes566/sample-react-consumes-web-component)

[React in Typescript consuming wc-menu-button sample repo](https://github.com/wes566/sample-react-ts-consumes-web-component)

## API and Customization

### Props

- `isOpen: boolean`
  - NOTE: the attribute name is `is-open` in html or React JSX
  - Tells the menu button if it should be in the open (X) or closed (hamburger) state
- `isOpenChangedFunc: (isOpen) => void`
  - A func that gets called whenever the `isOpen` state changes

### Events

- `opened`
- `closed`

### Styling

If you set certain CSS variables then the `wc-menu-button` will use those styles. There are examples in [index.html](src/index.html).

- `--wc-menu-button-width`
  - Sets the menu button width (and height will be proportionally adjusted as well)
  - Default is `37px`
- `--wc-menu-button-color`
  - Sets the color of the menu button
  - Default is `#000000` (black)
- `--wc-menu-button-hover-opacity`
  - Sets the hover opacity
  - Default is `0.75`
  - Set to `1.0` if you do not want any hover opacity effect

## Contribute

This project is based on [StencilJS](https://github.com/ionic-team/stencil-component-starter).

```bash
npm install
npm start
```

That will start a dev server and open your browser to http://localhost:3333

## Acknowledgements

Thanks to [BrowserStack](https://www.browserstack.com/) for cross browser testing.

[![BrowserStack](./browserstack-logo.png)](https://www.browserstack.com/)
