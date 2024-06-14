<script setup name="侧边栏组件">
import { computed } from 'vue'
import { useData } from 'vitepress'
import RecommendArticle from './RecommendArticle.vue'

const { theme } = useData()

const recommend = computed(() => theme.value.recommend)
const sidebarStyle = computed(() => recommend.value?.style ?? 'card')
const marginTop = computed(() => sidebarStyle.value === 'card' ? '40px' : '0px')
const marginTopMini = computed(() => sidebarStyle.value === 'card' ? '60px' : '0px')

</script>

<template>
  <div v-if="recommend !== false" class="sidebar" data-pagefind-ignore="all">
    <RecommendArticle />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  margin-top: v-bind(marginTop);
}

@media screen and (min-width: 960px) and (max-width: 1120px) {
  .sidebar {
    margin-top: v-bind(marginTopMini);
  }
}
</style>
