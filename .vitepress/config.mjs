import { defineConfig } from 'vitepress'
import headConf from './config/head'
import themeConf, { blogTheme } from './config/theme'
export default defineConfig({
  base: '/',
  srcDir: 'docs', //文档根路径对应目录
  extends: blogTheme,
  lang: 'zh-CN',
  title: 'KimShift 空间',
  description: '记得要奔走在自己的热爱里🌹',
  themeConfig: themeConf,
  head: headConf,
  lastUpdated: true,
  cleanUrls: true, //去除.html后缀
})
