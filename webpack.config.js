const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    './src/scss/style.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devtool: false,
  performance: {
    hints: false
  },
  module: {
    rules: [{
        test: /\.(sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader',
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'url-loader?limit=10000',
          {
            loader: 'img-loader'
          },
          {
            loader: 'lqip-loader',
            options: {
              base64: true,
              palette: false
            }
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8000
            }
          },
          {
            loader: "svg-url-loader",
            options: {
              encoding: "base64",
              iesafe: true,
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              },
            }
          ]
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      chunkFilename: 'css/style.css'
    })
  ]
}