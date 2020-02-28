'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const config = require('../webpack.config');

process.env.NODE_ENV = 'production';

fs.emptyDirSync(path.join(__dirname, '../dist'));
copyPublicFolder();
build();

function copyPublicFolder() {
  fs.copySync(path.join(__dirname, '../public'), path.join(__dirname, '../dist'), {
    dereference: true,
  });
}
function build() {
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        if (!err.message) {
          return reject(err);
        }
      } else {
        return resolve(stats);
      }
    });
  });
}
