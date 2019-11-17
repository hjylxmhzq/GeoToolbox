const devWebpackConfig = require('./webpack.config.dev');
const prodWebpackConfig = require('./webpack.config.prod');

const env = process.env.NODE_ENV;

if (env.includes('dev')) {
  module.exports = devWebpackConfig;
} else {
  module.exports = prodWebpackConfig;
}