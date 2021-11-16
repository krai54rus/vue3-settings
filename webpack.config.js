const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const optimization = () => {
    const config = {
      splitChunks: {
        // вынесение в чанки отдельных библиотек(jq...)
        chunks: "all",
      },
    };
    // if (isProd) {
      config.minimizer = [
        new TerserWebpackPlugin(),
        new CssMinimizerPlugin({
            parallel: true // Using multi process concurrent execution to improve the construction speed
        }),
      ];
    // }
    return config;
};
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
    optimization: optimization(),
    devServer: {
        port: 3228,
        hot: true,
    },
    plugins: [
        // new CopyPlugin(
        //     { 
        //       patterns: [
        //         { from: path.join(__dirname, 'src'), to: './dist' },
        //       ]
        //     }
        // ),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Vue3 + TS sample',
            template: './public/index.html',
            //Compress HTML
            minify: {
                removeComments: true, // Remove comments from HTML
                collapseWhitespace: true // Remove whitespace and newline
            }
        }),
        new VueLoaderPlugin() //Plug in for parsing and converting. vue files
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test : /\.ts$/,
                
                use: [
                  'babel-loader',
                  {
                    loader: 'ts-loader',
      
                    options: {
                      appendTsSuffixTo: [/\.vue$/],
                    },
                  },
                ],
              },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset',//Automatically choose between exporting a data URI and sending a separate file
            }
        ],
    },
};