import { useData } from 'vitepress'
import { nextTick, provide } from 'vue'

/*******
 * @description: 动态切换暗黑模式功能
 * @author: 琴时
 */
export function useDarkTransition() {
  console.log('测试useDarkTransition:')
  const { theme, isDark } = useData()
  if (theme.value?.darkTransition === false) return
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
