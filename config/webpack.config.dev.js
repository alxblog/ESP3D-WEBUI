const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
module.exports = merge(commonConfig, {
    optimization: {
        minimize: false
    },
    devtool: "eval-cheap-source-map",
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        historyApiFallback: true,
        compress: true,
        port: 8088,
        open: "Google Chrome",
        watchContentBase: true
    }
})

