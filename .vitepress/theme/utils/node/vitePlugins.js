import path from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { Buffer } from 'node:buffer'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'
import { themeReloadPlugin } from './hot-reload-plugin'
import { joinPath } from './index'

export function getVitePlugins(cfg) {
  const plugins = []

  // Build完后运行的一系列列方法
  const buildEndFn = []

  // 执行自定义的 buildEnd 钩子
  plugins.push(inlineBuildEndPlugin(buildEndFn))

  // 处理cover image的路径（暂只支持自动识别的文章首图）
  plugins.push(coverImgTransform())

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
    name: '@sugarar/theme-plugin-build-end',
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

// TODO: 支持frontmatter中的相对路径图片自动处理
export function coverImgTransform() {
  let docs
  let vitepressConfig
  let assetsDir
  return {
    name: '@sugarat/theme-plugin-cover-transform',
    apply: 'build',
    enforce: 'pre',
    configResolved(config) {
      vitepressConfig = config.vitepress
      assetsDir = vitepressConfig.assetsDir
      docs = config.vitepress.site.themeConfig.docs
    },
    async generateBundle(_, bundle) {
      const assetsMap = Object.entries(bundle)
        .filter(([key]) => {
          return key.startsWith(assetsDir)
        })
        .map(([_, value]) => {
          return value
        })
      for (const page of docs) {
        const { cover } = page.meta
        // 是否相对路径引用
        if (!cover?.startsWith?.('/')) {
          continue
        }
        try {
          // 寻找构建后的
          const realPath = path.join(vitepressConfig.root, cover)
          if (!existsSync(realPath)) {
            continue
          }
          const fileBuffer = readFileSync(realPath)
          const matchAsset = assetsMap.find(v => Buffer.compare(fileBuffer, v.source) === 0)
          if (matchAsset) {
            page.meta.cover = joinPath('/', matchAsset.fileName)
          }
        } catch (e) {
          vitepressConfig.logger.warn(e?.message)
        }
      }
    },
  }
}
