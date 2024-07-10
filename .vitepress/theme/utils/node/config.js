import {
  getMarkdownPlugins,
  patchMermaidPluginCfg,
  patchOptimizeDeps,
  registerMdPlugins,
} from './mdPlugins'
import { getArticles, patchVPThemeConfig } from './theme'
import { getVitePlugins, registerVitePlugins } from './vitePlugins'

/**
 * 获取主题的配置
 * @param cfg 主题配置
 */
export function getThemeConfig(cfg) {
  // 文章数据
  const articles = getArticles(cfg)
  const extraVPConfig = {}

  // 获取要加载的vite插件
  const vitePlugins = getVitePlugins(cfg)
  // 注册Vite插件
  registerVitePlugins(extraVPConfig, vitePlugins)

  // 获取要加载的markdown插件
  const markdownPlugin = getMarkdownPlugins(cfg)
  // 注册markdown插件
  registerMdPlugins(extraVPConfig, markdownPlugin)

  // patch extraVPConfig
  patchMermaidPluginCfg(extraVPConfig)
  patchOptimizeDeps(extraVPConfig)

  return {
    themeConfig: {
      blog: {
        pagesData: articles,
      },
      blogs: [...articles],
      ...cfg,
      // 补充一些额外的配置用于继承
      ...patchVPThemeConfig(cfg),
    },
    ...extraVPConfig,
  }
}
