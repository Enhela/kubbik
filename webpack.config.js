const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const basePath = __dirname;

module.exports = {
  mode: 'development',
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  // devtool: 'eval-source-map',
  entry: {
    app: './index.tsx',
    appStyles: ['./styles.scss', './prueba.scss'],
    vendorStyles: ['../node_modules/bootstrap/dist/css/bootstrap.css'],
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: false,
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // nombre en dist
      template: 'index.html', // nombre en el src
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    watchFiles: ['src', 'public'],
  },
};
