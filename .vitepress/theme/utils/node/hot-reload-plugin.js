import { getArticleMeta } from './theme'
import { debounce, isEqual } from './index'

// 热更新插件
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
