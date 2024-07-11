<script setup name="文章封面图">
import { useData } from 'vitepress'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article';

const { frontmatter, theme } = useData()
const { currentArticle } = storeToRefs(useArticleStore())
const cover = computed(() => frontmatter.value.cover)
const realCover = computed(() => cover.value ?? currentArticle.value.meta?.cover)
const showCover = computed(
  () => theme.value.article?.autoCover ?? cover.value ?? true
)
</script>

<template>
  <img v-if="showCover && realCover" class="blog-doc-cover" :src="realCover">
</template>

<style lang="scss" scoped>
img.blog-doc-cover.blog-doc-cover.blog-doc-cover {
  width: 100%;
  object-fit: cover;
  max-height: none;
  margin-top: 20px;
}
</style>
