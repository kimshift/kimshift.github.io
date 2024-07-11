import { useData } from 'vitepress'
import { nextTick, provide, onMounted, onUnmounted, reactive, ref } from 'vue'

/*******
 * @description: 动态切换暗黑模式功能
 * @author: 琴时
 */
export function useDarkTransition() {
  const { theme, isDark } = useData()
  if (theme.value.darkTransition === false) return
  const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches

  provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
    if (!enableTransitions()) {
      isDark.value = !isDark.value
      return
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )}px at ${x}px ${y}px)`,
    ]

    // @ts-expect-error
    await document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    }).ready

    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
      }
    )
  })
}

/**
 * 页面加载的时候定位到锚点内容【未使用】
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
 * 页面滚动的时候自动更新锚点【未使用】
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
