<script setup name="时间线页面">
import { useRouter } from 'vitepress';
import { ref, onMounted } from 'vue';
import { dateFormat } from 'tools-for-js';
import { useArticleStore } from '../stores/article';
const router = useRouter()
const timelineList = ref([])
const { getTimeLine } = useArticleStore()


onMounted(() => {
  timelineList.value = getTimeLine()
})

const goPath = (url) => {
  router.go(url)
}

</script>
<template>
  <ul class="timeline-wrapper">
    <li class="desc">Yesterday Once More!</li>
    <li v-for="(item, index) in timelineList" :key="index">
      <h3 class="year">{{ item.year }}</h3>
      <ul class="year-wrapper">
        <li v-for="(subItem, subIndex) in item.data" :key="subIndex" @click="goPath(subItem.route)">
          <span class="date">{{ dateFormat(subItem.meta.date, 'MM-DD') }}</span>
          <span class="title">{{ subItem.meta.title }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
$textColorSub: #888;

ul {
  padding-left: 1.2em;
  line-height: 1.7;
}

.timeline-wrapper {
  box-sizing: border-box;
  max-width: 740px;
  margin: 4rem auto 4rem;
  position: relative;
  list-style: none;

  &::after {
    content: " ";
    position: absolute;
    top: 14px;
    left: -2px;
    z-index: -1;
    width: 4px;
    height: 100%;
    background: var(--border-color);
  }

  .desc,
  .year {
    position: relative;
    color: var(--text-color);
    font-size: 16px;

    &:before {
      content: " ";
      position: absolute;
      z-index: 2;
      left: -23px;
      top: 50%;
      margin-top: -4px;
      width: 8px;
      height: 8px;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      background: var(--vp-c-brand-1)
    }
  }

  .year {
    font-weight: 700;
    font-size: 27px;
    margin: 80px 0px 20px;
  }

  .year-wrapper {
    padding-left: 0 !important;

    li {
      display: flex;
      padding: 10px 20px 10px;
      list-style: none;
      border-bottom: 2px solid var(--border-color);
      position: relative;
      background: #c1c1e626;
      border-radius: 5rem;
      margin: 5px 0px;
      transition: all .5s;
      cursor: pointer;

      &:hover {
        transform: translate(50px, 0);
        transition: all .5s;

        .date,
        .title {
          color: var(--vp-c-brand-1);

          &::before {
            background: var(--vp-c-brand-1)
          }
        }
      }

      .date {
        width: 43px;
        line-height: 30px;
        color: $textColorSub ;
        font-size: 13px;

        &::before {
          content: " ";
          position: absolute;
          left: -23px;
          top: 50%;
          width: 8px;
          height: 8px;
          background: var(--background-color);
          border-radius: 50%;
          border: 1px solid var(--border-color);
          z-index: 2;

        }
      }

      .title {
        line-height: 30px;
        color: $textColorSub;
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 750px) {
  .timeline-wrapper {
    margin: 0 1.2rem;
  }

}
</style>
