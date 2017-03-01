const path = require("path");
const webpack = require("webpack");

// import the Extract Text Plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  // 入口網站
  entry: {
    "index-page": ["./src/pages/index.js", "./src/common.js"],
    "about-page": "./src/pages/about.js"
  },
  output: {
    // 檔名
    filename: '[name][id].js',
    // 位置
    path: path.resolve(__dirname, 'dist/js/pages')
  },
  //
  resolve: {
    alias: {
      "node_modules": path.resolve(__dirname, 'node_modules'),
      pages: path.resolve(__dirname, 'src/pages/')
    }
  },
  module: {
    rules: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      {
        test: /\.png$/,
        use: { loader: 'url-loader', options: { limit: 100000 } },
      },
      {
        test: /\.jpg$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
        new ExtractTextPlugin("styles.css")
    ]

};
