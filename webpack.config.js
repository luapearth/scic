const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './index.js',
    vendor: ['react', 'react-dom', 'redux', 'react-redux'],
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: [/\.(svg|jpe?g|gif|png|ico)$/],
        use: [
          {
            loader: 'file-loader?name=[name].[ext]&outputPath=images/',
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.((ttf|eot|woff2?)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff2?)$/,
        use: 'file-loader?name=[name].[ext]&outputPath=fonts/',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers: ['last 2 versions', 'last 3 iOS versions'],
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.tmpl.html'),
      inject: 'body',
      title: 'Interest Calculator',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: process.env.NODE_ENV === 'development',
    }),
    new webpack.NamedModulesPlugin(),
  ],
}
