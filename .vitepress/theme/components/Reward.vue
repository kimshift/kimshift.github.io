<script setup name="赞赏组件">
import { ElButton } from 'element-plus'
import { ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { aliPaySVG, weChatPaySVG } from '../constants/svg'

const { frontmatter, theme } = useData()
const rewardConfig = ref(null)
const svg = ref('')
const showContent = ref(false)

const rewarder = ref([
  {
    name: '李斯斯',
    amount: '18',
    type: '微信',
    date: '2021-05-20',
    remark: '斯斯赞赏'
  },
  {
    name: '陈方木',
    amount: '21',
    type: '微信',
    date: '2022-03-12',
    remark: '方木赞赏'
  },
  {
    name: '刘文新',
    amount: '12',
    type: '支付宝',
    date: '2022-08-11',
    remark: '有赏交流'
  }
])
const getConfig = () => {
  if (frontmatter.value.reward === false || !theme.value.reward) {
    rewardConfig.value = null
    svg.value = ''
  } else {
    let rewardCf = frontmatter.value.reward || {}
    let rewardTf = theme.value.reward || {}
    rewardConfig.value = {
      ...rewardCf,
      ...rewardTf,
    }
    const iconMap = {
      aliPay: aliPaySVG,
      wechat: weChatPaySVG
    }
    let icon = rewardConfig.value.icon
    svg.value = iconMap[icon] || icon
    showContent.value = !!rewardConfig.value.expand
  }

}

const route = useRoute()
watch(route, () => {
  getConfig()
}, {
  immediate: true
})

const handleToggle = () => {
  showContent.value = !showContent.value
}

</script>

<template>
  <div v-if="rewardConfig" class="appreciation-container">
    <div class="btn-box">
      <ElButton :size="rewardConfig.size || 'default'" class="content-button" :type="showContent ? 'danger' : 'primary'"
        @click="handleToggle">
        <span class="content-icon" v-html="svg" />
        {{ showContent ? rewardConfig.closeTitle : rewardConfig.openTitle }}
      </ElButton>
    </div>
    <Transition name="content">
      <div v-if="showContent">
        <div class="content-container">
          <img :src="rewardConfig.qRCode" alt="alt" />
        </div>
        <div class="content-desc">「真诚赞赏，手留余香」</div>
        <h3 id="打赏记录"><a class="header-anchor" href="#打赏记录">&ZeroWidthSpace;</a>打赏记录</h3>
        <table>
          <thead>
            <tr>
              <th style="text-align: center">打赏者</th>
              <th style="text-align: center">金额 (元)</th>
              <th style="text-align: center">支付方式</th>
              <th style="text-align: center">时间</th>
              <th style="text-align: center">备注</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in rewarder" :key="index">
            <tr>
              <td style="text-align: center">{{ item.name }}</td>
              <td style="text-align: center">{{ item.amount }}</td>
              <td style="text-align: center">{{ item.type }}</td>
              <td style="text-align: center">{{ item.date }}</td>
              <td style="text-align: center">{{ item.remark }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.appreciation-container {

  padding: 20px 0;
  font-size: 14px;
  color: #606266;

  .btn-box {
    text-align: center;
  }

  :deep(.el-button.el-button--primary) {
    background-color: var(--vp-c-brand-2);
    border-color: var(--vp-c-brand-2);
  }

  .content-desc {
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
  }

  h3 {
    margin: 32px 0 0;
    letter-spacing: -0.01em;
    line-height: 28px;
    font-size: 20px;
    position: relative;
    font-weight: 600;
    outline: none;
    color: var(--vp-c-text-1);

    &:hover a {
      opacity: 1;
    }

    a {
      word-break: break-all;
      opacity: 0;
      color: var(--vp-c-brand-1);

      &:before {
        position: absolute;
        content: var(--vp-header-anchor-symbol);
        margin-left: -0.87em;
      }
    }

  }

  table {
    border-collapse: collapse;
    margin: 1rem 0;
    display: block;
    overflow-x: auto;
    box-sizing: border-box;
    text-indent: initial;
    unicode-bidi: isolate;
    border-spacing: 2px;
    border-color: gray;
    font-size: 16px;

    thead {
      display: table-header-group;
      vertical-align: middle;
      unicode-bidi: isolate;
      border-color: inherit;
    }

    tr {
      display: table-row;
      vertical-align: inherit;
      unicode-bidi: isolate;
      border-color: inherit;
      border-top: 1px solid var(--border-color);
    }

    td,
    th {
      border: 1px solid var(--border-color);
      padding: .6em 1em;
    }

    th:nth-of-type(1),
    th:nth-of-type(4),
    th:nth-of-type(5) {
      width: 22.5%;
    }
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
