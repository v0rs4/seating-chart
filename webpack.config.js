const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src/client'),
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js'
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
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html",
      inject: 'head'
    })
  ]
};