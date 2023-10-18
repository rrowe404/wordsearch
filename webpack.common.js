const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const nodeEnv = process.env.NODE_ENV ?? 'development';
const isProduction = nodeEnv === 'production';

module.exports = {
    entry: './src/reactMain.tsx',
    output: {
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/'),
            env: path.resolve(__dirname, 'src/environments/')
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
