var path = require("path");

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: {
    content_script: [path.join(__dirname, 'src/content_script')],
    background_script: [path.join(__dirname, '../src/background_script')],
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "ts-loader"}
    ]
  }
};
