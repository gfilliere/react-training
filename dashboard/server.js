"use strict";

const express = require("express");
const webpack = require("webpack");
const path = require("path");
const yargs = require('yargs');

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const colors = require("colors/safe");

const config = require("./webpack.config");

const HOST = yargs.argv.env.host || "localhost";
const PORT = yargs.argv.env.port || 3000;

const compiler = webpack(config);
const app = express();

const publicPath = config.output.publicPath;

app.use(webpackDevMiddleware(compiler, {noInfo: true, stats: {colors: true}, publicPath: config.output.publicPath}));

if (config.env.hot) {
   app.use(webpackHotMiddleware(compiler, {reload: true}));
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Serve static files from /web/ directory (css and images)
app.use(express.static(path.join(__dirname, './web')));

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Compilation active");
    console.info(colors.underline.green("Make sure to set assets_base_urls to http://localhost:%s/ in your parameters.yml file."), PORT);
  }
});
