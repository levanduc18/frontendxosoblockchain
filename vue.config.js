const { defineConfig } = require("@vue/cli-service");
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
      ],
    },
  },
});
