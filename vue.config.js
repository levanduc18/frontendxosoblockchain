const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "PenguinLott",
    manifestOptions: {
      icons: [
        {
          src: "./public/img/icons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "./public/img/icons/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],
    },
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
});
