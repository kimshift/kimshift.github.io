<script setup name="首页文档组件">
import { useData, useRouter, withBase } from 'vitepress'
import { computed } from 'vue'
import { formatShowDate, wrapperCleanUrls } from '../utils/client'

const props = defineProps({
  route: String,
  title: String,
  date: String | Date,
  sticky: Number,
  description: String,
  descriptionHTML: String,
  tags: Array,
  author: String,
  cover: String,
})

const { site } = useData()

const showTime = computed(() => {
  return formatShowDate(props.date)
})
const cleanUrls = !!site.value.cleanUrls
const link = computed(() => withBase(wrapperCleanUrls(!!cleanUrls, props.route)))
const router = useRouter()
function handleSkipDoc() {
  router.go(link.value)
}

const resultCover = computed(() => {
  if (!props.cover) {
    return ''
  }
  const baseCover = withBase(props.cover)
  return baseCover
})
</script>

<template>
  <a class="blog-item" :href="link" @click="(e) => {
    e.preventDefault()
    handleSkipDoc()
  }">
    <i v-if="!!sticky" class="sticky" />
    <!-- 标题 -->
    <p class="title mobile-visible">
      {{ title }}
    </p>
    <div class="info-container">
      <!-- 左侧信息 -->
      <div class="info-part">
        <!-- 标题 -->
        <p class="title pc-visible">
          {{ title }}
        </p>
        <!-- 简短描述 -->
        <p v-show="!descriptionHTML && !!description" class="description">
          {{ description }}
        </p>
        <template v-if="descriptionHTML">
          <div class="description-html" v-html="descriptionHTML" />
        </template>
        <!-- 底部补充描述 -->
        <div class="badge-list pc-visible">
          <span v-show="author" class="split">{{ author }}</span>
          <span class="split">{{ showTime }}</span>
          <span v-if="tags?.length > 0" class="split">{{ tags?.join(' · ') }}</span>
        </div>
      </div>
      <!-- 右侧封面图 -->
      <div v-show="cover" class="cover-img" :style="`background-image: url(${resultCover});`" />
    </div>
    <!-- 底部补充描述 -->
    <div class="badge-list mobile-visible">
      <span v-show="author" class="split">{{ author }}</span>
      <span class="split">{{ showTime }}</span>
      <span v-if="tags?.length > 0" class="split">{{ tags?.join(' · ') }}</span>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.blog-item .sticky {
  position: absolute;
  width: 30px;
  height: 30px;
  top: -4px;
  left: -4px;
  opacity: 0.5;
}

.blog-item:hover .sticky {
  opacity: 1;
}

.blog-item .sticky::before {
  content: '';
  position: absolute;
  width: 120%;
  height: 30px;
  background-image: linear-gradient(45deg,
      var(--blog-theme-color),
      var(--blog-theme-color));
  transform: rotate(-45deg) translateY(-20px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
}

.blog-item {
  position: relative;
  margin: 0 auto 20px;
  padding: 16px 20px;
  width: 100%;
  overflow: hidden;
  border-radius: 0.25rem;
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: rgba(var(--bg-gradient));
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: var(--box-shadow-hover);
    transform: scale(1.02);
  }
}

.info-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.info-part {
  flex: 1;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.description {
  color: var(--description-font-color);
  font-size: 14px;
  margin-bottom: 8px;
  // 多行换行
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.description-html {
  font-size: 14px;
}

.badge-list {
  font-size: 13px;
  color: var(--badge-font-color);
  margin-top: 8px;

  .split:not(:last-child) {
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 8px;
      margin: 0 10px;
      background-color: #4e5969;
    }
  }
}

.cover-img {
  width: 120px;
  height: 80px;
  margin-left: 24px;
  border-radius: 2px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.pc-visible {
  display: block;
}

.mobile-visible {
  display: none;
}

@media screen and (max-width: 500px) {
  .cover-img {
    width: 100px;
    height: 60px;
    background-size: contain;
    background-position: center;
  }

  .pc-visible {
    display: none;
  }

  .mobile-visible {
    display: block;
  }
}
</style>
