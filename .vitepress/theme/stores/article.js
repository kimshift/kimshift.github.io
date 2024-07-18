import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useData, withBase } from 'vitepress'
import dayjs from 'dayjs'
import { deepCopy, getPagination, sortByKeyAndTime, dateFormat } from 'tools-for-js'
import { getQueryParams, getPath, session } from 'tools-for-web'
export const useArticleStore = defineStore('article', () => {
  const { theme } = useData()

  let articlePiniaStore = session.get('articlePiniaStore', {}) // 缓存分页参数
  // 文章分页参数
  const articleParams = ref({
    page: articlePiniaStore.page ?? 1,
    pageSize: theme.value.home?.pageSize ?? 10,
    total: articlePiniaStore.total ?? 0,
  })
  const docs = ref([]) //文章缓存数据
  const count = ref(0) //文章数量
  const monthCount = ref(0) //本月更新
  const weekCount = ref(0) //本周更新
  const articles = ref([]) //符合条件的文章
  const tags = ref([]) //所有标签
  const categories = ref([]) //所有分类

  // 初始化
  const initDocs = () => {
    let blogs = theme.value.docs || []
    blogs = blogs.filter(v => v.meta?.publish !== false && v.meta?.title)
    tags.value = [...new Set(blogs.map(v => v.meta.tags || []).flat(3))]
    categories.value = [...new Set(blogs.map(v => v.meta.categories || []).flat(3))]
    docs.value = blogs
  }

  // 当前文章
  const getCurrentArticle = () => {
    const okPaths = getPath()
    let current = docs.value?.find(v => okPaths.includes(withBase(v.route))) || {}
    return current
  }

  // 获取新增日志
  const getCountLogs = () => {
    let mCount = 0
    let wCount = 0
    docs.value.forEach(v => {
      const pubDate = dayjs(v.meta?.date)
      let isMonth = pubDate.isSame(dayjs(), 'month') //本月
      let isWeek = pubDate.isSame(dayjs(), 'week') //本周
      if (isMonth) {
        mCount++
        if (isWeek) wCount++
      }
    })
    count.value = docs.value.length
    weekCount.value = wCount
    monthCount.value = mCount
  }

  // 文章列表
  const getArticleList = () => {
    // 文章数据
    let list = deepCopy(docs.value)
    // 筛选数据
    const { tag, category } = getQueryParams() || {}
    list = list.filter(v => {
      // 筛选分类
      if (category && (!v.meta.categories || !v.meta.categories.includes(category))) {
        return false
      }
      // 筛选标签
      if (tag && (!v.meta.tags || !v.meta.tags.includes(tag))) return false
      return true
    })
    // 置顶数据
    let topList = list.filter(v => !!v.meta.sticky)
    // 按置顶数字-升序排序
    topList = sortByKeyAndTime(topList, { key: 'meta.sticky', timeKey: 'meta.date' })
    // 普通数据
    const commonList = list.filter(v => v.meta.title && !v.meta.sticky)
    // 按时间降序排序
    commonList.sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
    let rows = [...topList, ...commonList]
    articleParams.value.total = rows.length
    return rows
  }

  // 文章分页
  const getArticles = () => {
    const rows = getArticleList() // 总数据
    articles.value = getPagination(rows, articleParams.value) // 当前页
    session.set('articlePiniaStore', articleParams.value) // 缓存分页参数
  }

  const getTimeLine = () => {
    let pages = [...docs.value]
    pages.sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
    const yearObj = {}
    const pagesArr = []
    pages.forEach(v => {
      let year = dateFormat(v.meta?.date, 'YYYY')
      if (yearObj[year]) yearObj[year].push(v)
      else yearObj[year] = [v]
    })
    for (const key in yearObj) {
      const value = yearObj[key]
      pagesArr.unshift({
        year: key,
        data: value,
      })
    }
    return pagesArr
  }

  return {
    docs,
    articles,
    articleParams,
    count,
    monthCount,
    weekCount,
    tags,
    categories,
    initDocs,
    getCountLogs,
    getArticles,
    getTimeLine,
    getCurrentArticle,
  }
})
