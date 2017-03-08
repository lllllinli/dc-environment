'use strict';

var path = require("path");
var webpack = require("webpack");

var CleanWebpackPlugin = require("clean-webpack-plugin");
// import the Extract Text Plugin
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var optionsDevtool = "source-map";
var optionsEntry = {
  'index-page': ['./client/index-page'],
  vendors: ["jquery", "bootstrap"]
};
var optionsOutput = {
  filename: "./[name]/bundle.js",
  path: path.resolve(__dirname, "./public"),
  //sourceMapFilename: "[file].map"
  publicPath: "/"
};
var optionsResolve = {
  alias: {
    "client": path.join(__dirname, "client")
  },
  modules: ["node_modules"],
  extensions: [".js", ".jsx", ".css", ".scss"]
};

var optionsLoaders = {
  rules: [
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
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      })
    }
  ]
};

var optionsPlugins = [
  new CleanWebpackPlugin(["public"]),
  new ExtractTextPlugin({
      filename: './[name]/index.css',
      allChunks: true
  }),
  new webpack.ProvidePlugin({
    $                : 'jquery',
    jQuery           : 'jquery',
    'windows.jQuery' : 'jquery'
  })
];

var config = {
  devtool: optionsDevtool,
  // entry
  entry: optionsEntry,
  // output
  output: optionsOutput,
  //
  resolve: optionsResolve,
  // loaders
  module: optionsLoaders,
  // plugins
  plugins: optionsPlugins
};


module.exports = config;
