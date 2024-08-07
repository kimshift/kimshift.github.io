import { defineComponent, h } from 'vue'
// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import pinia from './stores'
import { useArticleStore } from './stores/article'
import App from './App.vue'
// 时间线组件
// import Timeline from './components/Timeline.vue'
import Boxx from './components/Boxx/index.vue'

// 内置一些特殊的主题色
import './styles/theme/inline-theme.var.css'
import './styles/theme/dark-transition.css'

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
import 'element-plus/theme-chalk/dark/css-vars.css'

// custom theme
import './style.css'

function withConfigProvider(App) {
  return defineComponent({
    name: 'ConfigProvider',
    setup(_, { slots }) {
      const { initDocs } = useArticleStore()
      initDocs() //初始化缓存文章
      return () => h(App, null, slots)
    },
  })
}

// 配置自定义主题
const customTheme = {
  Layout: withConfigProvider(App),
  enhanceApp(ctx) {
    ctx.app.use(pinia)
    DefaultTheme.enhanceApp(ctx)
    // ctx.app.component('Timeline', Timeline) //全局注册组件
    ctx.app.component('Boxx', Boxx)
  },
}

export default {
  ...DefaultTheme,
  ...customTheme,
}
