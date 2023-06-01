const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/reactMain.tsx',
    mode: isProduction ? 'production' : 'development',
    output: {
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/')
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, loader: 'ts-loader'
            },
            {
                test: /\.less?$/, use: [
                    'style-loader', 'css-loader', 'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            title: 'Word Search Generator',
            hash: isProduction,
            template: 'index.html'
        })
    ]
}