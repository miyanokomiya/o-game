const webpack = require("webpack");
const path = require("path");

const config = {
  context: path.resolve(__dirname, "src"),
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: "[name].bundle.js",
    publicPath: "/assets/"
  },
  devServer: {
    contentBase: "dist",
    port: 3000,
    inline: true
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { screw_ie8: false, warnings: false }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["es2015", { modules: false }]]
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
