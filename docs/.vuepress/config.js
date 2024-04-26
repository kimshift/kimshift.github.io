/**
 * @Description: 配置文件
 * @Version: 1.0
 * @Author: 琴时
 */
const headConf = require('./config/head')
const pluginsConf = require('./config/plugins')
const themeConf = require('./config/theme')
const { NODE_ENV, YUN_ENV, VALINE_ENV } = process.env
console.log('当前环境:', NODE_ENV)
console.log('云服务器:', YUN_ENV)
console.log('开启评论:', VALINE_ENV)
module.exports = {
  base: '/', //gitee pages访问路径<仓库名称> 【打包至gitee.io才需要路径】
  title: YUN_ENV === 'true' ? '圆梦琴时' : 'KimShift 空间',
  description: '记得要奔走在自己的热爱里🌹',
  dest: 'dist', //打包到根路径dist目录
  port: '8080', //开发环境服务端口
  theme: 'reco',
  head: headConf,
  themeConfig: themeConf,
  markdown: {
    lineNumbers: true,
  },
  plugins: pluginsConf,
}
