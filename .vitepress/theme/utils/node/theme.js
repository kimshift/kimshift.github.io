/* eslint-disable prefer-rest-params */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import glob from 'fast-glob'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import { getDefaultTitle, getFileBirthTime, getFirstImagURLFromMD, getTextSummary } from './index'

export function patchDefaultThemeSideBar(cfg) {
  return cfg?.blog !== false && cfg?.recommend !== false
    ? {
        sidebar: [
          {
            text: '',
            items: [],
          },
        ],
      }
    : undefined
}

export function getPageRoute(filepath, srcDir) {
  let route = filepath.replace('.md', '')
  // 去除 srcDir 处理目录名
  // TODO：优化 路径处理，同VitePress 内部一致
  if (route.startsWith('./')) {
    route = route.replace(
      new RegExp(`^\\.\\/${path.join(srcDir, '/').replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`),
      ''
    )
  } else {
    route = route.replace(
      new RegExp(`^${path.join(srcDir, '/').replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`),
      ''
    )
  }
  return `/${route}`
}

// 获取文章元信息
export function getArticleMeta(filepath) {
  const fileContent = fs.readFileSync(filepath, 'utf-8')
  const {
    data: frontmatter,
    excerpt,
    content,
  } = matter(fileContent, {
    excerpt: true,
  }) //解析md单元

  const meta = {
    ...frontmatter,
  }

  if (!meta.title) {
    meta.title = getDefaultTitle(content) //标题不存在获取md一级标题
  }
  if (!meta.date) {
    meta.date = getFileBirthTime(filepath).format('YYYY-MM-DD HH:mm:ss')
  } else {
    const timeZon = new Date().getTimezoneOffset() / -60
    // 减去时差
    const timeMinus8Hours = dayjs(meta.date).subtract(timeZon, 'hour')
    // 格式化时间
    meta.date = timeMinus8Hours.format('YYYY-MM-DD HH:mm:ss')
  }

  // 处理tags和categories,兼容历史文章
  meta.categories = typeof meta.categories === 'string' ? [meta.categories] : meta.categories
  meta.tags = typeof meta.tags === 'string' ? [meta.tags] : meta.tags
  // 去重
  meta.categories = [...new Set(meta.categories)]
  meta.tags = [...new Set(meta.tags)]

  // 获取摘要信息
  // TODO：摘要生成优化
  meta.description = meta.description || getTextSummary(content, 100) || excerpt

  // 获取封面图
  meta.cover = meta.cover ?? getFirstImagURLFromMD(fileContent)
  // 是否发布 默认发布
  meta.publish = !(meta.publish === false)
  return meta
}

// 获取文章列表
export function getArticles(cfg) {
  const srcDir = cfg?.srcDir || process.argv.slice(2)?.[1] || '.'
  const files = glob.sync(`${srcDir}/**/*.md`, { ignore: ['node_modules'] })
  // 文章数据
  return files
    .map(filepath => {
      const route = getPageRoute(filepath, srcDir)
      const meta = getArticleMeta(filepath, route)
      return {
        route,
        meta,
      }
    })
    .filter(v => v.meta.layout !== 'home')
}

export function patchVPThemeConfig(cfg, vpThemeConfig = {}) {
  // 用于自定义sidebar卡片slot
  vpThemeConfig.sidebar = patchDefaultThemeSideBar(cfg)?.sidebar
  return vpThemeConfig
}
