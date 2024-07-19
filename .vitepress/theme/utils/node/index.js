/* eslint-disable global-require */
/* eslint-disable prefer-rest-params */
import { spawnSync } from 'node:child_process'
import dayjs from 'dayjs'

export function clearMatterContent(content) {
  let first___
  let second___

  const lines = content.split('\n').reduce((pre, line) => {
    // 移除开头的空白行
    if (!line.trim() && pre.length === 0) {
      return pre
    }
    if (line.trim() === '---') {
      if (first___ === undefined) {
        first___ = pre.length
      } else if (second___ === undefined) {
        second___ = pre.length
      }
    }
    pre.push(line)
    return pre
  }, [])
  return (
    lines
      // 剔除---之间的内容
      .slice(second___ || 0)
      .join('\n')
  )
}

export function getDefaultTitle(content) {
  const match = content.match(/^(#+)\s+(.+)/m)
  return match?.[2] || ''
}

// 获取指定仓库的最新提交时间戳
export function getFileBirthTime(url) {
  try {
    // 参考 vitepress 中的 getGitTimestamp 实现
    const infoStr = spawnSync('git', ['log', '-1', '--pretty="%ci"', url])
      .stdout?.toString()
      .replace(/["']/g, '')
      .trim()
    return infoStr ? dayjs(infoStr) : dayjs()
  } catch (error) {
    return dayjs()
  }
}

export function getTextSummary(text, count = 100) {
  return (
    text
      // 首个标题
      ?.replace(/^#+\s+.*/, '')
      // 除去标题
      ?.replace(/#/g, '')
      // 除去图片
      ?.replace(/!\[.*?\]\(.*?\)/g, '')
      // 除去链接
      ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
      // 除去加粗
      ?.replace(/\*\*(.*?)\*\*/g, '$1')
      ?.split('\n')
      ?.filter(v => !!v)
      ?.join('\n')
      ?.replace(/>(.*)/, '')
      ?.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      ?.trim()
      ?.slice(0, count)
  )
}

// 将obj转数组
export function aliasObjectToArray(obj) {
  return Object.entries(obj).map(([find, replacement]) => ({
    find,
    replacement,
  }))
}

function isBase64ImageURL(url) {
  // Base64 图片链接的格式为 data:image/[image format];base64,[Base64 编码的数据]
  const regex = /^data:image\/[a-z]+;base64,/
  return regex.test(url)
}

const imageRegex = /!\[.*?\]\((.*?)\s*(".*?")?\)/

/**
 * 从文档内容中提取封面:目前只读取在线图片地址
 * @param content 文档内容
 */
export function getFirstImagURLFromMD(content) {
  let url = content.match(imageRegex)?.[1]
  if (!url) return ''
  const isHTTPSource = url.startsWith('http')
  if (isHTTPSource || isBase64ImageURL(url)) return url
  return ''
}

export function debounce(func, delay = 1000) {
  let timeoutId
  return (...rest) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...rest)
    }, delay)
  }
}

export function isEqual(obj1, obj2, excludeKeys = []) {
  const keys1 = Object.keys(obj1).filter(key => !excludeKeys.includes(key))
  const keys2 = Object.keys(obj2).filter(key => !excludeKeys.includes(key))

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false
    }
    const val1 = obj1[key]
    const val2 = obj2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if ((areObjects && !isEqual(val1, val2, excludeKeys)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}

export function isObject(obj) {
  return obj != null && typeof obj === 'object'
}
