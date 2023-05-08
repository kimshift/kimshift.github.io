/**
 * @Description: 配置文件
 * @Version: 1.0
 * @Author: 琴时
 */
const headConf = require('./config/head')
const pluginsConf = require('./config/plugins')
const themeConf = require('./config/theme')

module.exports = {
  /* 如果需要打包部署到云服务器 -->将base: '/vuepress/'注释掉 */
  base: '/vuepress/', //gitee pages访问路径<仓库名称> 【打包至gitee.io才解开注释】
  title: 'KimShift空间',
  description: '记得要奔走在自己的热爱里🌹',
  // dest: './dist',
  port: '8080', //开发环境服务端口
  theme: 'reco',
  head: headConf,
  themeConfig: themeConf,
  markdown: {
    lineNumbers: true,
  },
  plugins: pluginsConf,
}
