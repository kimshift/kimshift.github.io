import {
  getMarkdownPlugins,
  patchMermaidPluginCfg,
  patchOptimizeDeps,
  registerMdPlugins,
} from './mdPlugins'
import { checkConfig, getArticles, patchVPConfig, patchVPThemeConfig } from './theme'
import { getVitePlugins, registerVitePlugins } from './vitePlugins'

/**
 * 获取主题的配置
 * @param cfg 主题配置
 */
export function getThemeConfig(cfg) {
  // 配置校验
  checkConfig(cfg)

  // 文章数据
  const pagesData = getArticles(cfg)
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

  patchVPConfig(extraVPConfig, cfg)
  return {
    themeConfig: {
      blog: {
        pagesData,
        ...cfg,
      },
      // 补充一些额外的配置用于继承
      ...patchVPThemeConfig(cfg),
    },
    ...extraVPConfig,
  }
}

/**
 * defineConfig Helper
 */
export function defineConfig(config) {
  return config
}

// 重新导包 tabsMarkdownPlugin 导出CJS格式支持
export { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

export function footerHTML(footerData) {
  const data = [footerData || []].flat()
  return data
    .map(d => {
      const { icon, text, link } = d

      return `<span class="footer-item">
                ${icon ? `<i>${icon}</i>` : ''}
                ${
                  link
                    ? `<a href="${link}" target="_blank" rel="noopener noreferrer">${text}</a>`
                    : `<span>${text}</span>`
                }
              </span>`
    })
    .join('')
}
