const path = require('path');
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify("http://localhost:5000"),
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})