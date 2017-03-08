const path = require("path");
const webpack = require("webpack");

// import the Extract Text Plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const publicPath = 'http://localhost:3000/';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';


const config = {
  devtool: "source-map",
  // multi entry
  entry: {
    'index-page': ['./client/index-page', hotMiddlewareScript],
    vendors: [ "jquery", "bootstrap", hotMiddlewareScript]
  },

  output: {
    filename: './[name]/bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: publicPath
  },
  //
  resolve: {
    alias: {
      client: path.join(__dirname, "client")
    },
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".css", ".scss"]
  },
  // loaders
  module: {
    rules: [
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
        include: path.join(__dirname, 'client')
      },
      {
          test: /\.(png|jpg)$/,
          use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
      },
      {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          use: 'url-loader'
      },
      {
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
