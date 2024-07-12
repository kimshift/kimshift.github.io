const pattern =
  /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export function countWord(data) {
  const m = data.match(pattern)
  let count = 0
  if (!m) {
    return 0
  }
  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length
    } else {
      count += 1
    }
  }
  return count
}

export function chineseSearchOptimize(input) {
  return input
    .replace(/[\u4E00-\u9FA5]/g, ' $& ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * 根据Github地址跨域获取最后更新时间
 * @param url
 * @returns
 */
export function getGithubUpdateTime(url) {
  // 提取Github url中的用户名和仓库名
  const match = url.match(/github.com\/(.+)/)
  if (!match?.[1]) {
    return Promise.reject(new Error('Github地址格式错误'))
  }
  const [owner, repo] = match[1].split('/')
  return fetch(`https://api.github.com/repos/${owner}/${repo}`)
    .then(res => res.json())
    .then(res => {
      return res.updated_at
    })
}

/**
 * 跨域获取某个Github仓库的指定目录最后更新时间
 */
export function getGithubDirUpdateTime(owner, repo, dir, branch) {
  let baseUrl = `https://api.github.com/repos/${owner}/${repo}/commits`
  if (branch) {
    baseUrl += `/${branch}`
  }
  if (dir) {
    baseUrl += `?path=${dir}`
  }
  return fetch(baseUrl)
    .then(res => res.json())
    .then(res => {
      return [res].flat()[0].commit.committer.date
    })
}

export function getImageUrl(image, isDarkMode) {
  if (typeof image === 'string') {
    // 如果 ThemeableImage 类型为 string，则直接返回字符串
    return image
  }
  if ('src' in image) {
    // 如果 ThemeableImage 类型是一个对象，并且对象有 src 属性，则返回 src 属性对应的字符串
    return image.src
  }
  if ('light' in image && 'dark' in image) {
    // 如果 ThemeableImage 类型是一个对象，并且对象同时有 light 和 dark 属性，则根据 isDarkMode 返回对应的 URL
    return isDarkMode ? image.dark : image.light
  } // 如果 ThemeableImage 类型不是上述情况，则返回空字符串
  return ''
}
