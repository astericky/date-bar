var path              = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack           = require('webpack');
var merge             = require('webpack-merge');

// get lifecycle event from command line after npm
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    common: ['webcomponents.js'],
    app:    path.join(__dirname, 'components'),
    build:  path.join(__dirname, 'build')
};

var common = {
    entry: {
        common: PATHS.common,
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: PATHS.app
            }
        ]
    },
    plugins: [
        // IMPORTANT: move HotModuleReplacementPlugin below
        new htmlWebpackPlugin({
            title: 'es2015 Web Component Tutorial'
        })
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // display only errors to reduce the amount of output
            stats: 'errors-only',

            // parse host and port from env so this is easy
            // to customize
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}
