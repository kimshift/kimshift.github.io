<script setup name="评论组件">
import { useData, useRoute } from 'vitepress'
import { computed, nextTick, ref, watch } from 'vue'
import Giscus from '@giscus/vue'
const { isDark, theme } = useData()
// 读取配制

const commentConfig = computed(() => {
  const { comment } = theme.value
  if (!comment) {
    return false
  }
  if (!('type' in comment)) {
    return comment
  } else if (comment.type === 'giscus') {
    return comment.options
  }
  return false
})

const route = useRoute()
const showComment = ref(false)
watch(
  route,
  () => {
    showComment.value = false
    nextTick(() => {
      showComment.value = true
    })
  },
  {
    immediate: true
  }
)
</script>

<template>
  <Giscus v-if="commentConfig && showComment" :repo="commentConfig.repo" :repo-id="commentConfig.repoId"
    :category="commentConfig.category" :category-id="commentConfig.categoryId"
    :mapping="commentConfig.mapping || 'pathname'" reactions-enabled="1" emit-metadata="0"
    :input-position="commentConfig.inputPosition || 'top'" :theme="isDark ? 'dark' : 'light'"
    :lang="commentConfig.lang || 'zh-CN'" :loading="commentConfig.loading || 'eager'" />
</template>
