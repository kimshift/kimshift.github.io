<script setup name="定理组件">
import { useData } from 'vitepress'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'YOU AND ME'
  },
  content: {
    type: String,
    default: '世界上最远的距离是，我在 if 里你在 else 里，虽然经常一起出现，但却永不结伴执行。'
  },
})

const { frontmatter, theme } = useData()
const author = computed(
  () =>
    frontmatter.value.author ?? theme.value.author ?? '佚名'
)

</script>

<template>
  <div class="kt-theorem">
    <p class="title">{{ props.title }}</p>
    <p>{{ props.content }}</p>
    <div class="custom-block right">
      <p>来自 <span class="author">{{ author }}</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kt-theorem {
  margin: 1rem 0;
  padding: .1rem 1.5rem;
  border-radius: .4rem;
  background-color: rgba(201, 218, 234, .38);

  .title {
    font-weight: 700;
  }

  p {
    line-height: 1.7;
  }

  .custom-block.right {
    color: rgba(0, 0, 0, .4);
    font-size: .9rem;
    text-align: right;

    .author {
      color: #4e98bb;
    }
  }
}
</style>
