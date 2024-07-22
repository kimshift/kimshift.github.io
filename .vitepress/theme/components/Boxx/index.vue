<template>
  <div id="boxx" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div :class="class_boxx" :style="props.blockStyle" v-if="!text">
      <p class="custom-block-title" v-if="show_title" :style="props.titleStyle">{{ boxx.title }}</p>
      <p :style="style_content">{{ boxx.content }}</p>
    </div>
    <div v-else>{{ boxx.content }}</div>
  </div>
</template>

<script setup name="名言名句">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { data, typeList } from './config';

const props = defineProps({
  type: {
    type: String,
    default: 'tip',
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  blockStyle: {
    type: Object,
    default: {},
  },
  titleStyle: {
    type: Object,
    default: {},
  },
  contentStyle: {
    type: Object,
    default: {},
  },
  changeTime: {
    type: Number,
    default: 3000,
  },
  text: {
    type: Boolean,
    default: false,
  }
})
const boxx = ref({
  title: props.title,
  content: props.content,
});//展示的title和content
const class_boxx = ref('') //展示的class样式
const list = ref([...data]) //名人名言数组
const show_title = ref(true) //是否展示title
const style_content = ref(props.contentStyle)
const interval = ref(null) //定时器
const showType = ref(props.type) //名人名言类型

const getContent = async (callback) => {
  if (list.value.length >= 0) return callback?.();
  // const { data: res } = await axios.get('https://v1.jinrishici.com/all.json');
  // if (res) {
  //   let author = ` • <span style='font-size: 13px;'>` + res.author + `</span>`;
  //   list.value.push({
  //     title: res.origin + author,
  //     content: res.content,
  //   });
  // }
  // const { data: res2 } = await axios.get('https://v1.hitokoto.cn');
  // if (res2) {
  //   if (res2.hitokoto == '' || res2.hitokoto.length > 40) return;
  //   let author = '';
  //   if (res2.from_who != null)
  //     author = ` • <span style='font-size: 13px;'>` + res2.from_who + `</span>`;
  //   list.value.push({
  //     title: res2.from + author,
  //     content: res2.hitokoto,
  //   });
  // }
  // callback && callback();
}
const setContent = () => {
  boxx.value = list.value[Math.floor(Math.random() * list.value.length)]

}
const getShowType = (index) => {
  class_boxx.value = typeList[index].class
}

const checkTitleAndContent = () => {
  if (props.title == '' && props.content != '') {
    style_content.value = { 'margin-top': '1rem', 'margin-bottom': '0.4rem' };
    show_title.value = false;
    return;
  }
  setContent();//获取随机名句
  dynamicUpdateType(props.changeTime)
}

const dynamicUpdateType = (time) => {
  if (time != '' && /^\d+$/.test(time)) {
    let index = typeList.findIndex((item) => item.type === showType.value)
    index = index > -1 ? index : 0
    interval.value && clearInterval(interval.value); //停止
    interval.value = setInterval(() => {
      index++;
      if (index == typeList.length) {
        index = 0;
      }
      setContent();//获取随机名句
      getShowType(index);
    }, time);
  }
}

const handleMouseEnter = () => {
  interval.value && clearInterval(interval.value); //停止
}
const handleMouseLeave = () => {
  initData()
}

const initData = () => {
  getContent(() => {
    checkTitleAndContent();
    let index = typeList.findIndex((item) => item.type === showType.value)
    index = index > -1 ? index : 0
    getShowType(index);
  })
}

onMounted(initData)
onBeforeUnmount(() => {
  interval.value && clearInterval(interval.value)
})

</script>



<style lang="scss" scoped>
.custom-block-title {
  font-size: 16px;
}
</style>
