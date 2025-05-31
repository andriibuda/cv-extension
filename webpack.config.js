const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    popup: "./extension/src/popup/index.tsx",
    background: "./extension/src/background/index.ts",
    content: "./extension/src/content/index.ts",
    injectButton: "./extension/src/content/injectButton.tsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "extension/public" }],
    }),
    new HtmlWebpackPlugin({
      template: "./extension/src/popup/index.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
  ],
};
