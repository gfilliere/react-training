var readdirSync = require('fs').readdirSync;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var argv = require('yargs').argv;
var colors = require('colors/safe');


function getConfig(options) {
  const PATHS = {
    input: path.join(__dirname, 'src'),
    output : path.join(__dirname, 'web' ),
  };

  const config = {
    entry: {
      main: './src/index.js'
    },
    output: {
      filename: "[name].js",
      path: PATHS.output,
      publicPath: '/'
    },
    env: options,
    devtool: 'source-map',
    plugins: options.dev ? devPlugins(PATHS) : productionPlugins(PATHS),
    module: {
      loaders: [
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192'
        }
      ]
    }
  };

  if (options.dev) {
    config.debug = true;
    config.devtool = "cheap-module-source-map";
    config.module = Object.assign({}, config.module, {
      preLoaders: [
        {
          test: /\.js$/,
          include: PATHS.input,
          loader: "eslint"
        },
      ],
      loaders: config.module.loaders.concat([
        {
          test: /\.js$/,
          include: PATHS.input,
          loaders: ["babel?cacheDirectory=var/babel"]
        },
        {
          test: /\.json$/,
          include: PATHS.input,
          loaders: ["json"]
        },
        {
          test: /\.css$/,
          include: [
            PATHS.input,
            path.join(__dirname, 'node_modules')
          ],
          loader: "style!css?modules"
        },
      ]),
    });
  }
  else {
    config.module = Object.assign({}, config.module, {
      loaders: config.module.loaders.concat([
        {
          test: /\.js$/,
          include: PATHS.input,
          loaders: ["babel"]
        },
        {
          test: /\.json$/,
          include: PATHS.input,
          loaders: ["json"]
        },
        {
          test: /\.css$/,
          include: [
            PATHS.input,
            path.join(__dirname, 'node_modules')
          ],
          loader: ExtractTextPlugin.extract('css?modules')
        },
      ]),
    });
  }

  if (options.hot) {
    var port = options.port || 3000;
    config.output.publicPath = 'http://localhost:'+ port + '/';
    config.entry = Object.assign({}, config.entry, {
      main: [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?path=http://localhost:"+ port + "/__webpack_hmr"].concat(config.entry.main)
    });
  }

  return config;
}

function productionPlugins(paths) {
  return [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('../css/style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin(),
    new WebpackErrorNotificationPlugin()
  ];
}

function devPlugins() {
  return [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackErrorNotificationPlugin()
  ];
}

// Emulate Webpack 2 behavior

const env = argv.env || {}

module.exports = getConfig(env)
