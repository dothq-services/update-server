const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    target: 'node',
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    externals: [nodeExternals({
        modulesDir: path.resolve(__dirname, '../node_modules'),
    }),  nodeExternals()],
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to: 'public' }
            ]
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9050,
    }
};