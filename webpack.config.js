const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/reactMain.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
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
    }
}