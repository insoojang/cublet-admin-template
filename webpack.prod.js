require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const baseConfig = require('./webpack.common.js');

const plugins = [
    // 로더들에게 옵션을 넣어주는 플러그인
    new webpack.LoaderOptionsPlugin({
        minimize: true,
    }),
    new WorkboxPlugin.GenerateSW({
        swDest: 'sw.js',
        skipWaiting: true,
        clientsClaim: true,
    }),
];

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: {
        vendor: [
            'react',
            'react-dom',
            'lodash',
        ],
        app: ['@babel/polyfill', path.resolve(__dirname, 'src/index.tsx')],
    },
    output: {
        // entry에 존재하는 app.js, vendor.js로 뽑혀 나온다.
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].[chunkhash:16].js',
        chunkFilename: 'js/[id].[chunkhash:16].js',
        publicPath: process.env.PUBLIC_URL,
    },
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    warnings: false,
                    compress: {
                        warnings: false,
                        unused: true, // tree shaking(export된 모듈 중 사용하지 않는 모듈은 포함하지않음)
                    },
                    ecma: 6,
                    mangle: true,
                    unused: true,
                },
                sourceMap: true,
            }),
        ],
    },
    plugins,
});
