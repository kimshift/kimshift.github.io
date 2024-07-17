/* eslint-disable global-require */
import mdCheckbox from 'markdown-it-task-checkbox'
import { aliasObjectToArray } from './index'

export function getMarkdownPlugins(cfg) {
  const markdownPlugin = []
  // taskCheckbox支持,默认开启
  if (cfg?.taskCheckbox !== false) {
    markdownPlugin.push(
      taskCheckboxPlugin(typeof cfg?.taskCheckbox === 'boolean' ? {} : cfg?.taskCheckbox)
    )
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
