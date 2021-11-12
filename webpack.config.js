const path = require('path');

module.exports = {
    mode: 'development',//development environment, production mode
    entry: './src/index.js',//Import file
    output: {
        filename: '[name].[contenthash].js',// output file
        path: path.resolve(__dirname, 'dist'),// Storage address of output file
    },
    resolve: {
        extensions: ['.vue', '.ts', '.js', '.jsx', '.json'], //It means that the file suffix can not be written in the import file
        alias: {
            '@': path.join(__dirname, 'src')
            //When the import file is in src, it can be written as @ / component /
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset',//Automatically choose between exporting a data URI and sending a separate file
            }
        ],
    },
};