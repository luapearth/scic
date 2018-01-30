const path = require('path')
var webpack = require('webpack')

module.exports = require('./webpack.config')

module.exports.output = {
  path: path.join(__dirname, 'build'),
  filename: 'js/[name].js',
}

module.exports.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  })
)

module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin())
