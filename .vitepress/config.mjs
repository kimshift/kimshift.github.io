import { defineConfig } from 'vitepress'
import headConf from './config/head'
import themeConf, { blogTheme } from './config/theme'
export default defineConfig({
  extends: blogTheme,
  lang: 'zh-CN',
  title: 'KimShift 空间',
  description: '记得要奔走在自己的热爱里🌹',
  themeConfig: themeConf,
  head: headConf,
  lastUpdated: true,
  cleanUrls: false,
})
