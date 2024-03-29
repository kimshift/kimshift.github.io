/**
 * @Description: 配置文件
 * @Version: 1.0
 * @Author: 琴时
 */
const headConf = require("./config/head");
const pluginsConf = require("./config/plugins");
const themeConf = require("./config/theme");
const { NODE_ENV, YUN_ENV } = process.env;
console.log("当前环境:", YUN_ENV === "false", NODE_ENV);
module.exports = {
  title: YUN_ENV === "false" ? "KimShift 空间" : "圆梦琴时",
  base: YUN_ENV === "false" && NODE_ENV === "production" ? "/vuepress/" : "/", //gitee pages访问路径<仓库名称> 【打包至gitee.io才需要路径】
  description: "记得要奔走在自己的热爱里🌹",
  // dest: YUN_ENV === "true" ? "dist" : "docs/.vuepress/dist/", //打包到根路径dist目录
  dest: "dist", //打包到根路径dist目录
  port: "8080", //开发环境服务端口
  theme: "reco",
  head: headConf,
  themeConfig: themeConf,
  markdown: {
    lineNumbers: true,
  },
  plugins: pluginsConf,
};
