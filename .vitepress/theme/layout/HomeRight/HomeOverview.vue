<script setup name="统计数据">
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../../stores/article'
import Author from './Author.vue'

const { theme } = useData()
const { home } = theme.value

const avatarMode = computed(() => home.avatarMode ?? 'card')
const showCardAvatar = computed(() => avatarMode.value === 'card')
const { getCountLogs } = useArticleStore()
const { count, monthCount, weekCount } = storeToRefs(useArticleStore())

onMounted(getCountLogs)


</script>

<template>
  <!-- 头像信息 -->
  <Author v-if="!showCardAvatar" />
  <div class="card">
    <Author v-if="showCardAvatar" />
    <div class="overview-data">
      <div class="overview-item">
        <span class="count">{{ count }}</span>
        <span class="label">博客文章</span>
      </div>
      <div class="split" />
      <div class="overview-item">
        <span class="count">+{{ monthCount }}</span>
        <span class="label">本月更新</span>
      </div>
      <div class="split" />
      <div class="overview-item">
        <span class="count">+{{ weekCount }}</span>
        <span class="label">本周更新</span>
      </div>
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
  flex-direction: column;

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
}

.overview-data {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.split {
  width: 1px;
  opacity: 0.8;
  height: 10px;
  background-color: var(--badge-font-color);
}

.overview-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 10px;

  .count {
    font-size: 18px;
  }

  .label {
    margin-top: 6px;
    font-size: 12px;
    color: var(--description-font-color);
  }
}
</style>
