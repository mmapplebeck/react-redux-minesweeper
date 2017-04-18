const path = require('path')

const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractSass = new ExtractTextPlugin({
    filename: 'style.css',
    disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use:[
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    extractSass
  ]
}