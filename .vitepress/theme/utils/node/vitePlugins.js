import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'
import { getArticleMeta } from './theme'
import { debounce, isEqual } from './index'

// 获取 vite 插件
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

// 注册 vite 插件
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

// 文档热更新插件
export function themeReloadPlugin() {
  let docs
  let vitepressConfig
  let docsDir

  const generateRoute = filepath => {
    filepath = filepath.replace(/\\/g, '/') // 将路径中的反斜杠字符 \ 替换为斜杠 /
    return filepath.replace(docsDir, '').replace('.md', '')
  }

  return {
    name: '@kimshift/theme-reload',
    apply: 'serve',
    configureServer(server) {
      const restart = debounce(() => {
        server.restart()
      }, 500)

      // 监听新增的文件
      server.watcher.on('add', path => {
        if (path.endsWith('.md')) {
          const route = generateRoute(path)
          const meta = getArticleMeta(path, route)
          docs.push({
            route,
            meta,
          })
          restart()
        }
      })

      // 监听变更的文件
      server.watcher.on('change', path => {
        const route = generateRoute(path, docsDir)
        const meta = getArticleMeta(path, route)
        const matched = docs.find(v => v.route === route)
        if (matched && !isEqual(matched.meta, meta, ['date', 'description'])) {
          matched.meta = meta
          restart()
        }
      })

      // 监听删除的文件
      server.watcher.on('unlink', path => {
        const route = generateRoute(path)
        if (path.endsWith('.md')) {
          const idx = docs.findIndex(v => v.route === route)
          if (idx >= 0) {
            docs.splice(idx, 1)
            restart()
          }
        }
      })
    },
    configResolved(config) {
      vitepressConfig = config.vitepress
      docsDir = vitepressConfig.srcDir
      docs = vitepressConfig.site.themeConfig.docs
    },
  }
}
