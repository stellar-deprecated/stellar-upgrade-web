'use strict';

var _           = require('lodash');
var gulp        = require('gulp');
var path        = require('path');
var webpack     = require("webpack");

gulp.task('default', ['build']);

var webpackOptions = {
  entry: {
    app: "./app.js"
  },
  output: {
    publicPath: ''
  },
  devtool: "source-map",
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/},
    ]
  },
  node: {
    fs: 'empty'
  }
};

gulp.task('build', function(done) {
  var options = merge(webpackOptions, {
    bail: true,
    output: {
      filename: "[name].js",
      path: __dirname+'/dist'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  });

  var compiler = webpack(options);
  compiler.purgeInputFileSystem();
  compiler.run(done);
});


function merge(object1, object2) {
  return _.merge(object1, object2, function(a, b) {
    if (_.isArray(a)) {
      return a.concat(b);
    }
  });
}
