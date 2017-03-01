const path = require("path");
const webpack = require("webpack");

// import the Extract Text Plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entryRootPath = path.resolve(__dirname, "src");
const outputRootPath = path.resolve(__dirname, "dist");


const config = {
  devtool: "source-map",
  // multi entry
  entry: {
    "index-page": [
      "webpack/hot/only-dev-server",
      `${entryRootPath}/pages/index.js`
    ],
    "about-page": [
      "webpack/hot/only-dev-server",
      `${entryRootPath}/pages/about.js`
    ],
    "vendors": ["jquery"],
    "client": 'webpack-dev-server/client?http://localhost:9000'
  },
  output: {
    // 檔名
    filename: '[name].js',
    // 位置
    path: `${outputRootPath}/pages`,
    //sourceMapFilename: "[file].map"
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
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
			$                : 'jquery',
			jQuery           : 'jquery',
			'windows.jQuery' : 'jquery'
		}),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin()
  ],

  devServer: {
    publicPath: __dirname + '/dist',
    contentBase: "./dist",
    port: 9000,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }

};


module.exports = config;
