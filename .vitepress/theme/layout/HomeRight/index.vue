<script setup name="右侧栏目">
import HomeOverview from './HomeOverview.vue'
import HotArticle from './HotArticle.vue'
import HomeTags from './HomeTags.vue'
import FriendLink from './FriendLink.vue'
</script>

<template>
  <div class="blog-info" data-pagefind-ignore="all">
    <!-- 统计数据 -->
    <HomeOverview />

    <!-- 精选文章 -->
    <HotArticle />

    <!-- 友链 -->
    <ClientOnly>
      <FriendLink />
    </ClientOnly>

    <!-- 标签 -->
    <HomeTags />
  </div>
</template>

<style lang="scss" scoped>
.blog-info {
  display: flex;
  flex-direction: column;
  min-width: 240px;
  position: relative;
  box-sizing: border-box;
}

@media screen and (min-width: 767px) {
  .blog-info {
    width: 280px;
  }
}
</style>
