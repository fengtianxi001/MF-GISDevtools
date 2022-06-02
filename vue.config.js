const path = require("path"); //引入path模块
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  publicPath: "./",
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "mtools-dev",
        productName: "mtools2.0",
        copyright: "Copyright © 2021", // 版权信息
        directories: {
          output: "./dist", // 输出文件路径
        },
        win: {
          // win相关配置
          icon: "./favicon.ico", // 图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: "nsis", // 利用nsis制作安装程序
              arch: [
                "x64", // 64位
                "ia32", // 32位
              ],
            },
          ],
        },
      },
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("./src"));
    config.module.rule("svg").exclude.add(resolve("./src/icons/menus")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("./src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/variable.scss" as *;
          @use "@/assets/styles/theme.scss" as *;
          @use "@/assets/styles/mixins.scss" as *;
          @use "@/assets/styles/base.scss" as *;
          @use "@/assets/styles/reset.scss" as *;
        `,
      },
    },
  },
  configureWebpack: {
    plugins: [],
  },
};
