const path = require("path");
const webpack = require("webpack");

// import the Extract Text Plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entryRootPath = path.resolve(__dirname, "src");
const outputRootPath = path.resolve(__dirname, "dist");

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var CleanWebpackPlugin = require('clean-webpack-plugin');


const config = {
  //devtool: "source-map",
  // multi entry
  entry: {
    "index-page": [
      `${entryRootPath}/pages/index.js`
    ],
    "about-page": [
      `${entryRootPath}/pages/about.js`
    ],
    "vendors": [ "jquery" ]
  },
  output: {
    // 檔名
    filename: '[name].js',
    // 位置
    path: `${outputRootPath}/pages`
  },
  //
  resolve: {
    alias: {
      "pages": path.join(__dirname, "src", "pages")
    },
    modules: [ "node_modules" ],
    extensions: [
      ".json",
      ".js", ".jsx",
      ".css", ".scss"
    ]
  },
  // loaders
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, loader: "babel-loader",
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader:  ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
			$                : 'jquery',
			jQuery           : 'jquery',
			'windows.jQuery' : 'jquery'
		})
    //new webpack.NoErrorsPlugin()
  ]
};


module.exports = config;
