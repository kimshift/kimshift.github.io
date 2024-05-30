/* eslint-disable global-require */
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import timeline from 'vitepress-markdown-timeline'
import mdCheckbox from 'markdown-it-task-checkbox'
import { aliasObjectToArray } from './index'

export function getMarkdownPlugins(cfg) {
  const markdownPlugin = []
  // tabs支持,默认开启
  if (cfg?.tabs !== false) {
    markdownPlugin.push(tabsMarkdownPlugin)
  }

  if (cfg?.taskCheckbox !== false) {
    markdownPlugin.push(
      taskCheckboxPlugin(typeof cfg?.taskCheckbox === 'boolean' ? {} : cfg?.taskCheckbox)
    )
  }

  if (cfg?.timeline !== false) {
    markdownPlugin.push(timeline)
  }
  return markdownPlugin
}

export function taskCheckboxPlugin(ops) {
  return md => {
    md.use(mdCheckbox, ops)
  }
}

export function registerMdPlugins(vpCfg, plugins) {
  if (plugins.length) {
    vpCfg.markdown = {
      config(...rest) {
        plugins.forEach(plugin => {
          plugin?.(...rest)
        })
      },
    }
  }
}

export function patchMermaidPluginCfg(config) {
  if (!config.vite.resolve) config.vite.resolve = {}
  if (!config.vite.resolve.alias) config.vite.resolve.alias = {}

  config.vite.resolve.alias = [
    ...aliasObjectToArray({
      ...config.vite.resolve.alias,
      'cytoscape/dist/cytoscape.umd.js': 'cytoscape/dist/cytoscape.esm.js',
      mermaid: 'mermaid/dist/mermaid.esm.mjs',
    }),
    { find: /^dayjs\/(.*).js/, replacement: 'dayjs/esm/$1' },
  ]
}

export function patchOptimizeDeps(config) {
  if (!config.vite.optimizeDeps) {
    config.vite.optimizeDeps = {}
  }
  config.vite.optimizeDeps.exclude = ['vitepress-plugin-tabs', '@sugarat/theme']
  config.vite.optimizeDeps.include = ['element-plus']
}

export function supportRunExtendsPlugin(config) {
  // 处理markdown插件
  if (!config.markdown) config.markdown = {}
  // 支持运行继承的markdown插件
  // @ts-expect-error
  if (config.extends?.markdown?.config) {
    const markdownExtendsConfigOriginal =
      // @ts-expect-error
      config.extends?.markdown?.config
    const selfMarkdownConfig = config.markdown?.config

    config.markdown.config = (...rest) => {
      // @ts-expect-error
      selfMarkdownConfig?.(...rest)
      markdownExtendsConfigOriginal?.(...rest)
    }
  }
}
