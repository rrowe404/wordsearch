const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    resolve: {
        alias: {
            env: path.resolve(__dirname, 'src/environments/production')
        }
    }
})
