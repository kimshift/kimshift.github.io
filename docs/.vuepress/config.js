/**
 * @Description: 配置文件
 * @Version: 1.0
 * @Author: 琴时
 */
const headConf = require("./config/head");
const pluginsConf = require("./config/plugins");
const themeConf = require("./config/theme");

module.exports = {
  base: "/",
  title: "KimShift空间",
  description: "记得要奔走在自己的热爱里🌹",
  dest: "dist", //打包到根路径dist目录
  port: "8080",
  theme: "reco",
  head: headConf,
  themeConfig: themeConf,
  markdown: {
    lineNumbers: true,
  },
  plugins: pluginsConf,
};
