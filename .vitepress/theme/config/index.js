import { useData, useRoute, withBase } from 'vitepress'
import {
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
} from 'vue'
import { useColorMode } from '@vueuse/core'

const configSymbol = Symbol('theme-config')
const activeTagSymbol = Symbol('active-tag')
const currentPageNum = Symbol('home-page-num')

export function withConfigProvider(App) {
  return defineComponent({
    name: 'ConfigProvider',
    setup(_, { slots }) {
      const { theme } = useData()
      const config = computed(() => resolveConfig(theme.value))
      provide(configSymbol, config)

      const activeTag = ref({
        label: '',
        type: '',
      })
      provide(activeTagSymbol, activeTag)

      const pageNum = ref(1)
      provide(currentPageNum, pageNum)

      const mode = useColorMode({
        attribute: 'theme',
        modes: {
          // 内置的颜色主题
          'vp-default': 'vp-default',
          'vp-green': 'vp-green',
          'vp-yellow': 'vp-yellow',
          'vp-red': 'vp-red',
          'el-blue': 'el-blue',
          'el-yellow': 'el-yellow',
          'el-green': 'el-green',
          'el-red': 'el-red',
        },
      })
      mode.value = config.value.blog?.themeColor ?? 'vp-default'
      return () => h(App, null, slots)
    },
  })
}
export function useDocMetaInsertSelector() {
  const blogConfig = useConfig()
  const { frontmatter } = useData()
  return computed(
    () =>
      frontmatter.value?.docMetaInsertSelector ||
      blogConfig.config?.blog?.docMetaInsertSelector ||
      'h1'
  )
}

export function useDocMetaInsertPosition() {
  const blogConfig = useConfig()
  const { frontmatter } = useData()
  return computed(
    () =>
      frontmatter.value?.docMetaInsertPosition ||
      blogConfig.config?.blog?.docMetaInsertPosition ||
      'after'
  )
}

export function useConfig() {
  return {
    config: inject(configSymbol)?.value,
  }
}

export function useBlogConfig() {
  return inject(configSymbol)?.value.blog
}

export function useBlogThemeMode() {
  return inject(configSymbol)?.value?.blog?.blog ?? true
}

export function useArticles() {
  const blogConfig = useConfig()
  // console.log('测试blogConfig:', blogConfig)
  const articles = computed(() => blogConfig.config?.blog?.pagesData || [])
  // console.log('测试articles:', articles)
  return articles
}

export function useActiveTag() {
  return inject(activeTagSymbol)
}
export function useCurrentPageNum() {
  return inject(currentPageNum)
}

/*******
 * @description: 获取当前文章配置
 * @author: 琴时
 */
export function useCurrentArticle() {
  const blogConfig = useConfig()
  const route = useRoute()
  const docs = computed(() => blogConfig.config?.blog?.pagesData)
  const currentArticle = computed(() => {
    const currentPath = route.path.replace(/.html$/, '')
    // 兼容中文路径
    const okPaths = [currentPath, decodeURIComponent(currentPath)]
    // 兼容 /(index.md)
    if (currentPath.endsWith('/')) {
      okPaths.push(...[`${currentPath}index`, `${decodeURIComponent(currentPath)}index`])
    }
    return docs.value?.find(v => okPaths.includes(withBase(v.route)))
  })
  return currentArticle
}

function resolveConfig(config) {
  return {
    ...config,
    blog: {
      ...config?.blog,
      pagesData: config?.blog?.pagesData || [],
    },
  }
}

/**
 * 页面加载的时候定位到锚点内容
 */
export function useActiveAnchor() {
  const el = ref(null)
  onMounted(() => {
    const { hash } = window.location
    if (hash) {
      el.value = document.querySelector(decodeURIComponent(hash))
    }
  })
  return el
}

/**
 * 页面滚动的时候自动更新锚点
 */
export function useAutoUpdateAnchor() {
  // 初始化当前锚点
  const currentAnchor = reactive({
    id: '',
    top: -1,
  })

  // 定义计算当前锚点的方法
  const calculateCurrentAnchor = () => {
    // 获取页面中所有的锚点元素
    const anchors = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    for (let i = 0; i < anchors.length; i += 1) {
      const anchor = anchors[i]
      const rect = anchor.getBoundingClientRect()
      // 如果当前锚点距离顶部最近，且距离顶部小于等于100，则将其设置为当前锚点
      if (rect.top <= 100 && anchor.id !== currentAnchor.id) {
        currentAnchor.id = anchor.id
        currentAnchor.top = rect.top
      }
    }
  }

  // 监听 window 对象的滚动事件
  const onScroll = () => {
    calculateCurrentAnchor()
  }

  // 在组件挂载时启动监听滚动事件
  onMounted(() => {
    window.addEventListener('scroll', onScroll)
  })

  // 在组件卸载时移除监听滚动事件
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  // 返回当前锚点的响应式对象
  return currentAnchor
}

export function useBackToTopConfig() {
  return useBlogConfig().backToTop
}

export function useCleanUrls() {
  const { site } = useData()
  return !!site.value.cleanUrls
}
