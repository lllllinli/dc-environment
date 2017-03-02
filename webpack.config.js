const path = require("path");
const webpack = require("webpack");

// import the Extract Text Plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entryRootPath = path.resolve(__dirname, "src");
const outputRootPath = path.resolve(__dirname, "dist");

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';


const config = {
  devtool: "source-map",
  // multi entry
  entry: {
    // "page1": [
    //   hotMiddlewareScript,
    //   `${entryRootPath}/pages/index.js`
    //
    // ],
    // "page1": [
    //   hotMiddlewareScript,
    //   `${entryRootPath}/pages/about.js`
    // ],
    page1: ['./client/page1', hotMiddlewareScript],
    page2: ['./client/page2', hotMiddlewareScript],
    vendors: [ "jquery/dist/jquery.js" , hotMiddlewareScript]
  },
  output: {
    filename: './[name]/bundle.js',
    path: path.resolve(__dirname, './public'),
    //sourceMapFilename: "[file].map"
    publicPath: publicPath
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
          test: /\.(png|jpg)$/,
          use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
      }, {
          test: /\.scss$/,
          use: [
              'style-loader',
              'css-loader?sourceMap',
              'resolve-url-loader',
              'sass-loader?sourceMap'
          ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
			$                : 'jquery',
			jQuery           : 'jquery',
			'windows.jQuery' : 'jquery'
		})
  ]

};


module.exports = config;
