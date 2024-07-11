<script setup name="文章封面图">
import { useData } from 'vitepress'
import { computed } from 'vue'

const props = defineProps({
  currentArticle: Object
})
const { frontmatter, theme } = useData()

const cover = computed(() => frontmatter.value.cover)
const realCover = computed(() => cover.value ?? props.currentArticle.meta?.cover)
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
