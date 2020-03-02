var path = require("path");
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: {
    content_script_get_selection: [path.join(__dirname, 'src/content_script_get_selection')],
    content_script_show_message: [path.join(__dirname, 'src/content_script_show_message')],
    background_script: [path.join(__dirname, 'src/background_script')],
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};
