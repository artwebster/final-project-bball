import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

// adding some default styling

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

:root {
  --font-color: #202020;
  --background-color: #eee;
  --medium-size-step: #E8E8E8;
  --large-size-step1: #EAEAEA;
  --large-size-step2: #E5E5E5;
  --inbetween-color: #E1E1E1;
  --secondary-color: #d3d3d3;
  --link-color: cornflowerblue;
  --base-color: white;
  --inverse-base: black;
  --news-top: #3285ef;  
  --highlight-color: rgba(0, 204, 102, 0.5);
  --orange: #f8510e;
  --box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

[data-theme="dark"] {
  --font-color: #eee;
  --background-color: #202020;
  --medium-size-step: #232A2A;
  --large-size-step1: #222626;
  --large-size-step2: #242D2D;
  --inbetween-color: #263333;
  --secondary-color: #505050;
  --link-color: lightblue;
  --base-color: black;
  --inverse-base: white;
  --news-top: rgba(12, 35, 64, 1);
  --highlight-color: rgba(0, 204, 102, 0.5);
  --box-shadow: 0px 0px 21px 10px rgba(0, 0, 0, 0.3);
}

body {
  background-color: var(--background-color);
  color: var(--font-color);
}

a {
  color: var(--link-color);
}

p, h1, h2, h3, h4, h5, h6, button {
  color: var(--font-color)
}

h1 {
  font-weight: 300;
} 

button {
  border: none;
  background: none;
  cursor: pointer;
}

`;
