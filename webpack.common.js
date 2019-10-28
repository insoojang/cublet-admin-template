const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const publicURL = process.env.PUBLIC_URL;
const isProduction = process.env.NODE_ENV === 'production';

const paletteLess = fs.readFileSync('./src/styles/antd/theme/theme.less', 'utf8');
const variables = lessToJs(paletteLess);
const options = {
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './src/styles'),
    varFile: path.join(__dirname, './src/styles/antd/theme/theme.less'),
    mainLessFile: path.join(__dirname, './src/styles/index.less'),
    themeVariables: Object.keys(variables),
    indexFileName: 'index.html',
    generateOnce: false,
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                loader: 'babel-loader?cacheDirectory',
                include: path.resolve(__dirname, 'src'),
                options: {
                    presets: [
                        ['@babel/preset-env', { modules: false }],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-syntax-dynamic-import',
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        '@babel/plugin-syntax-async-generators',
                        ['@babel/plugin-proposal-class-properties', { loose: false }],
                        '@babel/plugin-proposal-object-rest-spread',
                        'react-hot-loader/babel',
                        'dynamic-import-webpack',
                        ['import', { libraryName: 'antd', style: 'css' }],
                    ],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: variables,
                        },
                    },
                ],
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    publicPath: './',
                    name: 'fonts/[hash].[ext]',
                    limit: 10000,
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            PUBLIC_URL: isProduction ? JSON.stringify(publicURL) : JSON.stringify('/'),
        }),
        // index.html 로 의존성 파일들 inject해주는 플러그인
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Admin Template',
        }),
        new AntDesignThemePlugin(options),
    ],
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            minSize: 30000,
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    priority: 20,
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all',
                },
            },
        },
        noEmitOnErrors: true,
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
    },
    node: {
        net: 'empty',
        fs: 'empty',
        tls: 'empty',
    },
};
