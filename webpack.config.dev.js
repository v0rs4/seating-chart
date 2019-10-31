const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
  context: path.resolve(__dirname, 'src/client'),
  entry: {
    main: [hotMiddlewareScript, './index.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html",
      inject: 'head'
    })
  ]
};