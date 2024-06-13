<script setup name="文档底部按钮">
import { ElButton } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { aliPaySVG, weChatPaySVG } from '../constants/svg'

const { frontmatter, theme } = useData()

const frontmatterConfig = computed(() => frontmatter.value.buttonAfterArticle)
const buttonAfterArticle = computed(() => theme.value.buttonAfterArticle)
const buttonAfterArticleConfig = computed(() => {
  if (frontmatterConfig.value === false || !buttonAfterArticle.value) {
    return false
  }
  return { ...buttonAfterArticle.value }
})

const svg = computed(() => {
  if (!buttonAfterArticleConfig.value) {
    return ''
  }
  let icon = buttonAfterArticleConfig.value?.icon
  const iconMap = {
    aliPay: aliPaySVG,
    wechat: weChatPaySVG
  }
  return iconMap[icon] || icon
})

const showContent = ref(false)
watch(buttonAfterArticleConfig, () => {
  showContent.value = !!buttonAfterArticleConfig.value?.expand
}, {
  immediate: true
})

const toggleContent = () => {
  showContent.value = !showContent.value
}

</script>

<template>
  <div v-if="buttonAfterArticleConfig" class="appreciation-container">
    <ElButton :size="buttonAfterArticleConfig.size || 'default'" class="content-button"
      :type="showContent ? 'danger' : 'primary'" @click="toggleContent">
      <span class="content-icon" v-html="svg" />
      {{ showContent ? buttonAfterArticleConfig.closeTitle : buttonAfterArticleConfig.openTitle }}
    </ElButton>
    <transition name="content">
      <div v-if="showContent" class="content-container" v-html="buttonAfterArticleConfig.content" />
    </transition>
  </div>
</template>

<style scoped lang="scss">
.appreciation-container {
  text-align: center;
  padding: 20px;
  font-size: 14px;
  color: #606266;

  :deep(.el-button.el-button--primary) {
    background-color: var(--vp-c-brand-2);
    border-color: var(--vp-c-brand-2);
  }
}

.content-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  :deep(img) {
    height: 260px;
    cursor: pointer;
  }
}

.content-icon {
  font-family: "iconfont" !important;
  font-size: 16px;
  margin-right: 8px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 进入动画 */
.content-enter-active {
  animation: fadeIn 0.5s ease forwards;
}

/* 离开动画 */
.content-leave-active {
  animation: fadeOut 0.3s ease forwards;
}

/* 淡入 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 淡出 */
@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
