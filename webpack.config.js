var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool :'cheap-module-source-map',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'src/build'),
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [
      { test: /.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /.scss$/,  
        use: [
            {loader:'style-loader'},
            {loader:'css-loader'},
            {loader:'sass-loader'}
          ],
        exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      {from:'src/img',to:'images'} 
  ])
  ],
  mode: 'development'
};
