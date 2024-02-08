const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      //new ImageminWebpWebpackPlugin(), //Конвертирует изображения в webp
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/img'),
            to: path.resolve(__dirname, 'build/img'),
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/favicon'),
            to: path.resolve(__dirname, 'build/favicon'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        /* {
          test: /\.html$/i,
          loader: 'html-loader',
        },*/
        {
          test: /\.(png|svg|jpg|jpeg|webp)$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
              ],
            },
          },
        }),
        //new ImageminWebpWebpackPlugin(),
      ],
    },
  }
}
