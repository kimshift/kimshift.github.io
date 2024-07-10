<script setup name="文档列表">
import { computed, watch, onMounted } from 'vue'
import { ElPagination } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useData, useRoute } from 'vitepress'
import { useArticleStore } from '../stores/article'
import BlogItem from './BlogItem.vue'

const articleStore = useArticleStore()
const { articleParams, articles } = storeToRefs(articleStore)

const { theme } = useData()

onMounted(() => {
  articleStore.getArticles()
})

const globalAuthor = computed(() => theme.value.author || '佚名')

const route = useRoute()
watch(route, () => {
  articleStore.getArticles()
})

const handleCurrentChange = (page) => {
  articleParams.value.page = page
  articleStore.getArticles()
  window.scrollTo(0, 0)// 界面置顶
}

</script>

<template>
  <ul data-pagefind-ignore="all">
    <li v-for="v in articles" :key="v.route">
      <BlogItem :route="v.route" :title="v.meta.title" :description="v.meta.description"
        :description-h-t-m-l="v.meta.descriptionHTML" :date="v.meta.date" :tag="v.meta.tag" :cover="v.meta.cover"
        :author="v.meta.author || globalAuthor" :pin="v.meta.top" />
    </li>
  </ul>
  <!-- 解决element-ui bug -->
  <ClientOnly>
    <div class="el-pagination-wrapper">
      <ElPagination size="small" background :default-current-page="1" :current-page="articleParams.page"
        :page-size="articleParams.pageSize" :total="articleParams.total" layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange">
      </ElPagination>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.el-pagination-wrapper {
  :deep(.el-pagination li.is-active.number) {
    background-color: var(--vp-c-brand-2);
  }

  :deep(.el-pagination button:hover) {
    color: var(--vp-c-brand-2);
  }

  :deep(.el-pager li:not(.is-active):hover) {
    color: var(--vp-c-brand-2);
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--vp-c-brand-2) inset;
  }
}
</style>
