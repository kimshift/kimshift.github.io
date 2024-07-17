import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'
import { themeReloadPlugin } from './hot-reload-plugin'

export function getVitePlugins(cfg) {
  const plugins = []

  // Build完后运行的一系列列方法
  const buildEndFn = []

  // 执行自定义的 buildEnd 钩子
  plugins.push(inlineBuildEndPlugin(buildEndFn))

  // 自动重载首页
  plugins.push(themeReloadPlugin())

  // 内置简化版的pagefind
  if (cfg && cfg.search !== false) {
    const ops = cfg.search instanceof Object ? cfg.search : {}
    plugins.push(
      pagefindPlugin({
        ...ops,
        customSearchQuery: chineseSearchOptimize,
        filter(searchItem) {
          return searchItem.meta.publish !== false
        },
      })
    )
  }

  return plugins
}

export function registerVitePlugins(vpCfg, plugins) {
  vpCfg.vite = {
    plugins,
  }
}

export function inlineBuildEndPlugin(buildEndFn) {
  let rewrite = false
  return {
    name: '@kimshift/theme-plugin-build-end',
    enforce: 'pre',
    configResolved(config) {
      // 避免重复定义
      if (rewrite) return
      const vitepressConfig = config.vitepress
      if (!vitepressConfig) return
      rewrite = true
      // 添加 自定义 vitepress build 的钩子
      const selfBuildEnd = vitepressConfig.buildEnd
      vitepressConfig.buildEnd = siteCfg => {
        selfBuildEnd?.(siteCfg)
        buildEndFn.filter(fn => typeof fn === 'function').forEach(fn => fn(siteCfg))
      }
    },
  }
}
