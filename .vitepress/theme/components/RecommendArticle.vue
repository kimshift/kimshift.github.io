<script setup name="相关文章组件">
import { computed, onMounted, ref } from 'vue'
import { useData, useRoute, useRouter, withBase } from 'vitepress'
import { ElButton } from 'element-plus'
import { storeToRefs } from 'pinia'
import { transformDate } from 'tools-for-js';
import { wrapperCleanUrls } from 'tools-for-web';
import { recommendSVG } from '../constants/svg'
import { useArticleStore } from '../stores/article'

const { theme, site } = useData()
const { docs } = storeToRefs(useArticleStore())

const recommend = computed(() => theme.value.recommend)
const sidebarStyle = computed(() => recommend.value?.style ?? 'sidebar')
const recommendPadding = computed(() => sidebarStyle.value === 'card' ? '10px' : '0px')
const title = computed(() => recommend.value?.title ?? (`<span class="svg-icon">${recommendSVG}</span>` + '相关文章'))
const pageSize = computed(() => recommend.value?.pageSize || 9)
const nextText = computed(() => recommend.value?.nextText ?? '换一组')
const emptyText = computed(() => recommend.value?.empty ?? '暂无相关文章')


const route = useRoute()

// 获取当前文章所属分类
function getRecommendCategory(page) {
  if (!page) return []
  const { meta } = page
  if (Array.isArray(meta.categories)) {
    return meta.categories.filter(v => typeof v === 'string')
  }
  if (typeof meta.categories === 'string') {
    return [meta.categories]
  }
  return []
}

// 判断是否当前文章
function isCurrentDoc(value) {
  const path = decodeURIComponent(route.path).replace(/.html$/, '')
  return [value, value.replace(/index$/, '')].includes(path)
}

// 判断分类是否有交集
function hasIntersection(arr1, arr2) {
  return arr1.some(item => arr2.includes(item))
}

// 获取相关分类文章
const recommendList = computed(() => {
  // 中文支持
  const paths = decodeURIComponent(route.path).split('/')
  const currentPage = docs.value.find(v => isCurrentDoc(v.route))//当前文章
  const currentCategory = getRecommendCategory(currentPage)//所属分类
  const origin = docs.value
    .map(v => ({ ...v, route: withBase(v.route) }))
    .filter(v => {
      if (!v.meta.title) return false // 过滤出带标题的
      if (v.meta.sidebar === false) return false // 过滤不要侧边栏的文章
      if (!(recommend.value?.showSelf ?? true) && isCurrentDoc(v.route)) return false // 是否过滤掉自己
      // 筛选出类别有交集的
      if (currentCategory.length > 0) {
        return hasIntersection(currentCategory, getRecommendCategory(v))
      }
      // 如果没有自定义归类则保持原逻辑==>筛选出同目录
      return v.route.split('/').length === paths.length
        && v.route.startsWith(paths.slice(0, paths.length - 1).join('/'))
    })

  // 排序方式
  const sortMode = recommend.value?.sort ?? 'date'
  // 默认时间排序: 最新文章在前
  let compareFn = (a, b) => +new Date(b.meta.date) - +new Date(a.meta.date)
  // 文件名排序
  if (sortMode === 'filename') {
    compareFn = (a, b) => {
      const aName = a.route.split('/').pop()
      const bName = b.route.split('/').pop()
      return aName.localeCompare(bName)
    }
  }
  // 自定义排序
  if (typeof sortMode === 'function') {
    compareFn = sortMode
  }
  return origin.sort(compareFn)
})

const currentPage = ref(1)
function changePage() {
  const newIdx
    = currentPage.value % Math.ceil(recommendList.value.length / pageSize.value)
  currentPage.value = newIdx + 1
  return newIdx + 1
}
// 当前页开始的序号
const startIdx = computed(() => (currentPage.value - 1) * pageSize.value)

// 当前页文章
const currentWikiData = computed(() => {
  const startIdx = (currentPage.value - 1) * pageSize.value
  const endIdx = startIdx + pageSize.value
  return recommendList.value.slice(startIdx, endIdx)
})

const showChangeBtn = computed(() => {
  return recommendList.value.length > pageSize.value
})

onMounted(() => {
  // 更新当前页，确保访问页面在列表中
  const currentPageIndex = recommendList.value.findIndex(v => isCurrentDoc(v.route))
  if (currentPageIndex === -1)
    return
  const currentPageNum = Math.floor(currentPageIndex / pageSize.value) + 1
  currentPage.value = currentPageNum
})

const cleanUrls = !!site.value.cleanUrls

const router = useRouter()
function handleLinkClick(link) {
  router.go(link)
}
</script>

<template>
  <div v-if="recommend !== false && (recommendList.length || emptyText)" class="recommend"
    :class="{ card: sidebarStyle === 'card' }" data-pagefind-ignore="all">
    <!-- 头部 -->
    <div class="card-header">
      <span v-if="title" class="title" v-html="title" />
      <ElButton v-if="showChangeBtn" size="small" type="primary" text @click="changePage">
        {{ nextText }}
      </ElButton>
    </div>
    <!-- 文章列表 -->
    <ol v-if="currentWikiData.length" class="recommend-container">
      <li v-for="(v, idx) in currentWikiData" :key="v.route">
        <!-- 序号 -->
        <i class="num">{{ startIdx + idx + 1 }}</i>
        <!-- 简介 -->
        <div class="des">
          <!-- title -->
          <a class="title" :class="{
            current: isCurrentDoc(v.route),
          }" :href="wrapperCleanUrls(cleanUrls, v.route)" @click="(e) => {
            e.preventDefault()
            handleLinkClick(wrapperCleanUrls(cleanUrls, v.route))
          }">
            <span>{{ v.meta.title }}</span>
          </a>
          <!-- 描述信息 -->
          <div class="suffix">
            <!-- 日期 -->
            <span class="tag">{{ transformDate(v.meta.date) }}</span>
          </div>
        </div>
      </li>
    </ol>
    <div v-else class="empty-text">
      {{ emptyText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  margin: 0 auto 10px;
  padding: 10px;
  width: 100%;
  overflow: hidden;
  border-radius: 0.25rem;
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: rgba(var(--bg-gradient));
  display: flex;

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
}

.recommend {
  flex-direction: column;
  padding: v-bind(recommendPadding);
}

.recommend-container {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0 10px 0 0px;
  width: 100%;

  li {
    display: flex;

    .num {
      display: block;
      font-size: 14px;
      color: var(--description-font-color);
      font-weight: 600;
      margin: 6px 8px 10px 0;
      width: 22px;
      height: 18px;
      line-height: 18px;
      text-align: center;
    }

    .des {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title {
      font-size: 14px;
      color: var(--vp-c-text-1);
      word-break: break-all;
      white-space: break-spaces;
      font-weight: 500;
      position: relative;
      cursor: pointer;

      &.current {
        color: var(--vp-c-brand-1);
      }
    }

    .title:hover::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 0;
      bottom: -3px;
      border-bottom: 1px solid #b1b3b8;
    }

    .suffix {
      font-size: 12px;
      color: var(--vp-c-text-2);
    }
  }
}

.card-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .title {
    font-size: 14px;
    display: flex;
    align-items: center;
  }
}

.empty-text {
  padding: 6px;
  font-size: 14px;
  text-align: center;
}
</style>
