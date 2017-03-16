var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');
var env = process.env.NODE_ENV || 'development';
var plugins = [new HtmlWebpackPlugin({ template: './client/index.html', filename: 'index.html', inject: 'body' }),
            new webpack.HotModuleReplacementPlugin()];
var path = require('path');

console.log('NODE_ENV:', env);

if (env === 'production') {
    console.log("pushing plugins ...");
    plugins.push(new webpack.optimize.UglifyJsPlugin(), new OptimizeJsPlugin({ sourceMap: true }));
}

module.exports = {
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',      
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './client/index.js'
    ],
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    plugins: plugins,
    module: {

        rules: [{
            test: /\.js$/,
            loader: "babel-loader"
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        }]
    }
};