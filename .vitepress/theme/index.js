// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import App from './App.vue'
import { withConfigProvider } from './config'
// 时间线组件
import TimelinePage from './components/TimelinePage.vue'

// 引入时间线组件样式
import 'vitepress-markdown-timeline/dist/theme/index.css'

// 内置一些特殊的主题色
import './styles/theme/inline-theme.var.css'

// override style
import './styles/index.scss'

// element-ui
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-tag.css'
import 'element-plus/theme-chalk/el-icon.css'
import 'element-plus/theme-chalk/el-avatar.css'
import 'element-plus/theme-chalk/el-image.css'
import 'element-plus/theme-chalk/el-image-viewer.css'
import 'element-plus/theme-chalk/el-pagination.css'
import 'element-plus/theme-chalk/el-carousel.css'
import 'element-plus/theme-chalk/el-carousel-item.css'
import 'element-plus/theme-chalk/el-alert.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// custom theme
import './style.css'

// 配置自定义主题
const customTheme = {
  Layout: withConfigProvider(App),
  enhanceApp(ctx) {
    enhanceAppWithTabs(ctx.app)
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('TimelinePage', TimelinePage)
  },
}

export default {
  ...DefaultTheme,
  ...customTheme,
}