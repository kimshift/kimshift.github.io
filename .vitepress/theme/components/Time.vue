<template>
  <div id="time-clock">
    <span class="date">{{ date }}</span>
    <span class="time">{{ time }}</span>
  </div>
</template>

<script setup name="时间组件">
import { ref, onMounted, onUnmounted } from 'vue';

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const time = ref('')
const date = ref('')
const timer = ref('')

const updateTime = () => {
  var _d = new Date();
  time.value =
    zeroPadding(_d.getHours(), 2) +
    ':' +
    zeroPadding(_d.getMinutes(), 2) +
    ':' +
    zeroPadding(_d.getSeconds(), 2);
  date.value =
    zeroPadding(_d.getFullYear(), 4) +
    '-' +
    zeroPadding(_d.getMonth() + 1, 2) +
    '-' +
    zeroPadding(_d.getDate(), 2) +
    ' ' +
    week[_d.getDay()];
}

const zeroPadding = (num, digit) => {
  var zero = '';
  for (var i = 0; i < digit; i++) {
    zero += '0';
  }
  return (zero + num).slice(-digit);
}

updateTime()

onMounted(() => {
  timer.value = setInterval(updateTime, 1000);
})

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value); //销毁定时器
})


</script>

<style lang="scss" scoped>
#time-clock {
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
  color: #daf6ff;
  text-shadow: 0 0 2px #0aafe6, 0 0 2px rgba(10, 175, 230, 0);

  .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }

  .time {
    letter-spacing: 0.05em;
    font-size: 50px;
    padding: 5px 0;
  }
}
</style>
