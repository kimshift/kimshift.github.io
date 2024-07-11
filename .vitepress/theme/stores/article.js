import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import dayjs from 'dayjs'
import { deepCopy, getPagination, sortByKeyAndTime } from 'tools-for-js'
import { getQueryParams } from '../utils/client'
export const useArticleStore = defineStore(
  'article',
  () => {
    const { theme } = useData()

    // 文章分页参数
    const articleParams = ref({
      page: 1,
      pageSize: theme.value.home?.pageSize ?? 10,
      total: 0,
    })
    const articles = ref([])
    const tags = ref([])
    const categories = ref([])
    const count = ref(0) //文章数量
    const monthCount = ref(0) //本月更新
    const weekCount = ref(0) //本周更新

    const docs = computed(() => {
      let blogs = theme.value.blogs || []
      blogs = blogs.filter(v => v.meta?.publish !== false)
      tags.value = [...new Set(blogs.map(v => v.meta.tags || []).flat(3))]
      categories.value = [...new Set(blogs.map(v => v.meta.categories || []).flat(3))]
      return blogs
    })

    // 获取新增日志
    const getCountLogs = () => {
      let mCount = 0
      let wCount = 0
      count.value = docs.value.length
      docs.value.forEach(v => {
        const pubDate = dayjs(v.meta?.date)
        let isMonth = pubDate.isSame(dayjs(), 'month') //本月
        let isWeek = pubDate.isSame(dayjs(), 'week') //本周
        if (isMonth) {
          mCount++
          if (isWeek) wCount++
        }
      })
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

    const getArticles = () => {
      const rows = getArticleList() // 总数据
      articles.value = getPagination(rows, articleParams.value) // 当前页
    }
    return {
      articleParams,
      count,
      monthCount,
      weekCount,
      tags,
      categories,
      docs,
      articles,
      getCountLogs,
      getArticles,
    }
  },
  {
    persist: {
      enabled: true, //开启缓存 [开启缓存后,变量初始化默认值为缓存值]
      strategies: [
        {
          key: 'articlePiniaStore', //存储名称
          storage: sessionStorage, // 存储方式
          paths: ['articleParams'], //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
        },
      ],
    },
  }
)
