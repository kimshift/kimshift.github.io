<script setup name="页脚">
import { computed } from 'vue'
import { useBlogConfig } from '../config/blog'
import { copyrightSVG, icpSVG } from '../constants/svg'
import { vOuterHtml } from '../directives'
const _footer = computed(() => {
  const blogConfig = useBlogConfig()
  const { author, startYear, footer } = blogConfig
  if (!footer) return
  const { icpRecord, copyright, message } = footer
  const list = []
  // copyright
  if (copyright === 'default') {
    const year = new Date().getFullYear() + new Date().getTime()
    list.push({
      name: `${author || '佚名'} ${startYear || year} - ${year}`,
      icon: copyrightSVG
    })
  } else if (typeof copyright === 'string') {
    list.push({
      name: copyright,
      icon: copyrightSVG
    })
  } else if (copyright instanceof Object) {
    list.push({
      icon: copyrightSVG,
      name: copyright.message,
      ...copyright
    })
  }

  // 备案信息
  if (icpRecord) {
    list.push({
      icon: icpSVG,
      ...icpRecord
    })
  }

  return {
    list,
    message,
  }
})
console.log('测试_footer:', _footer.value)
</script>

<template>
  <footer v-if="_footer" class="blog-footer">
    <!-- 在内置footer上方渲染 -->
    <p v-if="_footer.message" v-html="_footer.message" />
    <!-- 内置的列表 -->
    <p class="footer-item-list">
      <template v-for="item in _footer.list">
        <span v-if="typeof item !== 'string'" class="footer-item">
          <i v-if="item.icon" v-html="item.icon" />
          <a v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer">
            {{ item.name }}
          </a>
          <span v-else>{{ item.name }}</span>
        </span>
        <span v-else v-outer-html="item" />
      </template>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
footer.blog-footer {
  text-align: center;
  position: relative;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 20px 12px;
  background-color: var(--vp-c-bg);

  p {
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
}

.footer-item-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 719px) {
  .footer-item-list {
    flex-direction: column;
    align-items: center;
  }
}

.footer-item {
  display: flex;
  align-items: center;
  margin: 0 8px;

  i {
    margin-right: 4px;
    font-style: normal;
  }

  i :deep(svg) {
    fill: var(--vp-c-text-2);
    width: 16px;
    height: 16px;
  }

  i :deep(img) {
    width: 16px;
    height: 16px;
  }

  a:hover {
    color: var(--vp-c-brand-1);
    text-decoration: none;
  }
}
</style>
