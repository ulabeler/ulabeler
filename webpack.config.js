const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/bin/www.js',
    output: {
        path: path.resolve(__dirname, 'built'),
        filename: 'bundle.js'
    },
    externals: [nodeExternals()],
}