const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/client/Recorder/index.jsx',
  output: {
    filename: 'Recorder.jsx',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  target: 'web',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|png|gif|jpg|jpeg|eot|woff|ttf|otf)$/,
        use: ['file-loader?name=[name].[ext]&outputPath=assets/'],
      },
    ],
  },
  externals: {
    react: true,
  },
}
