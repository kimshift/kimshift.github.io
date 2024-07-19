import { registerMdPlugins } from './mdPlugins'
import { getArticles, patchVPThemeConfig } from './theme'
import { getVitePlugins, registerVitePlugins } from './vitePlugins'
import { aliasObjectToArray } from './index'
/**
 * 获取主题的配置
 * @param cfg 主题配置
 */
export function getThemeConfig(cfg) {
  // 文章数据
  const articles = getArticles(cfg)

  const extraVPConfig = {}
  // 获取vite插件
  const vitePlugins = getVitePlugins(cfg)
  // 注册Vite插件
  registerVitePlugins(extraVPConfig, vitePlugins)
  // 注册markdown插件
  registerMdPlugins(extraVPConfig)

  // patch extraVPConfig
  patchAliasCfg(extraVPConfig)
  patchOptimizeDeps(extraVPConfig)

  return {
    themeConfig: {
      docs: [...articles],
      ...cfg,
      // 补充一些额外的配置用于继承
      ...patchVPThemeConfig(cfg),
    },
    ...extraVPConfig,
  }
}

export function patchAliasCfg(config) {
  if (!config.vite.resolve) config.vite.resolve = {}
  if (!config.vite.resolve.alias) config.vite.resolve.alias = {}
  config.vite.resolve.alias = [
    ...aliasObjectToArray({
      ...config.vite.resolve.alias,
    }),
    { find: /^dayjs\/(.*).js/, replacement: 'dayjs/esm/$1' },
  ]
}

export function patchOptimizeDeps(config) {
  if (!config.vite.optimizeDeps) {
    config.vite.optimizeDeps = {}
  }
  config.vite.optimizeDeps.include = ['element-plus']
}
