// NOTE: Remember to use '@oneisland/worker-module/loader' for the loader outside this example

// Webpack rules for building
module.exports = {
  entry: `${__dirname}/src/app.js`,
  output: {
    publicPath: `/`,
    path: `${__dirname}/dist/`,
    filename: `app.js`,
  },
  module: {
    rules: [{
      test: /(.*)(?:worker\.js)$/,
      loader: `../loader`,
      options: {
        publicPath: `/`,
        path: `${__dirname}/dist/`,
        filename: `[name].js`
      }
    }]
  },
  devServer: {
    contentBase: `${__dirname}/dist/`,
    compress: true,
    port: 8080
  }
};