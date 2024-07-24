<script setup name="导航栏菜单组件">
import { useData } from 'vitepress'
import { onMounted } from 'vue'
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue';
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue';
const { theme } = useData()

const themeColorList = [
  { label: 'vp绿', value: 'vp-green', color: 'var(--vp-c-green-1)' },
  { label: 'vp蓝', value: 'vp-blue', color: 'var(--vp-c-indigo-1)' },
  { label: 'vp黄', value: 'vp-yellow', color: 'var(--vp-c-yellow-1)' },
  { label: 'vp紫', value: 'vp-purple', color: 'var(--vp-c-purple-1)' },
  { label: 'vp红', value: 'vp-red', color: 'var(--vp-c-red-1)' },

  { label: 'el绿', value: 'el-green', color: 'var(--el-color-success)' },
  { label: 'el蓝', value: 'el-blue', color: 'var(--el-color-primary)' },
  { label: 'el黄', value: 'el-yellow', color: 'var(--el-color-warning)' },
  { label: 'el红', value: 'el-red', color: 'var(--el-color-danger)' },
]


const switchover = (themeColor) => {
  // 获取需要添加theme属性的元素html
  const htmlElement = document.documentElement;
  // 设置theme属性的值
  htmlElement.setAttribute('theme', themeColor);
  // 将主题配置保存到localStorage
  localStorage.setItem('themeColor', themeColor);
}

onMounted(() => {
  const themeColor = localStorage.getItem('themeColor')
  if (themeColor) {
    switchover(themeColor)
  }
})

</script>

<template>
  <nav v-if="theme.nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">
      Main Navigation
    </span>
    <a class="VPNavBarMenuLink color">
      <i class="iconfont kt-color"></i>
      <div class="color-picker-menu">
        <div class="mode-options">
          <div class="title">切换主题颜色</div>
          <ul class="color-mode-options">
            <template v-for="item in themeColorList" :key="item.value">
              <li class="theme-color-item" :style="{ background: item.color }" @click="switchover(item.value)">{{
                item.label }}</li>
            </template>
          </ul>
        </div>
      </div>
    </a>
    <template v-for="item in theme.nav" :key="JSON.stringify(item)">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <component v-else-if="'component' in item" :is="item.component" v-bind="item.props" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>

  </nav>

</template>

<style lang="scss" scoped>
.VPNavBarMenu {
  display: none;
  position: relative;
}

.VPNavBarMenuLink {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 0 12px;
  line-height: var(--vp-nav-height);
}

.color {
  &:hover .color-picker-menu {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, 10px);

  }

  .color-picker-menu {
    position: absolute;
    top: calc(var(--vp-nav-height) / 2 + 20px);
    transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
    visibility: hidden;
    opacity: 0;
    transform: translate(-50%, -10px);

    .mode-options {
      background-color: var(--background-color);
      min-width: 125px;
      padding: 16px;
      box-shadow: var(--box-shadow);
      border-radius: .25rem;

      .title {
        line-height: 1;
        text-align: center;
        font-weight: 700;
        color: var(--vp-c-brand-1);
        margin-bottom: 16px;
      }

      .color-mode-options {
        display: flex;
        flex-wrap: wrap;

        .theme-color-item {
          text-align: center;
          font-size: 12px;
          color: #fff;
          line-height: 1.5;
          padding: 3px 6px;
          cursor: pointer;
        }
      }
    }
  }
}

.color .iconfont {
  font-size: 20px !important;
  color: var(--vp-c-brand-1);
  margin-right: 16px;
}


@media (min-width: 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
