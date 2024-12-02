## Project Description:
- This is a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. The main page consists of a form that asks the user to enter the article url, then after submitting the form, the url is sent to another server to check the results. The returned result is the top 10 found Entities by Confidence Score.
- The second part of this app is the results screen. It has a tabel with 5 columns:
 - Column 1: Row number
 - Column 2: Matched Text, all matched text from the article that have top score
 - Column 3: Confidence Score for each text
 - Column 4: Relevance Score for each text
 - Column 5: Wiki-Link for each text (if found)
- The user can resubmit new URL of new article and get a different results.

## Dependencies

- cors
- css-loader
- dotenv
- express
- html-webpack-plugin
- node
- node-fetch
- npm
- style-loader
- webpack-cli
- workbox-webpack-plugin

## Dev-Dependencies

- @babel/core
- @babel/preset-env
- @testing-library/dom
- @testing-library/jest-dom
- babel-loader
- css-minimizer-webpack-plugin
- jest
- jest-environment-jsdom
- mini-css-extract-plugin
- sass
- sass-loader
- terser-webpack-plugin
- webpack
- webpack-dev-server

## References that I have used

- [CSS Tricks](https://webdesignerdepot.com/20-essential-css-tricks-every-designer-should-know/)
- [MDN](https://developer.mozilla.org/en-US/)
- [W3School](https://www.w3schools.com/)

## Brief about important files in the project

- webpack.dev.js: Webpack config for development mode
- webpack.prod.js: Webpack config for production mode
- server/index.js: Server logic
- __test__ contains all testing files
- src/clinet: all files related to the client
- src/server: all files related to the server


## How to run the project in development mode:

```
npm run start
npm run build-dev
```

## How to run the project in production mode:

```
npm run start
npm run build-prod
```
