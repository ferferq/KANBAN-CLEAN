const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
    port: 8080,
  },
  externals: {
    react: "React",
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify("http://localhost:5000"),
    })
  ]
}